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

This year marked a deliberate shift—not just in the tools used, but in how systems were designed, shaped, and structured.

## Data Engineering

Focus has not been on building pipelines *per se*, but on governing data flow through structure and orchestration. Concurrent async design and Pandas-backed processing and transformation form the baseline pattern across all ingestion paths. Data is shaped close to the source, further deduplicated through DynamoDB upserts, and backed up to S3 with versioning for audit and recovery. Failures are caught early and handled gracefully, using stop mechanisms and per-task boundaries to prevent cascading issues.

Authentication-sensitive flows, such as SingPass integration, are handled end-to-end with stateless Lambda chaining—including PKCE, secure token exchange, and encrypted claim extraction.

Ongoing refinements include separating data retrieval from processing, shifting from task-based schedules to queue-based triggers, introducing fault-tolerant retry logic designed to overcome failure, and context-specific refactoring instead of convention.

## Infrastructure as Code (IaC)

AWS infrastructure is fully defined through Terraform, with distinct environments (`dev`, `stg`, `prd`) deployed via GitHub Actions. Modules are parameterized to reduce duplication, with remote backends, environment-scoped secrets, and shared ECR repositories provisioned during bootstrap. Role boundaries follow least-privilege access models, with SSM-based credential separation and clear IAM scoping.

Front-end deployments—including S3-hosted SPAs behind CloudFront—are also codified in the same structure, allowing end-to-end infra lifecycle authorship.

## CI/CD and Containerization

CI/CD has moved from ad-hoc deployments to GitHub Actions workflows. Docker images are built and pushed when triggered by certain commits, tagged using Git SHA and environment, followed by Terraform `plan`/`apply` steps gated by environment-specific approval.

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

</div>

<!-- ENGLISH VERSION -->
<div id="english" style="display: none;" markdown="1">

This year marked a shift—not only in tools adopted, but in how systems were designed and maintained. The emphasis was placed on building with reliability, clarity, and long-term manageability in mind.

## Data Engineering

Rather than building pipelines as a goal in itself, attention was directed toward shaping how data flows through systems. Key characteristics of the new pattern include:

- Data is processed as it arrives, using asynchronous execution.
- Raw data is processed and deduplicated early through Python Pandas.
- Records are further streamlined by leveraging DynamoDB's conditional insert or update.
- Backups are written to S3 with version control, supporting traceability and recovery.

Failures are contained within isolated tasks, preventing cascading effects.

Authentication-related workflows (such as SingPass integration) are handled using stateless Lambda sequences. This includes secure handling of login protocols (PKCE), access tokens, and encrypted identity claims—all without compromising sensitivity between steps.

Further improvements to be introduced over time:

- Retrieval and processing were separated to increase modularity.
- Timed schedules were replaced with event-driven triggers.
- Retries were made fault-tolerant and context-aware.
- Refactoring was applied selectively, based on actual system needs.

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
- Terraform `plan` and `apply` steps are gated behind review and approval workflows.
- Feature branches are merged using squash strategies.
- Promotion branches are rebased to preserve coherent, intentional change history.

This transition ensures deployments reflect deliberate architectural intent rather than accumulated iteration.

## Observability and Diagnostics

Structured logging formats were introduced, featuring consistent timestamps, request identifiers, and event metadata. These enable trace-level inspection across asynchronous workloads.

Log verbosity is controlled per environment. Logs are routed through CloudWatch with lifecycle policies configured to control retention and cost.

Planned additions include:

- Storing Terraform plans as artifacts for future inspection.
- Collecting telemetry data on function runtime behavior (e.g., execution time, memory use, throttling).
- Building diagnostic tools to assist with failure triage and data anomaly detection.

## Development Environment and Tooling

Development workflows were aligned across local and remote contexts:

- Remote development is enabled through Cloudflare Tunnel, Code-server, and VS Code via SSH.
- Local development is containerized for reproducibility.
- Internal scripts are being created to simplify repetitive tasks such as environment switching, container launching, and deployment execution.

This alignment reduces context-switching overhead and promotes operational consistency.

## LLM-Assisted Development

Language models (LLMs) are used selectively—their role is mainly post-design validation, not simply code generation.

- Edge cases and overlooked conditions are more easily identified.
- Infrastructure, configuration, and implementation are cross-checked for consistency.
- Suggestions are offered only after internal structures are defined.

LLMs functioned as external validators—reflecting clarity already present, rather than producing new architectural material.

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
