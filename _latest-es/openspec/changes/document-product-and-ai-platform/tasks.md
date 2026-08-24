## 1. Scope and Product Evidence

- [x] 1.1 Update the root README minimally to mark every top-level app except `_latest-es/` as legacy, identify `_latest-es/` as active, exclude `rse-shop`, and summarize the AI/RAG/MCP direction; verify links and Markdown rendering.
- [ ] 1.2 Add a non-shop feature inventory with `verified`, `partial`, `mock`, or `disabled` evidence links for each legacy feature; verify every mobile screen, backend module, socket namespace, dashboard route, and root README feature is accounted for.
- [ ] 1.3 Define end-to-end journeys for onboarding, first spoken minute, AI practice, human practice, material-grounded help, and external MCP use; verify each journey maps to at least one spec scenario.
- [ ] 1.4 Define the product metric tree and guardrail thresholds for spoken minutes, retention, retries, recognition errors, safety, latency, cost, and privacy; verify every staged rollout has an owner and stop condition.
- [ ] 1.5 Interview representative learners across CEFR levels, accents, network/device constraints, and privacy needs; verify a synthesized research report accepts or rejects each product hypothesis from the design.

## 2. Active Workspace Architecture

- [ ] 2.1 Create `_latest-es/` domain boundaries for profile, social, messaging, rooms, content, notifications, practice, AI, knowledge, MCP, moderation, and audit; verify workspace type checks and dependency-boundary tests pass.
- [ ] 2.2 Add shared API contracts, typed error envelopes, correlation IDs, cancellation, pagination, and streaming conventions; verify contract tests run against native and server clients.
- [ ] 2.3 Add transactional outbox and idempotent consumer foundations for cross-domain events; verify rollback, duplicate-delivery, and retry integration tests pass.
- [ ] 2.4 Add private object-storage abstraction with short-lived authorized access and lifecycle deletion; verify an object identifier alone cannot retrieve a voice artifact.
- [ ] 2.5 Add additive database migration, seed, rollback, and restore procedures; verify migrations apply to a clean database and upgrade a representative prior schema.

## 3. Identity, Profiles, Consent, and Trust

- [ ] 3.1 Complete Better Auth registration, verification, sign-in, recovery, sign-out, session restore, and session revocation flows; verify mobile and server end-to-end auth tests pass.
- [ ] 3.2 Implement learner profiles, goals, level, country, optional demographics, interests, skills, accent, practice target, and visibility settings; verify field validation and authorization tests cover optional/sensitive values.
- [ ] 3.3 Implement theme, accessibility, captions, speech speed, notification, localization, AI processing, and retention preferences; verify English/Bangla shell and local-only mode tests pass.
- [ ] 3.4 Implement versioned granular consent grants for microphone, raw audio, server processing, personalization, evaluation, and MCP sharing; verify withdrawal prevents new processing and triggers required cleanup.
- [ ] 3.5 Implement export, deletion, derived-data cleanup, external-grant revocation, and disclosed retention exceptions; verify a deletion integration test covers database, object, vector, cache, and token records.
- [ ] 3.6 Add age-aware and child-safety policy hooks before social and AI release; verify minor test accounts receive the configured visibility, contact, recording, and moderation restrictions.

## 4. Learning Content, Notifications, and Administration

- [ ] 4.1 Implement versioned learning sources, sections, materials, media, levels, topics, licenses, publication states, and revisions; verify unpublished/withdrawn content cannot be fetched by learners.
- [ ] 4.2 Build native material browse, important/recent lists, details, and progress-event capture; verify offline events synchronize exactly once.
- [ ] 4.3 Implement push-token refresh/removal, preferences, in-app logs, deep links, targeted/broadcast delivery, and app-update notices; verify invalid-token and opt-out tests pass.
- [ ] 4.4 Implement administrator RBAC for user search/moderation, material editing/publication, and scoped communications; verify privilege-escalation tests and audit assertions pass.
- [ ] 4.5 Add a commerce-exclusion regression check for active routes, schemas, navigation, and docs; verify no `rse-shop`, cart, checkout, order, inventory, payment, or marketplace capability enters `_latest-es/`.

## 5. Discovery, Reputation, and Messaging

- [ ] 5.1 Implement permission-aware learner discovery, stable pagination, search, filters, sorting, details, and leaderboard queries; verify hidden/blocked/cross-age-policy profiles never appear.
- [ ] 5.2 Implement votes, badges, achievements, explained ranking, rate limits, and anti-abuse review state; verify duplicate/self/automated voting cases do not affect rankings.
- [ ] 5.3 Implement chat invitations, accept/reject, relationship state, blocking, conversation lists, presence, and notification events; verify blocked users cannot contact or observe one another.
- [ ] 5.4 Implement durable real-time text messaging with authorization, ordering, delivery state, reconnect, idempotency, pagination, and abuse reporting; verify multi-device and reconnect integration tests pass.
- [ ] 5.5 Replace all mock chat/material/profile UI data with typed APIs or explicit empty/error/loading states; verify a repository scan finds no production placeholder arrays or demo identities in migrated flows.

## 6. Human Speaking and Live Rooms

- [ ] 6.1 Select and integrate a supported authenticated real-time media provider or SFU after a latency/cost/security spike; verify a documented bake-off and two-device proof covers iOS, Android, weak network, and token expiry.
- [ ] 6.2 Implement InstaTalk opt-in queueing, compatibility, diversity, timeouts, skip/leave, topic prompts, safety policy, and AI fallback; verify deterministic matching and block-list tests pass.
- [ ] 6.3 Implement audio/video room controls, audio-only fallback, reconnect, recording consent, and call lifecycle telemetry; verify interruption and degraded-network device tests pass.
- [ ] 6.4 Implement eligible-host live streams, browse/join, participant request queue, configured on-stage limit, mute/remove/end, and moderation; verify concurrency and authorization integration tests pass.
- [ ] 6.5 Implement report, block, mute, emergency exit, evidence minimization, moderator queue, and response auditing across social surfaces; verify abuse simulations cannot bypass controls through another channel.

## 7. AI Evaluation and Model Governance Foundation

- [ ] 7.1 Create an immutable model registry and signed manifest schema covering task, language, version, artifact, quantization, license, source, checksum, signature, runtime, device budget, evaluation, and owner; verify invalid manifests are rejected.
- [ ] 7.2 Build license/provenance review, model-card templates, artifact scanning, safe-format enforcement, and revocation workflow; verify unsafe serialization, remote code, incompatible license, and revoked-key fixtures fail promotion.
- [ ] 7.3 Build versioned evaluation datasets across CEFR level, accent, age policy, noise, device tier, safety, RAG permissions, and no-answer cases; verify dataset documentation and consent/provenance checks pass.
- [ ] 7.4 Implement reproducible evaluation runners for ASR WER/semantic errors, endpoint latency, TTS intelligibility/naturalness, LLM teaching quality, correction precision, RAG groundedness, and MCP negative authorization; verify baseline reports are generated from pinned artifacts.
- [ ] 7.5 Define promotion gates and cohort rollout manifests for models, quantizations, prompts, adapters, retrieval policies, and safety policies; verify a subgroup regression blocks promotion despite an aggregate pass.

## 8. On-Device Model Runtime

- [ ] 8.1 Convert the native app to reproducible Expo development/production builds with React Native New Architecture and isolated native inference adapters; verify clean iOS and Android builds and startup smoke tests pass.
- [ ] 8.2 Implement resumable protected model downloads, storage preflight, checksum/signature validation, atomic activation, rollback, removal, and progress UI; verify interruption, corruption, insufficient-storage, and rollback tests pass.
- [ ] 8.3 Implement capability qualification and routing using device/runtime support, memory, storage, battery, thermal, and learner preferences; verify low-, mid-, and high-tier device fixtures receive independent capabilities.
- [ ] 8.4 Integrate calibrated local VAD and audio ring-buffer capture with permission, interruption, and background lifecycle handling; verify endpoint and barge-in tests on physical devices.
- [ ] 8.5 Bake off sherpa-onnx English streaming/final models, quantized Whisper `tiny.en`/`base.en`, and Moonshine on the device matrix; verify the chosen per-tier ASR meets published quality, real-time factor, memory, and energy gates.
- [ ] 8.6 Integrate platform TTS and downloadable Piper English voices with voice/accent/speed/replay/captions/stop controls; verify offline playback, intelligibility review, and interruption latency gates.
- [ ] 8.7 Bake off quantized SmolLM2-360M/1.7B and approved alternatives through `llama.rn`; verify only qualified devices enable local token streaming and all candidates meet memory, thermal, structured-output, cancellation, and teaching gates.
- [ ] 8.8 Implement local-only network enforcement and privacy telemetry that records capability use without payload content; verify an instrumented local-only session sends no audio, transcript, prompt, embedding, or generated content.

## 9. AI Speaking Coach and Server Inference

- [ ] 9.1 Build a provider-neutral authenticated streaming gateway for conversation, feedback, embeddings, reranking, and safety with version tracing; verify native contract and cancellation tests pass across two model backends.
- [ ] 9.2 Deploy isolated small-model inference workers with bounded context/output, concurrency, timeout, circuit breaker, health, and cost controls; verify overload tests return approved fallbacks without duplicate turns.
- [ ] 9.3 Bake off English-focused server candidates at or below the approved small-model ceiling and document quality/latency/cost; verify the selected default and fallback pass accent/level/safety gates.
- [ ] 9.4 Implement versioned pedagogy policies and structured schemas for scenarios, hints, turn responses, corrections, recap, and retry; verify schema validation rejects malformed or unevidenced feedback.
- [ ] 9.5 Implement role-play, free conversation, guided dialogue, shadowing, read-aloud, interview, and human-call-preparation session orchestration; verify each journey completes with correct state, interruption, and recovery.
- [ ] 9.6 Implement streaming/final dictation UI with timestamps, uncertain spans, learner correction, edit-before-save, and reconnect deduplication; verify low-confidence text is not automatically scored as pronunciation error.
- [ ] 9.7 Implement asynchronous pronunciation, fluency, grammar, vocabulary, and task-completion assessment with evidence spans, confidence bands, abstention, and capped priorities; verify a blind educator-reviewed correction set meets precision gates.
- [ ] 9.8 Implement learner-approved review memory, spaced retrieval events, per-skill progress, disputes, retries, and source-event immutability; verify disputed feedback stops personalization until resolved.
- [ ] 9.9 Evaluate English-teaching adapters/LoRA only on licensed data after the baseline ships; verify any adapter beats the base on held-out pedagogy tests without safety or subgroup regression before promotion.

## 10. Knowledge and RAG

- [ ] 10.1 Implement approved-source ingestion with license, author, level, topic, revision, checksum, publication, access policy, and source offsets; verify revoked/unpublished sources disappear from retrieval.
- [ ] 10.2 Implement extraction, semantic chunking, versioned English embeddings, and vector-capable PostgreSQL storage behind a retrieval interface; verify re-index and deletion are idempotent and traceable.
- [ ] 10.3 Implement metadata authorization before hybrid lexical/vector retrieval and bounded reranking; verify cross-user, cross-tenant, age, consent, and unpublished-content negative tests return zero protected candidates.
- [ ] 10.4 Implement untrusted-context envelopes, injection scanning, level-aware generation, inline citations, citation verification, conflicting-source behavior, and abstention; verify adversarial documents cannot change system or tool authority.
- [ ] 10.5 Implement inspectable learner memory from explicit goals, saved vocabulary, confirmed corrections, and practice history with edit/forget/export/delete; verify deletion propagates to chunks, vectors, caches, and summaries.
- [ ] 10.6 Add RAG regression reports for recall@k, ranking, citation precision/recall, faithfulness, relevance, level appropriateness, latency, and permission negatives; verify configuration changes cannot promote with a critical regression.

## 11. Secure External MCP

- [ ] 11.1 Implement a versioned remote Streamable HTTP MCP endpoint with initialization, capability negotiation, bounded schemas, health, and protocol conformance tests; verify supported ChatGPT and Gemini test clients can discover tools.
- [ ] 11.2 Implement OAuth protected-resource and authorization-server discovery, authorization code with PKCE S256, exact redirects, issuer/audience/resource validation, short access tokens, rotating refresh tokens, offline access, and token revocation; verify wrong-audience, replay, mix-up, expired, and revoked-token tests fail closed.
- [ ] 11.3 Implement fine-grained scopes and per-tool re-authorization for profile, progress, vocabulary, materials, practice plans, and practice results; verify prompts and tool annotations cannot expand token authority.
- [ ] 11.4 Implement read-only learner summary/goals/vocabulary/material-search/material-fetch/practice-plan resources and tools with data minimization and citations; verify returned records belong to the authorized user and requested scope.
- [ ] 11.5 Implement one idempotent `practice-result:write` tool with current confirmation and bounded effects; verify cancellation, duplicate calls, and missing confirmation perform no unintended mutation.
- [ ] 11.6 Implement learner connection/grant UI, audit events, per-user/client/tool rate limits, security alerts, and immediate revocation; verify a revoked connection cannot refresh or invoke tools.
- [ ] 11.7 Run ChatGPT and Gemini compatibility certification covering plan/platform limitations, OAuth refresh, allowed tools, confirmations, errors, and revocation; verify a published compatibility matrix matches observed behavior.

## 12. Observability, Safety, and Operations

- [ ] 12.1 Add privacy-safe traces and metrics for time to first token/audio, speech real-time factor, model versions, retrieval versions, fallback, abort, helpfulness, disputes, safety, and cost; verify routine logs contain no raw audio, transcript, prompt, token, or secret fixtures.
- [ ] 12.2 Add dashboards and alerts for API, socket/media, inference, model download, RAG, MCP, moderation, deletion, and cost SLOs; verify synthetic failures trigger the expected alert and runbook.
- [ ] 12.3 Implement prompt/model/content safety tests, rate limits, abuse controls, jailbreak/injection suites, and human escalation; verify red-team findings have severity, owner, remediation, and retest evidence.
- [ ] 12.4 Implement signed-model compromise, voice-data exposure, cross-tenant access, unsafe-output, and MCP-abuse incident runbooks; verify tabletop exercises demonstrate containment, revocation, rollback, and notification decisions.
- [ ] 12.5 Add dependency, native binary, model artifact, container, secret, and infrastructure security scanning to CI/CD; verify critical findings block release and exceptions expire.

## 13. Integrated Release and Migration

- [ ] 13.1 Build contract, unit, integration, accessibility, localization, end-to-end, physical-device, load, security, privacy, and model-evaluation CI lanes; verify the release pipeline reports each gate independently.
- [ ] 13.2 Migrate representative legacy users/content without shop data using additive and reversible jobs; verify counts, samples, ownership, consents, and rollback on a production-like copy.
- [ ] 13.3 Run internal and invited alpha cohorts for first spoken minute, dictation, feedback, offline use, AI-to-human handoff, RAG, and MCP; verify each cohort meets its product and safety exit criteria.
- [ ] 13.4 Roll out by device/accent/level cohort with feature flags binding app, model, prompt, retrieval, and policy versions; verify automated halt/rollback on crash, safety, privacy, quality, latency, or cost thresholds.
- [ ] 13.5 Remove or permanently label remaining legacy runtime links after parity decisions, without deleting historical code unless separately approved; verify all contributor and deployment documentation points active development to `_latest-es/`.
