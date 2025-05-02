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

Error handling is proactive: early-stage validation, task-scoped failure boundaries, and immediate termination on rate-limiting (e.g., HTTP 429) ensure fault isolation and recovery integrity.

Authentication-bound flows, such as SingPass integration, are implemented through stateless AWS Lambda chains—comprising PKCE flows, secure token exchanges, and claim decryption—with no persistent context between invocations.

Refinements are ongoing: decoupling extraction from transformation, replacing cron-based triggers with event-driven queues (e.g., SQS), and embedding structured retry logic and failure auditing. Refactoring emphasizes semantic clarity over convention.

## Infrastructure as Code (IaC)

All infrastructure is declaratively provisioned using Terraform. Workspaces (`dev`, `stg`, `prd`) isolate environments, with deployments automated via GitHub Actions. Modules are parameterized to maximize reuse, and remote state is managed through S3 with locking via DynamoDB.

Security follows the principle of least privilege: IAM roles are scoped tightly, environment-specific credentials are stored in AWS SSM Parameter Store, and ECR repositories are bootstrapped for container reuse.

Static front-end applications (e.g., S3 + CloudFront SPAs) are also codified in Terraform, enabling full-stack reproducibility.

## CI/CD and Containerization

CI/CD pipelines are managed through GitHub Actions. Docker images are built and tagged using Git commit SHAs and environment labels, then pushed to ECR. Subsequent Terraform `plan` and `apply` steps are gated behind environment-specific approvals.

Development follows a squash-merge workflow for feature branches, with deployment branches (`stg`, `prd`) kept linear via rebases. This ensures commit history reflects architectural intent, not development noise.

## Observability and Diagnostics

Logging is structured and traceable—logs include correlation IDs, standardized timestamps, and context tags. CloudWatch is the central log sink, with log group lifecycle policies configured to balance traceability and storage cost.

Planned enhancements include artifact retention for Terraform plans, lightweight telemetry on Lambda functions (e.g., execution duration, memory usage, throttle counts), and diagnostics to pinpoint ingest failures or malformed inputs.

## Development Environment and Tooling

Local and cloud development environments are standardized for consistency and rapid context switching. Secure tunnels (via Cloudflare Tunnel) enable remote access to headless environments, while IDE support is delivered through code-server and VS Code over SSH or remote tunnel.

Custom scripting is underway to streamline setup, automate repetitive tasks, and enforce environment parity.

## LLM-Assisted Development

LLMs are used primarily as structured audit tools, not generative agents. Their role is to validate assumptions, surface inconsistencies across configuration, infrastructure, and code, and reinforce architectural coherence. Design suggestions are secondary—only introduced after core logic and structural contracts are clearly established. Generation is applied sparingly, and never ahead of intent.

## Looking Ahead

The emphasis remains on architectural clarity: separating orchestration from business logic, behavior from configuration, and system design from runtime execution. The direction is not toward scaling complexity, but toward containing it—through clean interfaces, observable systems, and composition by intent.

</div>

<!-- ENGLISH VERSION -->
<div id="english" style="display: none;" markdown="1">

The year 2025 marked a shift—not only in tools adopted, but in how systems were designed and maintained. The emphasis was placed on building with reliability, clarity, and long-term manageability in mind.

## Data Engineering

Rather than building pipelines as a goal in itself, attention was directed toward shaping how data flows through systems. Key characteristics of the new pattern include:

- Data is processed as it arrives, using asynchronous execution.
- Raw data is processed and deduplicated early through Python Pandas.
- Records are further streamlined by leveraging DynamoDB's conditional insert or update.
- Backups are written to S3 with version control, supporting traceability and recovery.

Failures are isolated to specific tasks. This prevents errors from spreading across the system.

Authentication-related workflows (such as SingPass integration) are handled using stateless Lambda sequences. This includes secure handling of login protocols (PKCE), access tokens, and encrypted identity claims—all without compromising sensitivity between steps.

Further improvements to be introduced over time:

- Separate data retrieval and processing to increase modularity.
- Replace timed schedules with event-driven triggers.
- Make retries fault-tolerant and context-aware.
- Selectively apply refactoring based on actual system needs.

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
- Infrastructure changes are gated behind review and approval workflows using Terraform’s planning and application steps.
- Feature branches are merged using squash strategies.
- Staging and production branches are kept clean and linear, using rebases to maintain a clear, intentional history of changes.

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

Think of them more as code reviewers than authors—they help confirm what’s built, not invent from scratch.

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
