## Purpose

Protects learners and their voice data through explicit consent, data minimization, transparent AI behavior, model supply-chain controls, and accountable safety operations.

## ADDED Requirements

### Requirement: Granular voice and AI consent
The system SHALL obtain separate, understandable consent for microphone access, raw-audio storage, server transcription, AI personalization, research/evaluation use, and external MCP sharing. Denial of optional consent SHALL leave a meaningful non-consented product path.

#### Scenario: Server transcription declined
- **WHEN** a learner declines server transcription
- **THEN** raw audio is not sent to the server and the app offers qualified local transcription or non-voice practice

### Requirement: Data minimization and retention
Raw audio, transcripts, prompts, embeddings, feedback, and evaluation samples SHALL have declared purposes and retention periods, SHALL not appear in ordinary logs, and SHALL expire automatically unless the learner deliberately saves them.

#### Scenario: Retention expiry
- **WHEN** an artifact reaches its retention deadline
- **THEN** primary and derived copies are deleted or irreversibly de-identified and no longer participate in retrieval or training

### Requirement: Security controls
Sensitive data SHALL be encrypted in transit and at rest, secrets SHALL remain server-side or in platform secure storage, privileged access SHALL be least-privilege and auditable, and uploads SHALL use private authorization rather than public object URLs.

#### Scenario: Voice-object access
- **WHEN** a caller lacks the learner, service, and purpose authorization for a voice object
- **THEN** access is denied even if the object identifier is known

### Requirement: Child and community safeguards
The system SHALL apply age-appropriate defaults, guardian or age-assurance controls where legally required, discovery and contact restrictions, content moderation, reporting, and escalation procedures for minors and vulnerable learners.

#### Scenario: Minor enters social practice
- **WHEN** an age-assured minor attempts discovery, matching, messaging, or live streaming
- **THEN** the configured child-safety policy limits eligible contacts, visibility, recording, and moderation controls

### Requirement: Transparent AI and learner agency
AI interactions SHALL be labeled, uncertainty and model limitations SHALL be disclosed at the point of impact, learners SHALL be able to correct transcripts and feedback, and no model output SHALL claim clinical, immigration, employment, or standardized-test certification.

#### Scenario: Learner disputes feedback
- **WHEN** a learner marks feedback as incorrect
- **THEN** the original evidence and dispute are retained only as allowed, the item stops driving personalization until resolved, and the product offers a retry or review path

### Requirement: Model and dataset governance
Every production model, adapter, voice, dataset, and evaluation set SHALL have reviewed license, provenance, intended use, limitations, checksums, security scan, model card, and accountable owner. Unreviewed remote code and unsafe serialized artifacts SHALL not execute in production.

#### Scenario: License incompatibility
- **WHEN** a candidate model license conflicts with distribution, commercial use, privacy, or attribution requirements
- **THEN** the candidate is blocked from the affected deployment tier

### Requirement: Safety incident response
The system SHALL support detection, triage, containment, rollback, user notification where appropriate, and post-incident review for data exposure, unsafe model behavior, compromised model packs, and MCP abuse.

#### Scenario: Compromised model manifest
- **WHEN** a signing key or active model artifact is suspected compromised
- **THEN** the version is revoked, loading is blocked, a safe fallback is activated, and impacted installations are identifiable
