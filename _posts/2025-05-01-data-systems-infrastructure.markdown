---
layout: post
title:  "Year-to-Date: Data, Systems, and Infrastructure"
date:   2025-05-01 21:30:00 +0800
categories: jekyll update
---

The start of this year has marked a significant shift in how I approach software and infrastructure—not just in terms of tools and technologies, but in architectural mindset and execution.

## Data Engineering

Designed and deployed several data ingestion and processing pipelines focused on scalability, reliability, and idempotence.

The pipelines featured:

- Event-driven triggers using AWS EventBridge or Lambda  
- Chaining of multiple Lambdas for stateless, modular ETL
- Asynchronous pipelines for parallel ingestion and reduced latency  
- DynamoDB used as an upsert store, with secondary indices for flexible retrieval  
- S3 for raw data backup with versioning enabled for recovery and audit  
- Unit tests for ETL and transformation logic to ensure schema consistency and error handling  
- Full SingPass OIDC integration with PKCE, token handling, and encrypted claim extraction  

**Work-in-progress:**

- Decoupling data retrieval from processing to enable retry logic and improve throughput  
- Queue-based triggers, likely using AWS SQS  
- Hybrid on-prem and cloud solution with failover handling  
- Scaling pipelines horizontally and vertically based on real-time load  
- Refactoring based on structural clarity and contextual fit, not standardized patterns  

## Infrastructure as Code (IaC)

Terraform was used extensively to manage cloud infrastructure across `dev`, `stg`, and `prd` environments. CLI-based workflows were restructured into GitHub Actions pipelines. IAM roles and policies follow the principle of least privilege, scoped to specific services and actions.

Key highlights:

- Parameterized Terraform modules to reduce duplication across environments  
- Bootstrap process provisions remote backends, SSM parameters, and shared ECR repositories
- GitHub Actions workflows for `plan` and `apply`, with manual approvals for `stg` and `prd`  
- Remote state stored in S3 with workspace isolation and DynamoDB locking  
- Secrets managed per environment via AWS SSM Parameter Store  
- Static frontends (S3-hosted SPA served via CloudFront or Lambda) managed through IaC

## CI/CD and Containerization

Application and infrastructure code are now fully integrated into CI/CD pipelines. Repositories follow standardized branching and release workflows. Builds are reproducible using Docker.

CI/CD structure includes:

- GitHub Actions for building and pushing Docker images to ECR
- Docker images tagged by Git SHA and environment for traceable, environment-specific deployment
- Terraform `plan` and `apply` steps run post-build to deploy infrastructure updates
- Squash merges for feature branches; rebase required before merging to `stg` or `prd`  

## Observability and Diagnostics

Observability was built into every layer of the system to ensure operational traceability, real-time debugging, and audit readiness across pipelines and infrastructure.

Highlights include:

- Structured logging with consistent timestamp formats and IDs across containerized tasks  
- Conditional logging levels (info, warn, error) enabled per environment for signal-to-noise control  
- CloudWatch used as environment-aware log sinks, with lifecycle rules for retention and cost management  

**Work-in-progress:**

- Storing and version-tracking Terraform plans and apply outputs for deployment traceability  
- Lightweight telemetry for function runtimes, memory usage, and throttling patterns  
- Diagnostic utilities scripting for querying pipeline run histories, failed job payloads, and ETL edge cases

## Development Environment and Tooling

Development environments are now consistent, secure, and easily accessible.

Tooling upgrades include:

- Cloudflare Tunnel for secure, password-protected remote access  
- Code-server deployed on local and remote machines for browser-accessible IDEs  
- VS Code used for remote development over SSH and tunnel-based access

**Work-in-progress:**

- Shell scripting for common operations (e.g., build, test, deploy)

## Acceleration by LLMs

LLMs were used primarily for audit, and secondarily for generation. Their highest leverage came from surfacing edge cases, interrogating assumptions, and reinforcing consistency across data workflows and infrastructure code.

Usage patterns included:

- Auditing ETL logic, shell scripts, and Terraform modules for robustness and alignment  
- Suggesting simplifications or refactoring without altering core intent  
- Verifying consistency in schema expectations, naming conventions, and fallback logic  
- Generating initial scaffolds only when intended structure was already defined

LLMs were not treated as co-authors, but as external validators—most effective when used to confirm or refine already-formed ideas.

## Looking Ahead

Focus remains on deepening architectural coherence, refining asynchronous workflows, and preparing infrastructure for broader multi-environment orchestration.
