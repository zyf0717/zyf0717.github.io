---
layout: post
title:  "Year-to-Date: Data, Systems, and Infrastructure"
date:   2025-05-01 21:30:00 +0800
categories: jekyll update
---

This year marked a deliberate shift—not just in the tools used, but in how systems were designed, shaped, and structured.

## Data Engineering

Focus has not been on building pipelines *per se*, but on governing data flow through structure and orchestration. Concurrent async design and DynamoDB-backed deduplication forms the baseline pattern across all ingestion paths. Data is shaped close to the source, upserted to DynamoDB only when semantically meaningful, and backed up to S3 with versioning for audit and recovery. Failures are caught early and handled gracefully, using stop mechanisms and per-task boundaries to prevent cascading issues.

Authentication-sensitive flows, such as SingPass integration, are handled end-to-end with stateless Lambda chaining—including PKCE, secure token exchange, and encrypted claim extraction.

Ongoing refinements include separating data retrieval from processing, shifting from task-based schedules to queue-based triggers, introducing fault-tolerant retry logic designed to overcome failure, and context-specific refactoring instead of convention.

## Infrastructure as Code (IaC)

AWS infrastructure is fully defined through Terraform, with distinct environments (`dev`, `stg`, `prd`) deployed via GitHub Actions. Modules are parameterized to reduce duplication, with remote backends, environment-scoped secrets, and shared ECR repositories provisioned during bootstrap. Role boundaries follow least-privilege access models, with SSM-based credential separation and clear IAM scoping.

Front-end deployments—including S3-hosted SPAs behind CloudFront—are also codified in the same structure, allowing end-to-end infra lifecycle authorship.

## CI/CD and Containerization

CI/CD has moved from ad-hoc deployments to GitHub Actions workflows. Docker images are built and pushed when triggerd by certain commits, tagged using Git SHA and environment, followed by Terraform `plan`/`apply` steps gated by environment-specific approval.

Branch workflows use squash merges for features, with rebases for promotion branches—ensuring change history reflects intent, not iteration.

## Observability and Diagnostics

Structured logs with consistent IDs and timestamp formats support trace-level inspection across async workloads. Conditional log levels allow different verbosity per environment, and CloudWatch is used as the central sink, with lifecycle management enabled for retention cost control.

Upcoming refinements include storing Terraform plans as artifacts for traceable infrastructure changes, introducing lightweight telemetry on functions (duration, memory use, and throttling behavior), and developing diagnostic utilities to isolate ingestion failures or anomalous payloads.

## Development Environment and Tooling

Local and remote development environments have been aligned to support fast context switches and secure access. Cloudflare Tunnel enables protected access to headless servers, while Code-server and VS Code (SSH/tunnel-based) provide full IDE support in any environment.

Scripts are being developed to streamline the development process and improve day-to-day workflow efficiency.

## LLM-Assisted Development

LLMs are used selectively and deliberately—primarily for audit, secondarily for generation—their strength is in identifying edge cases, challenging or validating assumptions, and suggesting alignment across config, code, and infrastructure. Scaffolds are generated only after internal structures are fixed, and iterative audits are targeted and uncompromising.

LLMs function less as collaborators and more as external validators, used not to invent, but to reflect what is already clear.

## Looking Ahead

Emphasis remains on architectural separation—between orchestration and logic, intention and implementation—while improving the reliability and observability of asynchronous workflows. The goal is not to scale complexity, but to contain it through structural clarity, bounded interfaces, and context-driven execution.
