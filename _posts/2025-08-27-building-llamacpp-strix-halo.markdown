---
layout: post
title:  "Strix Halo Matrix Cores with llama.cpp"
date:   2025-08-27 23:30:00 +0800
categories: jekyll update
---

Most LLM GUI frontends (e.g. LM Studio) ship with their own `llama.cpp` builds. These are fine for general use, but:

- They may not enable Vulkan cooperative matrix support (`VK_KHR_cooperative_matrix`).
- There may only be GUI control over per-model parameters (flash-attention, KV quantization, offloading etc.), making headless operation inconvenient.

In particular, GPT-5 highlighted that as of 27 Aug 2025, LM Studio’s shipped `llama.cpp` runtimes have not been built with Vulkan SDK versions that enable `VK_KHR_cooperative_matrix` (or newer cooperative-matrix extensions). In the case of gpt-oss-120b on Strix Halo, GPT-5 also predicted a token-generation improvement from ~30 t/s to ~50 t/s—an uplift of 67%—if this cooperative matrix multiplication is enabled.

Following a build on Ubuntu 24.04, results show that a local build of `llama.cpp` does indeed unlock a significantly faster Vulkan path for Strix Halo.

*NB: it is unclear if the same could be done on Windows at this point in time.*

## 1. RADV + Vulkan SDK

First, the driver and API support required for cooperative-matrix matmul.

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

This supplies the tooling to compile cooperative-matrix shader code.

`sudo apt install shaderc`; if this fails, build and install with the following:

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

## 3. Building llama.cpp

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

Cooperative-matrix matmul is confirmed at runtime when benchmark logs show `matrix cores: KHR_coopmat`

```bash
export GGML_LOG_LEVEL=2
export GGML_VK_VISIBLE_DEVICES=0  # might need if multiple GPUs present
export AMD_VULKAN_ICD=RADV

MODEL_DIR="/path/to/model/dir"  # insert accordingly
MODEL="$MODEL_DIR/gpt-oss-120b-MXFP4-00001-of-00002.gguf"

./build/bin/llama-bench -m "$MODEL" -ngl 999 -t 8 -pg 256,128 -b 512 -ub 256 -fa 1

> ggml_vulkan: Found 1 Vulkan devices:
> ggml_vulkan: 0 = AMD Radeon Graphics (RADV GFX1151) (radv) | uma: 1 | fp16: 1 | bf16: 0 | warp size: 64 | shared memory: 65536 | int dot: 1 | matrix cores: KHR_coopmat
> | model                          |...| n_batch | n_ubatch | fa |            test |                  t/s |
> | ------------------------------ |...| ------: | -------: | -: | --------------: | -------------------: |
> | gpt-oss 120B MXFP4 MoE         |...|     512 |      256 |  1 |           pp512 |       339.22 ± 14.16 |
> | gpt-oss 120B MXFP4 MoE         |...|     512 |      256 |  1 |           tg128 |         48.88 ± 0.05 |
> | gpt-oss 120B MXFP4 MoE         |...|     512 |      256 |  1 |     pp256+tg128 |        111.92 ± 0.24 |
```

And for a longer-context benchmark:

```bash
./build/bin/llama-bench -m "$MODEL" -ngl 999 -t 8 -pg 2048,128 -b 4096 -ub 256 -fa 1

> ggml_vulkan: Found 1 Vulkan devices:
> ggml_vulkan: 0 = AMD Radeon Graphics (RADV GFX1151) (radv) | uma: 1 | fp16: 1 | bf16: 0 | warp size: 64 | shared memory: 65536 | int dot: 1 | matrix cores: KHR_coopmat
> | model                          |...| n_batch | n_ubatch | fa |            test |                  t/s |
> | ------------------------------ |...| ------: | -------: | -: | --------------: | -------------------: |
> | gpt-oss 120B MXFP4 MoE         |...|    4096 |      256 |  1 |           pp512 |       339.07 ± 15.09 |
> | gpt-oss 120B MXFP4 MoE         |...|    4096 |      256 |  1 |           tg128 |         48.95 ± 0.02 |
> | gpt-oss 120B MXFP4 MoE         |...|    4096 |      256 |  1 |    pp2048+tg128 |        242.73 ± 0.67 |
```

The above results hold up reasonably well in deployment `-c 32768 -b 4096 -ub 256 --flash-attn`:

```bash
prompt_n: 1996
prompt_ms: 7023.54
prompt_per_token_ms: 3.52
prompt_per_second: 284.19
predicted_n: 3514
predicted_ms: 77176.74
predicted_per_token_ms: 21.96
predicted_per_second: 45.53
```

For reference, deployments with LM Studio (CLI v0.0.46) and its shipped `llama.cpp-linux-x86_64-vulkan-avx2-1.46.0` runtime never yielded more than ~30 t/s, even with trivially short contexts.

## 5. Conclusion

A local Vulkan build of `llama.cpp` enables cooperative-matrix support absent in LM Studio’s packaged runtimes. On Strix Halo, this translates into a measurable throughput gain: from ~30 t/s to 45–49 t/s—an uplift of 50–63%.

The improvement is not just incremental—it directly reflects hardware capabilities that LM Studio does not expose yet. GPT-5’s projected ~67% uplift proved directionally correct, with benchmarks and real-world performance landing only slightly lower.

The takeaway is clear:

- For maximum performance and control, local compilation remains mandatory.
- For convenience, LM Studio’s bundled builds are sufficient but capped.

Until the `llama.cpp` builds bundled with LM Studio and other frontends ship with cooperative-matrix support, anyone chasing efficiency on Strix Halo (or similar GPUs) should invest in compiling `llama.cpp` locally.

*NB: Models like GPT-5 can accelerate workflows by spotting missing features, predicting performance gains, and guiding system-level build choices—effectively serving as a copilot for optimization, not just for code generation.*
