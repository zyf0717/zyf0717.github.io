---
layout: post
title:  "Year-to-Date: Data, Systems, and Infrastructure"
date:   2025-05-01 21:30:00 +0800
categories: jekyll update
---

<!-- Toggle Buttons -->
<div>
    <strong>View Mode Toggles:</strong>
  <button onclick="toggleVersion('original')">Original (Default)</button>
  <button onclick="toggleVersion('english')">Plain English</button>
</div>
<br>

<!-- DENSE VERSION -->
<div id="original" style="display: block;" markdown="1">

The year 2025 marked a foundational shift—not merely in tooling, but in how systems are architected, governed, and evolved.

## Data Engineering

The focus transitioned from constructing pipelines to engineering resilient, observable data flows through structured orchestration. The core ingestion pattern leverages asynchronous concurrency and Pandas-based dataframes for transformation. Data is preprocessed near the source, upserted into DynamoDB to ensure each record reflects the most recent valid state, and versioned to S3 for auditability and recovery.

Jobs are triggered through a mix of event-driven and scheduled (cron-based) mechanisms, with buffers like SQS decoupling execution—allowing workloads to scale horizontally with greater flexibility and resilience under variable load.

Error handling is proactive: early-stage validation, task-scoped failure boundaries, and immediate termination on rate-limiting (e.g., HTTP 429) ensure fault isolation and recovery integrity.

Authentication-bound flows, such as SingPass integration, are implemented through stateless AWS Lambda chains—comprising PKCE flows, secure token exchanges, and claim decryption—with no persistent context between invocations.

## Infrastructure as Code (IaC)

All infrastructure is declaratively provisioned using Terraform. Workspaces (`dev`, `stg`, `prd`) isolate environments, with deployments automated via GitHub Actions. Modules are parameterized to maximize reuse, and remote state with locking is managed through S3.

Security follows the principle of least privilege: IAM roles are scoped tightly, environment-specific credentials are stored in AWS SSM Parameter Store, and ECR repository was bootstrapped for container promotion across environments.

Static front-end applications (e.g., S3 + CloudFront SPAs) are also codified in Terraform, enabling full-stack reproducibility.

## CI/CD and Containerization

CI/CD pipelines are managed through GitHub Actions. Docker images are built and tagged using Git commit SHAs and environment labels, then pushed to ECR. Lambda artifacts are packaged, versioned, and uploaded to S3 buckets. Promotion across environments is handled by reference—passing ECR image tags or copying S3-backed Lambda artifacts without rebuilding. Subsequent Terraform `plan` and `apply` steps are gated behind environment-specific approvals.

Unit tests are implemented using pytest, and executed during the CI process prior to any build or deployment steps. Test coverage includes core data logic and Lambda handlers, with failure conditions blocking downstream stages to ensure reliability and functional correctness.

## Observability and Diagnostics

Logging is structured and traceable—logs include correlation IDs, standardized timestamps, and context tags. CloudWatch is the central log sink, with log group lifecycle policies configured to balance traceability and storage cost.

Planned enhancements include lightweight telemetry on Lambda functions (e.g., execution duration, memory usage, throttle counts), and diagnostics to pinpoint ingest failures or malformed inputs.

## Development Environment and Tooling

Local and cloud development environments are standardized for consistency and rapid context switching. Secure tunnels (via Cloudflare Tunnel) enable remote access to headless environments, while IDE support is delivered through code-server and VS Code over SSH or remote tunnel.

## LLM-Assisted Development

LLMs are used primarily as structured audit tools, not generative agents. Their role is to validate assumptions, surface inconsistencies across configuration, infrastructure, and code, and reinforce architectural coherence. Design suggestions are secondary—only introduced after core logic and structural contracts are clearly established. Generation is used mainly for boilerplate or tightly scoped tasks, and is otherwise applied sparingly—and never ahead of clear intent.

## Looking Ahead

The emphasis remains on architectural clarity: separating orchestration from business logic, behavior from configuration, and system design from runtime execution. The direction is not toward scaling complexity, but toward containing it—through clean interfaces, observable systems, and composition by intent.

</div>

<!-- ENGLISH VERSION -->
<div id="english" style="display: none;" markdown="1">

The year 2025 marked a major shift—not just in tools, but in how systems are planned, built, and improved. The emphasis moved toward creating systems that are dependable, understandable, and built for long-term maintainability.

## Data Engineering

Rather than building pipelines as a goal in itself, attention was directed toward shaping how data flows through systems. Key characteristics of the new pattern include:

- Data is processed as it arrives, using asynchronous execution.
- Raw data is processed and deduplicated early through Python Pandas.
- Records are further streamlined by leveraging DynamoDB's conditional insert or update.
- Backups are written to S3 with version control, supporting traceability and recovery.

Tasks are triggered either by events or on a fixed schedule, with message queues like SQS used as buffers. This setup helps the system handle more tasks in parallel and stay stable even when demand increases suddenly.

Failures are isolated to specific tasks. This prevents errors from spreading across the system.

Authentication-related workflows (such as SingPass integration) are handled using stateless Lambda sequences. This includes secure handling of login protocols (PKCE), access tokens, and encrypted identity claims—all without compromising sensitivity between steps.

## Infrastructure as Code (IaC)

All infrastructure was defined using Terraform. Distinct environments—development, staging, and production—are deployed using GitHub Actions.

- Remote state is maintained per environment.
- Secrets are stored and accessed securely via SSM Parameter Store.
- IAM roles follow least-privilege principles.
- Modules are parameterized to eliminate duplication.

Front-end deployments (e.g., SPAs on S3 served through CloudFront) were brought under the same infrastructure-as-code model to support full lifecycle automation.

## CI/CD and Containerization

Code deployments were moved from manual processes to automated GitHub Actions workflows.

- Docker images are built and tagged with Git SHAs on relevant commits.
- Lambda artifacts are packaged, versioned, and uploaded to S3 buckets
- Infrastructure changes are gated behind review and approval workflows using Terraform’s planning and application steps.
- Tests are run automatically—failures stop the process early, ensuring only working code reaches production.

This transition ensures deployments reflect deliberate architectural intent rather than accumulated iteration.

## Observability and Diagnostics

Structured logging formats were introduced, featuring consistent timestamps, request identifiers, and event metadata. These enable trace-level inspection across asynchronous workloads.

Log verbosity is controlled per environment. Logs are routed through CloudWatch with lifecycle policies configured to control retention and cost.

Planned additions include:

- Collecting telemetry data on function runtime behavior (e.g., execution time, memory use, throttling).
- Building diagnostic tools to assist with failure triage and data anomaly detection.

## Development Environment and Tooling

Development workflows were aligned across local and remote contexts, enabled through Cloudflare Tunnel, Code-server, and VS Code via SSH or remote tunnel. This alignment reduces context-switching overhead and promotes operational consistency.

## LLM-Assisted Development

Language models (LLMs) are used selectively—their role is mainly post-design validation, not simply code generation.

- Edge cases and overlooked conditions are more easily identified.
- Infrastructure, configuration, and implementation are cross-checked for consistency.
- Code generation is limited to simple, clearly defined tasks.
- Further suggestions are offered only after internal structures are defined.

They function more as code reviewers than authors—by helping to confirm what’s built, not invent from scratch.

## Looking Ahead

Emphasis remains on architectural separation:

- Orchestration and logic are kept distinct.
- Implementation reflects clarified intent.
- Systems are made increasingly observable and failure-tolerant.

Complexity is not avoided, but contained—through deliberate structure, bounded interfaces, and context-aware execution.

</div>

<!-- Toggle Script -->
<script>
function toggleVersion(id) {
  document.getElementById('original').style.display = (id === 'original') ? 'block' : 'none';
  document.getElementById('english').style.display = (id === 'english') ? 'block' : 'none';
}
</script>
