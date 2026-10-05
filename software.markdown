---
layout: page
title: Open-source software
nav_title: Software
permalink: /software/
description: Open-source software and upstream contributions by Yifei Zheng in scientific computing, heat stress, WBGT, and BLE tooling across Python, R, and Julia.
---

Selected open-source software and upstream contributions by [Yifei Zheng (zyf0717)]({{ '/about/' | relative_url }}).

## HeatStressR

An R package for heat-stress indices, including wet-bulb globe temperature (WBGT), with improvements to numerical robustness, diagnostics, and batch performance.

**Role:** Maintainer and current developer of an independently maintained fork of HeatStress.

[GitHub](https://github.com/zyf0717/HeatStressR) · [CRAN](https://cran.r-project.org/package=HeatStressR)

## lwbgt

A versioned C/FFI implementation of the Liljegren outdoor WBGT calculation, with reference-compatible Python, R, and SwiftPM interfaces.

**Role:** Author and maintainer of the package and its interfaces around the original calculation.

[GitHub](https://github.com/zyf0717/lwbgt) · [PyPI](https://pypi.org/project/lwbgt/) · [CRAN](https://cran.r-project.org/package=lwbgt)

## HeatStress.jl

An independent Julia implementation of published heat-stress models, including WBGT, heat index, humidex, and wet-bulb temperature, with diagnostics and batch computation for scientific computing.

**Role:** Author and maintainer.

[GitHub](https://github.com/zyf0717/HeatStress.jl) · [Julia General](https://github.com/JuliaRegistries/General/tree/master/H/HeatStress)

## CoreTemp for Bangle.js

BLE sensor integration and connection handling for CoreTemp in BangleApps, including connection lifecycle improvements and ANT+ heart-rate monitor configuration.

**Role:** Upstream contributor.

[App](https://banglejs.com/apps/#coretemp) · [Source](https://github.com/espruino/BangleApps/tree/master/apps/coretemp) · Merged pull requests: [#4255](https://github.com/espruino/BangleApps/pull/4255), [#4366](https://github.com/espruino/BangleApps/pull/4366)

## polar-ble-tools

Python BLE tools for **Polar Loop Gen 2 and Verity Sense**, supporting **PMD offline recording and PFTP retrieval** without Polar Flow.

**Role:** Author and maintainer.

[GitHub](https://github.com/zyf0717/polar-ble-tools) · [PyPI](https://pypi.org/project/polar-ble-tools/)
