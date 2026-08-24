## Purpose

Provides a provider-neutral small-model serving plane whose English teaching quality, safety, latency, and cost are measured before and after release.

## ADDED Requirements

### Requirement: Provider-neutral model gateway

The server SHALL expose versioned, authenticated streaming interfaces for conversation, structured feedback, embeddings, reranking, and safety while hiding provider-specific formats from product clients.

#### Scenario: Model replacement

- **WHEN** an approved model version is replaced behind the gateway
- **THEN** compatible clients continue to function and every response records the effective model and policy version

### Requirement: Small-model routing

The system SHALL route requests by task, learner consent, quality target, latency budget, cost budget, queue pressure, and model health. Default self-hosted generative candidates SHALL remain in the small-model class defined by the project and require explicit review to exceed it.

#### Scenario: Quality-sensitive feedback

- **WHEN** a task requires nuanced correction beyond the qualified on-device model
- **THEN** the gateway selects an approved small server model or withholds the feature rather than fabricating confidence

### Requirement: English-teaching adaptation

Conversation and feedback models SHALL use a versioned pedagogy policy grounded in learner level, target variety of English, constructive tone, correction timing, and evidence. Fine-tunes or adapters SHALL preserve provenance for their licensed training data.

#### Scenario: Learner variety differs from reference accent

- **WHEN** a valid English variety differs from the selected reference accent
- **THEN** the coach distinguishes intelligibility guidance from claims that the variety is inherently incorrect

### Requirement: Evaluation-gated release

No model, quantization, prompt, adapter, retrieval policy, or speech pipeline SHALL reach general availability without passing versioned offline and staged online gates for English quality, accent and level slices, hallucination, safety, latency, memory, energy or compute cost, and regression.

#### Scenario: Aggregate pass hides subgroup failure

- **WHEN** an evaluation passes overall but fails a protected accent, proficiency, device, or safety slice
- **THEN** the candidate is blocked or limited to a validated cohort until the failure is resolved

### Requirement: Fallback and failure isolation

The serving plane SHALL enforce timeouts, cancellation, bounded retries, circuit breakers, concurrency limits, and tested fallback responses without silently switching to a processing mode the learner disabled.

#### Scenario: Inference overload

- **WHEN** the selected server model is overloaded
- **THEN** the request is queued within its latency budget, routed to an approved fallback, or rejected with a recoverable status

### Requirement: AI observability without content leakage

The system SHALL measure time to first token/audio, real-time factor, completion rate, model and retrieval versions, fallback rate, user-rated helpfulness, confirmed corrections, safety events, and cost while minimizing retained learner content.

#### Scenario: Production regression

- **WHEN** a deployed version breaches a quality, safety, latency, or cost threshold
- **THEN** rollout halts or rolls back and the affected version can be traced without exposing raw learner audio in routine logs
