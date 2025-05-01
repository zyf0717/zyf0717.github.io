---
layout: post
title:  "Year-to-Date: Data, Systems, and Infrastructure"
date:   2025-05-01 21:30:00 +0800
categories: jekyll update
---

The start of this year has marked a significant shift in how I approach software and infrastructure—not just in terms of tools and technologies, but in architectural mindset and execution.

## Data Engineering

This year’s focus has not been on building pipelines for their own sake, but on refining how data flows are structured, governed, and surfaced. I designed and deployed multiple ingestion workflows anchored on reliability, idempotence, and runtime separation. Stateless Lambda chaining, concurrency-aware async design, and DynamoDB-backed deduplication formed the baseline pattern across ingestion paths. Data was shaped close to the source, written to DynamoDB only when meaningful, and backed up to S3 with versioning for audit and recovery.

Incremental ingestion was prioritized, with historical lookbacks scoped by recent writes. Failures were contained through early-stop mechanisms and task isolation. I implemented full SingPass OIDC integration, including PKCE support, secure token handling, and encrypted claim extraction.

Ongoing refinements include decoupling retrieval from processing, shifting from scheduled triggers to queue-based invocation, introducing fault-tolerant retry logic, and re-architecting around contextual fit rather than adherence to predefined patterns.

## Infrastructure as Code (IaC)

Infrastructure is now fully defined through Terraform, with distinct environments (`dev`, `stg`, `prd`) deployed via GitHub Actions. All modules are parameterized to reduce duplication, with remote backends, environment-scoped secrets, and shared ECR repositories provisioned during bootstrap. Role boundaries follow least-privilege access models, with SSM-based credential separation and clear IAM scoping.

Frontend deployments—including S3-hosted SPAs behind CloudFront—are also codified in the same structure, allowing for end-to-end infra lifecycle ownership.

## CI/CD and Containerization

CI/CD has moved from ad-hoc deployments to traceable, reproducible pipelines. Docker images are built and pushed through GitHub Actions, tagged by Git SHA and environment, with Terraform `plan`/`apply` steps embedded post-build. Branch workflows enforce squash merges for features, with rebases required for promotion branches—ensuring change history reflects intent, not iteration.

## Observability and Diagnostics

Instrumentation was introduced early and uniformly. Structured logs with consistent IDs and timestamp formats support trace-level inspection across async workloads. Conditional log levels allow different verbosity per environment, and CloudWatch is used as the central sink, with lifecycle management enabled for retention cost control.

In-progress refinements include storing Terraform plans as artifacts for traceable infrastructure changes, introducing lightweight telemetry on function duration, memory use, and throttling behavior, and scripting diagnostic utilities to isolate ingestion failures or anomalous payloads without requiring full replay.

## Development Environment and Tooling

Local and remote development environments have been aligned to support fast context switches and secure access. Cloudflare Tunnel enables protected access to headless dev machines, while Code-server and VS Code (SSH/tunnel-based) provide full IDE support in any environment. Scripts are being developed to streamline the development process and improve day-to-day workflow efficiency.

## LLM-Assisted Development

LLMs were used selectively and deliberately—primarily for audit, secondarily for generation. Their strength was in surfacing edge cases, validating assumptions, and improving alignment across config, code, and infra. I used them to review shell scripts, ETL control flow, and Terraform modules, often prompting simplifications or clearer phrasing. Scaffolds were generated only when the internal structure was already decided.

LLMs functioned less as collaborators and more as external validators, reinforcing clarity already present rather than inventing on my behalf.

## Looking Ahead

The emphasis remains on refining architectural separation—between orchestration and logic, between intention and implementation—while improving the reliability and observability of asynchronous workflows. The goal is not to scale complexity, but to contain it through structural clarity, bounded interfaces, and execution that fits context rather than convention.
