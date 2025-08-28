---
layout: post
title:  "Strix Halo Matrix Cores with llama.cpp"
date:   2025-08-27 23:30:00 +0800
categories: jekyll update
---

Most LLM GUI frontends (e.g. LM Studio) ship with their own `llama.cpp` builds. These are fine for general use, but:

- They may not enable Vulkan cooperative matrix support (`VK_KHR_cooperative_matrix`).
- There may only be GUI control over per-model parameters (flash-attention, KV quantization, offloading etc.), making headless operation inconvenient.

*Specifically: GPT-5 highlighted that as of 27 Aug 2025, LM Studio’s shipped `llama.cpp` runtimes have not been built with Vulkan SDK versions that enable `VK_KHR_cooperative_matrix` (or newer cooperative-matrix extensions). Accordingly, it also expects real-world improvement of ~30 to ~50 t/s, an uplift of ~67%.*

As such, for improved performance on Strix Halo (e.g. with gpt-oss-120b), building a custom `llama.cpp` *should* unlock the Vulkan "fast" path and give greater control over runtime flags.

The following was done in Ubuntu 24.04; it is unclear at this date if the same could be done on Windows.

## 1. RADV + Vulkan SDK

Provides the driver and API support required for cooperative-matrix matmul.

```bash
# base toolchain
sudo apt update
sudo apt install -y build-essential git cmake ninja-build pkg-config libcurl4-openssl-dev

# Vulkan user/runtime + diagnostics
sudo apt install -y libvulkan1 vulkan-tools mesa-vulkan-drivers

# Optional but useful for shader compiles/validation
sudo apt install -y glslang-tools spirv-tools
```

## 2. Build glslc

Supplies the tooling to compile cooperative-matrix shader coder.

This step may be necessary if `sudo apt install shaderc` fails.

```bash
sudo apt update
sudo apt install git cmake ninja-build g++ python3 python3-pip -y

git clone https://github.com/google/shaderc.git
cd shaderc
git submodule update --init
python3 utils/git-sync-deps

mkdir build && cd build
cmake -GNinja .. -DCMAKE_BUILD_TYPE=Release
ninja glslc
sudo install -m 0755 bin/glslc /usr/local/bin/glslc
hash -r
glslc --version

> shaderc v2023.8 v2025.3-4-g402a16e
> spirv-tools v2025.3 v2022.4-874-gb8b90dba
> glslang 11.1.0-1277-g0d614c24

> Target: SPIR-V 1.0
```

## 3. Building `llama.cpp`

Cooperative-matrix matmul is introduced when `vulkan-shaders-gen` compiles and embeds the `OpCooperativeMatrix*` shaders.

```bash
git clone https://github.com/yourusername/llama.cpp.git
cd llama.cpp

cmake -S . -B build -G Ninja \
  -DGGML_VULKAN=ON \
  -DLLAMA_BUILD_SERVER=ON \
  -DLLAMA_BUILD_EXAMPLES=ON \
  -DCMAKE_BUILD_TYPE=Release
ninja -C build

> [43/261] Performing build step for 'vulkan-shaders-gen'
> [1/2] Building CXX object CMakeFiles/vulkan-shaders-gen.dir/vulkan-shaders-gen.cpp.o
> [2/2] Linking CXX executable vulkan-shaders-gen
> [44/261] Performing install step for 'vulkan-shaders-gen' -- Installing: ...
> [46/261] Generate vulkan shaders ggml_vulkan: Generating and compiling shaders to SPIR-V
> [261/261] Linking CXX executable bin/llama-server
```

## 4. Verify with llama-bench

Cooperative-matrix matmul is confirmed at runtime when logs show `matrix cores: KHR_coopmat`

```bash
export GGML_LOG_LEVEL=2
export GGML_VK_VISIBLE_DEVICES=0  # might need if multiple GPUs present
export AMD_VULKAN_ICD=RADV

MODEL_DIR="/path/to/model/dir"  # insert accordingly
MODEL="$MODEL_DIR/gpt-oss-120b-MXFP4-00001-of-00002.gguf"

./build/bin/llama-bench -m "$MODEL" -ngl 999 -t 8 -pg 256,128 -b 512 -ub 256 -fa 1

> ggml_vulkan: 0 = AMD ... (radv) | uma: 1 | fp16: 1 | warp size: 64 | matrix cores: KHR_coopmat
ggml_vulkan: Found 1 Vulkan devices:
ggml_vulkan: 0 = AMD Radeon Graphics (RADV GFX1151) (radv) | uma: 1 | fp16: 1 | bf16: 0 | warp size: 64 | shared memory: 65536 | int dot: 1 | matrix cores: KHR_coopmat
| model                          |       size |     params | backend    | ngl | threads | n_batch | n_ubatch | fa |            test |                  t/s |
| ------------------------------ | ---------: | ---------: | ---------- | --: | ------: | ------: | -------: | -: | --------------: | -------------------: |
| gpt-oss 120B MXFP4 MoE         |  59.02 GiB |   116.83 B | Vulkan     | 999 |       8 |     512 |      256 |  1 |           pp512 |       339.22 ± 14.16 |
| gpt-oss 120B MXFP4 MoE         |  59.02 GiB |   116.83 B | Vulkan     | 999 |       8 |     512 |      256 |  1 |           tg128 |         48.88 ± 0.05 |
| gpt-oss 120B MXFP4 MoE         |  59.02 GiB |   116.83 B | Vulkan     | 999 |       8 |     512 |      256 |  1 |     pp256+tg128 |        111.92 ± 0.24 |
```

Running the bench with more combinations of `-pg` `-b` `-ub` `-fa` yield very similar tg128 results. E.g.:

- `-pg 64,256 -b 256 -ub 64  -fa 1`: 48.83 ± 0.05
- `-pg 64,256 -b 128 -ub 128 -fa 1`: 48.81 ± 0.08
- `-pg 64,256 -b 192 -ub 96 -fa 0`: 48.61 ± 0.41

The above results hold up well in actual usage with a larger context window (`-c 32768 -b 2048 -ub 128 --flash-attn`):

```bash
prompt_n: 1832
prompt_ms: 10085.03
prompt_per_token_ms: 5.50
prompt_per_second: 181.66
predicted_n: 3127
predicted_ms: 67929.82
predicted_per_token_ms: 21.72
predicted_per_second: 46.03
```

For reference, similar runs with LM Studio (CLI v0.0.46) shipped `llama.cpp-linux-x86_64-vulkan-avx2-1.46.0` runtime never yielded more than ~30 t/s except in trivially short contexts.

## 5. Conclusion

As shown above, a Vulkan build of `llama.cpp` unlocks cooperative-matrix support missing in the current LM Studio’s runtimes, boosting Strix Halo throughput from ~30 t/s to nearly 50 t/s. For anyone chasing maximum performance and full runtime control, building locally remains the clear path.
