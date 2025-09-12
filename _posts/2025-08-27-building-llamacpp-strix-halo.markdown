---
layout: post
title:  "Strix Halo Matrix Cores with llama.cpp"
date:   2025-08-27 23:30:00 +0800
categories: jekyll update
---

Most current laptops and mini-PCs with AMD’s Strix Halo APU expose matrix cores through Vulkan (`VK_KHR_cooperative_matrix`). These units can accelerate the large GEMMs that dominate LLM inference—but only if the runtime actually compiles and dispatches the right shader paths.

Off-the-shelf GUI frontends such as LM Studio ship their own `llama.cpp` builds for convenience. These builds are designed for broad compatibility, not peak performance. Depending on how they’re compiled and how the GUI orchestrates generation, key optimizations (e.g. cooperative-matrix matmul, Flash Attention, KV cache quantization) may or may not be in play.

To see what Strix Halo can really do, it helps to build `llama.cpp` locally with Vulkan shaders compiled against a recent RADV + Vulkan SDK toolchain. The sections below walk through setup, build, and benchmark results.

## 1. Drivers and SDKs

On Linux, RADV (Mesa’s AMD Vulkan driver) exposes `VK_KHR_cooperative_matrix`. A local Vulkan build of `llama.cpp` can make direct use of this path. The build requires:

```bash
sudo apt update

# base toolchain
sudo apt install -y build-essential git cmake ninja-build pkg-config libcurl4-openssl-dev

# Vulkan user/runtime + diagnostics
sudo apt install -y libvulkan1 vulkan-tools mesa-vulkan-drivers

# For shader compiles/validation
sudo apt install -y glslang-tools spirv-tools
```

For shader compilation:

```bash
sudo apt update
sudo apt install -y g++ python3 python3-pip

git clone https://github.com/google/shaderc.git
cd shaderc
git submodule update --init
python3 utils/git-sync-deps

mkdir build && cd build
cmake -GNinja .. -DCMAKE_BUILD_TYPE=Release
ninja
sudo install -m 0755 ./glslc/glslc /usr/local/bin/glslc
hash -r
glslc --version

> shaderc v2023.8 v2025.3-4-g402a16e
> spirv-tools v2025.3 v2022.4-874-gb8b90dba
> glslang 11.1.0-1277-g0d614c24

> Target: SPIR-V 1.0
```

## 2. Building llama.cpp

Enable Vulkan and allow shader generation:

```bash
git clone https://github.com/ggerganov/llama.cpp.git
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

At build time, the shaders include cooperative-matrix variants if the driver supports it.

## 3. Verify with llama-bench

GPU support for cooperative-matrix matmul is confirmed when benchmark logs show `matrix cores: HR_coopmat`.

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

The above benchmarks hold up reasonably well in deployment, e.g. with `-c 32768 -b 4096 -ub 256 --flash-attn`:

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

## 4. Conclusion

On Strix Halo, local Vulkan builds of `llama.cpp` consistently sustain ~45–50 tok/s on 120B-class MoE models, while LM Studio’s packaged runtimes are capped at ~30 tok/s.

Several factors likely contribute to this gap:

- **Shader paths**. A custom build guarantees cooperative-matrix kernels are present and can be selected for dense workloads. Packaged binaries may omit them or fall back to generic matmuls, especially on less common quantization formats.
- **Runtime orchestration**. LM Studio introduces additional IPC and JSON streaming layers. This simplifies GUI and API integration but adds measurable per-token latency.
- **Defaults and flags**. Local builds can be tuned with larger batch/ubatch sizes, FlashAttention toggles, and architecture-specific flags. GUI defaults are more conservative.

Regardless, the takeaway is clear:

- For maximum performance and control, local compilation remains mandatory.
- For convenience, LM Studio’s bundled builds are sufficient but capped.
