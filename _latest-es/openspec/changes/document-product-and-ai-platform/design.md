## Context

See `proposal.md` for motivation and `specs/*/spec.md` for behavior contracts.

### Repository audit

The active `_latest-es/` workspace is a modern TypeScript monorepo with Expo/React Native, Expo Router, Elysia, Bun, PostgreSQL/Drizzle, Better Auth, shared environment validation, and Vite+ checks. Its current product implementation is deliberately small: email/password sign-up/sign-in, authenticated server routing, theme-aware navigation, drawer/tab scaffolding, and database-backed auth.

The non-shop legacy applications are feature references, not a single reliable implementation. The audit found:

| Area | Evidence in legacy code | Migration interpretation |
|---|---|---|
| Identity | login/logout, token/session state, protected mobile/admin routes | Preserve behavior; replace legacy auth with Better Auth |
| Profile | image, age, gender, country, skills/interests, FCM token | Preserve with privacy-sensitive optional fields |
| Discovery | paginated search, filters, sorting, user detail, leaderboard | Preserve and complete privacy/abuse rules |
| Reputation | votes and badges | Preserve only with transparent calculation and anti-abuse |
| Chat | request, friend, conversation, presence/message UI and socket namespaces | Several routes/UI are disabled or mock data; treat as desired behavior, not complete code |
| InstaTalk | instant partner UI and socket namespace | Preserve matching intent; redesign safety and fallback |
| Calls | WebRTC controls and demo call screen | Rebuild against supported native real-time stack |
| Live streams | host/participant UI and socket namespace | Preserve intent; enforce eligibility, moderation, and participant limits |
| Materials | sections/cards/details plus dashboard material UI | Preserve educational content; several mobile lists are placeholders |
| Notifications | push-token refresh, notification routing/logs, multicast/broadcast | Preserve with consent, delivery, and invalid-token hygiene |
| Admin | login, users, materials, targeted messaging | Rebuild with RBAC and immutable audit events |
| Localization | English and Bangla shell strings | Preserve shell localization; learning output remains English-focused |
| Marketplace | root README claim and `rse-shop` links/code | Excluded in full |

This distinction matters: “existing” means a product requirement discovered in code, README, route, or screen—not a claim that the current feature is production-ready.

### Product and market research

Current product signals converge on speaking rather than passive study:

- Duolingo calls conversation practice a critical learning feature and is expanding AI-powered voice answers and speaking adventures, especially for English learners ([FY2025 shareholder letter](https://www.sec.gov/Archives/edgar/data/1562088/000162828026012513/q4fy25duolingo12-31x25shar.htm)).
- Speak organizes its product around “learn, practice, apply,” real-time pronunciation/phrasing feedback, personalized review from mistakes, and back-and-forth AI practice ([Speak product page](https://www.speak.com/?lang=en)).
- ELSA emphasizes role-play, multi-accent practice, bilingual beginner support, instant pronunciation/fluency/grammar/vocabulary feedback, and progress tracking ([ELSA 2026 product update](https://blog.elsaspeak.com/en/discover-the-new-elsa-speak-experience/)).
- A 2025 mixed-methods study reports that AI conversation bots can improve speaking and reduce anxiety when they provide frequent, judgment-free practice and immediate feedback ([Humanities and Social Sciences Communications](https://www.nature.com/articles/s41599-025-05550-z)). A broader systematic review also links conversational assistants with reduced anxiety and increased willingness to communicate ([Telematics and Informatics Reports review](https://doi.org/10.1016/j.teler.2026.100346)).

These are market indicators, not proof that any one competitor implementation causes retention. English Sphere will validate the following product hypotheses with its own learners:

1. A two-minute path from open to speaking improves first-session activation.
2. Corrections after a turn preserve flow and confidence better than constant interruption.
3. Three evidence-linked priorities are more useful than a large undifferentiated scorecard.
4. Offline dictation and playback improve usage in low-bandwidth and privacy-sensitive contexts.
5. Moving between AI practice and safe human/community practice is a meaningful differentiator.
6. Accent-aware uncertainty earns more trust than false precision.
7. A useful free speaking allowance and low-cost local inference improve retention more than locking all conversation behind the highest tier.

Primary product metrics are successful spoken minutes per weekly active learner, completed speaking sessions, seven-day speaking retention, confirmed retry improvement, and safe human-practice matches. Guardrails include speech false-rejection rate by accent/device, correction dispute rate, unsafe-contact rate, median and p95 turn latency, crash/thermal-abort rate, raw-audio retention, and inference cost per completed useful session.

## Goals / Non-Goals

**Goals:**

- Migrate preserved behaviors into modular domains inside `_latest-es/` without copying legacy architecture.
- Make useful English speaking, dictation, transcription, and playback work on a broad mobile-device range.
- Use small, replaceable models and task-specific pipelines rather than one model for every AI task.
- Keep raw voice local by default where feasible and disclose every processing transition.
- Ground explanations and practice generation in licensed English-learning material and learner-approved history.
- Expose a safe, user-authorized subset through one remote MCP endpoint compatible with capable ChatGPT and Gemini integrations.
- Make model selection an evaluated release decision, not a permanent architecture dependency.

**Non-Goals:**

- Training a foundation model from scratch.
- Claiming an official CEFR, IELTS, TOEFL, immigration, employment, or clinical assessment.
- Requiring a local LLM on every phone.
- Voice cloning, emotion inference, surveillance, or training on learner audio by default.
- Treating ASR confidence as a pronunciation score.
- Rebuilding any marketplace, commerce, or `rse-shop` feature.
- Guaranteeing consumer-client MCP availability where ChatGPT or Gemini plan, administrator, platform, or beta restrictions do not support it.

## Decisions

### 1. Use a modular monolith first, with isolated inference workers

The product API remains an Elysia modular monolith in `_latest-es/apps/server`, backed by shared domain packages and PostgreSQL. CPU/GPU-heavy ingestion, speech, embedding, reranking, and LLM inference run behind queue-backed worker or inference interfaces. This keeps transactions and authorization simple while allowing AI workloads to scale independently.

Domain packages are vertical slices: a domain that has both API and mobile behavior owns them together
under `src/server` and `src/native`, including its contracts, Eden/TanStack Query client, native
screens/components, helpers, and tests. `apps/server` and `apps/native/src/app` are composition roots,
not feature containers. Shared Expo/React Native presentation primitives live in `packages/_ui`, and
cross-domain runtime infrastructure lives in the appropriate underscored infrastructure package.
This keeps one domain cohesive without coupling unrelated domains through an application folder.

Alternatives considered:

- Immediate microservices: rejected for the first release because the operational and identity complexity exceeds current product scale.
- Put all AI in the Bun API process: rejected because native/model runtimes, long requests, memory pressure, and independent scaling would reduce API reliability.

Suggested domains are identity/profile, social graph, messaging, rooms, content, notifications, practice, AI gateway, knowledge, MCP, moderation, and audit. Each owns its commands and data access; cross-domain effects use transactional outbox events.

### 2. Use capability-tiered hybrid AI

Do not define a device as simply “AI-capable.” Qualify independent capabilities:

| Tier | Expected device | Default capabilities |
|---|---|---|
| A | low-memory/budget or constrained storage | VAD, platform TTS or small downloaded voice, deterministic exercises; server ASR/LLM only with consent |
| B | typical recent mid-range | local VAD + English ASR + TTS; server conversation/feedback/RAG |
| C | high-memory/high-performance | Tier B plus optional quantized local compact LLM and local embeddings |
| Offline strict | any qualified device | only downloaded local capabilities; no practice payload leaves device |

Routing is per task and session. A learner can use local ASR with a server LLM, local TTS with server RAG, or fully local dictation. A signed model manifest controls availability by runtime, ABI, memory budget, and evaluation cohort. The app measures cold load, peak resident memory, tokens per second, speech real-time factor, battery drain, thermal throttling, and interruption behavior before expanding eligibility.

Alternatives considered:

- Bundle all models in the app: rejected due to store size, update cadence, and low-end-device risk.
- Server-only AI: rejected due to latency, recurring cost, connectivity, and voice privacy.
- Fully local AI on all devices: rejected because a useful LLM plus speech stack will exceed many devices' memory, storage, and thermal budgets.

### 3. Use task-specific English model candidates and bake off before selection

“English-only” is valuable for parameter efficiency but is not sufficient evidence of teaching expertise. The plan prefers English-focused candidates and then adds pedagogy through curriculum grounding, structured prompts, deterministic rules, small adapters where licensing permits, and evaluations across CEFR levels and accents.

Candidate shortlists are deliberately replaceable:

| Task | First candidate | Alternatives | Deployment decision |
|---|---|---|---|
| Endpoint/VAD | Silero VAD ONNX | native audio energy gate plus calibrated VAD | On device; tiny footprint and prevents unnecessary inference |
| Mobile streaming ASR | compact English streaming Zipformer via sherpa-onnx | two-pass streaming recognizer + Whisper final pass | Prefer true streaming for live captions; validate accents/noise |
| Mobile final ASR/dictation | Whisper `tiny.en` or `base.en` quantized | Moonshine Tiny/Base English | `tiny.en` is a strong compatibility baseline; Moonshine targets short-form edge speech and has an English Tiny artifact around 110 MB ([model card](https://huggingface.co/UsefulSensors/moonshine-tiny)) |
| Mobile low-footprint TTS | Piper English ONNX voice | platform TTS | Piper medium English voices are roughly 63 MB each and MIT-licensed in the published voice repository ([voice artifact](https://huggingface.co/rhasspy/piper-voices/blob/main/en/en_US/hfc_male/medium/en_US-hfc_male-medium.onnx)); platform TTS is the zero-download fallback |
| Higher-quality TTS | Kokoro-82M | server provider voice | Prefer server or qualified high-end local experiment; the model is 82M parameters and Apache-licensed, but artifact/runtime footprint is materially larger than Piper ([model card](https://huggingface.co/hexgrad/Kokoro-82M)) |
| Mobile conversation LLM | SmolLM2-360M-Instruct for minimum tier; SmolLM2-1.7B-Instruct Q4 for high tier | LFM2-350M/700M, Gemma 3 1B, Qwen small variants | SmolLM2 primarily understands/generates English, has 135M/360M/1.7B sizes, Apache 2.0, and is explicitly positioned for on-device use ([official model card](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct)); select only after real-device pedagogy bake-off |
| Server conversation/feedback | SmolLM2-1.7B adapted baseline | SmolLM3-3B, Phi-4-mini (~3.8B), Qwen 3-class 4B | Keep default self-hosted candidates at or below roughly 4B; use a stronger fallback only if explicitly approved and costed |
| English embeddings | BGE-small-en-v1.5 | all-MiniLM-L6-v2 | BGE is English, MIT, 384-dimensional and has ONNX availability; tune thresholds on project data because absolute cosine values are not probabilities ([model card](https://huggingface.co/BAAI/bge-small-en-v1.5)) |
| English reranking | cross-encoder/ms-marco-MiniLM-L-6-v2 | BGE reranker base on server | Start with the smaller cross-encoder; graduate only if evaluation gain justifies latency |
| Pronunciation evidence | English wav2vec2/CTC phoneme alignment plus GOP-like calibrated features | server forced aligner and pronunciation-specific model | Server first; never substitute ASR transcript confidence for phoneme accuracy |
| Grammar/style | deterministic English rules plus structured small-LLM review | LanguageTool-compatible server rules, specialized classifiers | Rules supply explainability; LLM handles context and prioritization |

Approximate quantized LLM files can range from hundreds of MB for ~350M models to roughly 1 GB or more for ~1.7B models; runtime memory also includes context/KV cache and native overhead. Exact budgets must come from produced artifacts and target-device measurements, not parameter count alone.

Whisper models operate on 30-second windows and can be chunked with timestamps ([Whisper `tiny.en` model card](https://huggingface.co/openai/whisper-tiny.en)). For conversation, use a two-pass design: low-latency local partials, VAD endpointing, then a final local or server refinement. Preserve both transcript confidence and audio-quality signals so pronunciation feedback can abstain.

### 4. Use native inference through Expo development builds, not Expo Go

The mobile application will keep Expo Router and use custom development/production builds for native model runtimes. `llama.rn` provides GGUF loading, Metal/OpenCL/other backend offload, KV-cache quantization, LoRA support, cancellation, token streaming, and structured JSON constraints. Current `llama.rn` releases require React Native New Architecture. Sherpa-onnx provides offline ASR, VAD, and TTS across iOS/Android and demonstrates a two-pass streaming/final recognition pipeline.

Model files live in protected app storage, never the JS bundle cache. Downloads use resumable transfers, signed manifests, SHA-256 verification, free-space checks, atomic activation, and rollback. Only one large generative model context is active by default. Audio capture runs through a bounded ring buffer; UI updates are throttled independently of inference callbacks.

Alternatives considered:

- A JavaScript/WASM-only stack: useful on web but rejected as the primary mobile runtime because native acceleration, audio integration, and predictable memory controls are stronger in native bindings.
- ExecuTorch/MLC as the first LLM runtime: credible future candidates, but GGUF/llama.cpp has broader small-model availability and `llama.rn` aligns directly with React Native. Keep the gateway and model-manifest format runtime-neutral so a measured NPU backend can be added later.
- One speech library for every task: sherpa-onnx is the integration baseline, but task models remain replaceable when a platform-native or specialized runtime wins the bake-off.

### 5. Split conversation from assessment

The conversation orchestrator owns turn-taking, scenario state, hints, latency, and response generation. The assessment pipeline asynchronously produces transcript evidence, disfluency statistics, grammar/rule findings, vocabulary observations, and pronunciation evidence. This prevents assessment latency from blocking the next conversational turn and allows correction timing preferences.

The result schema includes evidence span, category, original form, suggested form, short explanation, confidence band, model/rule version, and retry prompt. It caps priority feedback, stores learner-confirmed outcomes separately from model suggestions, and never averages unrelated signals into an unexplained global score.

Pronunciation scoring uses reference text only when the task has one. For spontaneous speech, the system first confirms the transcript and limits claims to supported intelligibility/fluency evidence. It evaluates non-native accents and multiple valid English varieties rather than optimizing exclusively for imitation of one native accent.

### 6. Build RAG as a permissioned evidence pipeline

Use PostgreSQL as the system of record and begin with a vector-capable PostgreSQL index so identity, content state, filters, and embeddings can share transactions and deletion workflows. Keep an abstraction around vector search so scale evidence—not fashion—drives a future dedicated vector store.

Pipeline:

1. Accept only reviewed sources; record source URL/file, license, author, edition, checksum, level, topics, access policy, and publication state.
2. Extract and normalize while retaining headings, page/section coordinates, and source offsets.
3. Chunk semantically with small overlap; do not mix users or access scopes in a chunk.
4. Embed with a versioned English small embedding model and store model/chunk versions.
5. Retrieve with metadata filters first, then hybrid lexical + vector candidates.
6. Rerank the bounded top set when latency budget permits.
7. Build a context envelope that treats documents as untrusted quoted data.
8. Generate a level-appropriate answer with inline source identifiers.
9. Verify that cited spans exist and support the claims; abstain otherwise.

Separate indexes/namespaces cover published curriculum, moderated community content, and user-private memory. Private memory starts with explicit facts—goal, saved word, confirmed correction, completed scenario—not free-form psychological profiling. Deletion flows remove source rows, chunks, vectors, caches, and derived summaries.

Evaluation combines retrieval recall@k, nDCG/MRR, citation precision/recall, faithfulness, answer relevance, CEFR appropriateness, latency, and adversarial permission/injection cases. A golden set must include no-answer, conflicting-source, stale-source, Bangla-interface/English-content, accent-related, and cross-user leakage cases.

Alternatives considered:

- Let the LLM answer from parametric memory: rejected for educational claims where citations and freshness matter.
- Embed full documents: rejected because retrieval precision and citations degrade.
- Store all conversations as memory automatically: rejected as invasive and likely to amplify recognition/model mistakes.

### 7. Make MCP a thin authorization boundary over product services

Deploy one remote Streamable HTTP MCP endpoint backed by the same domain authorization services—not direct database access. The first release is read-heavy: profile summary, goals, saved vocabulary, progress, material search/fetch with citations, and practice-plan generation. A single low-risk write, recording a learner-confirmed practice result, validates mutation controls before expanding.

The current MCP authorization design uses OAuth protected-resource metadata, authorization-server discovery, resource indicators/audience binding, PKCE S256, exact redirect validation, short access tokens, rotating refresh tokens, and no token passthrough. Scope examples:

- `profile:read`
- `progress:read`
- `vocabulary:read`
- `materials:search`
- `practice-plan:read`
- `practice-result:write`

Each tool re-authorizes tenant, subject, scope, resource ownership, input bounds, and rate limit. Tool descriptions and annotations improve client UX but never replace server policy. Mutations require idempotency keys and current user confirmation. Audit logs store who, client, tool, scope, affected object, policy version, result, and correlation ID—not raw prompt content by default.

Compatibility constraints are product-visible:

- ChatGPT can connect to remote MCP apps, but full write support and developer-mode availability vary by plan/workspace and are currently web-oriented; OAuth refresh access needs correct discovery metadata ([OpenAI custom MCP app guidance](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta.svgz)).
- Gemini's Interactions API supports remote MCP using Streamable HTTP, a server URL, optional headers, and allowed-tool filtering; SSE-only servers are not supported ([Gemini function-calling documentation](https://ai.google.dev/gemini-api/docs/function-calling)).

Therefore the product promises a standards-based endpoint tested with supported clients, not universal availability inside every consumer account. Maintain contract tests for initialization, discovery, OAuth, read tools, confirmation, revocation, and incompatible-client error guidance.

Alternatives considered:

- Separate ChatGPT and Gemini proprietary integrations: rejected because they duplicate policy and drift; thin client-specific metadata is acceptable around one MCP contract.
- API keys pasted by learners: rejected due to poor rotation, broad authority, and leakage risk.
- Expose AI orchestration or raw SQL as MCP tools: rejected; tools express bounded learner outcomes.

### 8. Design privacy, safety, and supply-chain governance into the data model

Core records include `consent_grant`, `retention_policy`, `voice_artifact`, `practice_session`, `practice_turn`, `transcript_revision`, `feedback_item`, `learner_memory`, `model_manifest`, `model_evaluation`, `content_source`, `content_chunk`, `mcp_client_grant`, and append-only `audit_event`. Sensitive object payloads use private storage with short-lived authorized access. Database rows retain ownership, purpose, region, encryption-key reference, expiry, and deletion state.

Model promotion requires license review, provenance, checksum/signature, malware/unsafe-serialization scan, model card, intended-use statement, evaluation report, rollback artifact, and named owner. Prefer safetensors, GGUF, or ONNX artifacts; do not enable arbitrary remote-code execution in production model loading.

Safety layers are deterministic authorization and input validation first, then model moderation/classification where useful, then user reporting and human operations. Conversation models cannot independently alter scopes, share data, initiate contacts, or perform MCP writes.

### 9. Use staged experiments and explicit release gates

Product discovery precedes full build:

- Interview English learners across beginner/intermediate/advanced levels, low-bandwidth users, privacy-sensitive users, and multiple accents; include existing community-feature users if available.
- Prototype role-play, dictation, feedback timing, progress recap, and AI-to-human handoff without requiring final models.
- Run blind model/audio comparisons using representative target devices and consented evaluation speech.
- Establish task-level minimums before choosing models: ASR word error rate and semantic error, endpoint latency, TTS intelligibility/naturalness, LLM scenario adherence and correction precision, RAG groundedness, and MCP authorization negatives.

Rollouts move internal -> invited alpha -> device/accent cohorts -> limited production -> general availability. Feature flags bind model, prompt, retrieval, and policy versions. Every phase has automated rollback on safety/crash thresholds and manual rollback on quality/cost regressions.

## Risks / Trade-offs

- [A sub-2B LLM may sound fluent but teach incorrectly] -> Ground lesson claims, combine rules with model review, cap feedback, evaluate correction precision, and escalate/abstain.
- [English-only models may still underperform on non-native accents] -> Accent-stratified ASR and pronunciation evaluation, learner correction, confidence bands, and no punishment for valid English varieties.
- [Local models increase download, RAM, battery, and thermal load] -> Capability tiers, optional packs, quantization bake-offs, one active large context, interruption, thermal budgets, and server/deterministic fallback.
- [Native AI libraries complicate Expo upgrades] -> Pin supported React Native/Expo/runtime combinations, use development builds and CI device smoke tests, isolate bindings behind adapters.
- [Model licenses or artifacts change] -> Pin immutable revisions and hashes, retain reviewed licenses/model cards, block remote code, and support manifest revocation.
- [Voice data is unusually sensitive] -> Local-first defaults, granular consent, short retention, private storage, deletion propagation, no raw audio in logs, and no training by default.
- [Pronunciation scores can encode accent bias and false precision] -> Use intelligibility-focused evidence, subgroup calibration, abstention, disputes, and separate metrics rather than one score.
- [RAG can leak private data or obey injected documents] -> Filter before retrieval, isolate namespaces, quote untrusted context, prohibit authority expansion, validate citations, and test negative permissions.
- [MCP creates a high-value authorization surface] -> OAuth resource binding, PKCE, short tokens, narrow scopes, re-authorization per tool, confirmation, rate limits, audit, revocation, and red-team tests.
- [ChatGPT/Gemini MCP capabilities are evolving] -> Maintain one standards-conformant Streamable HTTP service, publish a compatibility matrix, keep read tools primary, and avoid client-specific behavior in domain services.
- [AI features can become financially unsustainable] -> Local speech, small models, bounded context/output, caching only where privacy allows, task routing, cost guardrails, and cohort economics tied to completed useful sessions.
- [Community features increase moderation burden] -> Phase social rollout after block/report/moderation, age policy, audit, and staffing/response targets are operational.
- [Legacy UI can be mistaken for production behavior] -> Track every migrated feature as `verified`, `partial`, `mock`, or `disabled`; define acceptance from specs rather than screenshots alone.

## Migration Plan

1. Freeze scope and evidence: publish the non-shop feature inventory, status labels, user journeys, success metrics, target device matrix, and consent/retention policy.
2. Complete foundation in `_latest-es/`: profiles/preferences, domain boundaries, RBAC, audit/outbox, private object storage, telemetry, and migration-safe schemas.
3. Migrate content and community basics: materials, notifications, discovery, requests, messaging, block/report, then calls/matching/live streams behind safety gates.
4. Build the AI evaluation harness before product inference: datasets, device runner, accent/level slices, model registry, model cards, baseline metrics, and promotion rules.
5. Ship local speech pilot: downloadable VAD + English ASR + Piper/platform TTS; validate dictation, barge-in, storage, battery, and offline behavior.
6. Ship server speaking coach: gateway, small-model bake-off, scenario orchestrator, structured feedback, rules, async assessment, and progress events.
7. Add optional local LLM on qualified devices after it passes memory, thermal, latency, teaching, and safety gates.
8. Build curated RAG: licensed source ingestion, hybrid retrieval, citations, private learner memory, deletion, injection defenses, and evaluation.
9. Release read-only MCP alpha, then OAuth refresh/revocation and one confirmation-gated write; certify supported ChatGPT and Gemini paths.
10. Expand cohorts only when product, quality, safety, privacy, device, and unit-economics gates pass.

Each phase is backward-compatible and feature-flagged. Database changes use additive expand/migrate/contract steps. Model rollout retains the previous signed artifact and manifest. Service rollback disables the feature flag or routes to the last approved model; account, content, and practice source records remain intact.

## Open Questions

- Which low- and mid-range Android devices best represent the initial Bangladesh and target-market audience? Final model tiers depend on measured hardware distribution.
- Which English reference varieties should be downloadable at launch beyond General American and British, based on user interviews and voice/model licensing?
- Does the first business model fund server AI through a daily free allowance, subscription, institution plan, or a mix? The architecture supports quotas without putting core offline practice behind server inference.
- Which qualified educators will own pedagogy review and the gold correction set?
- Which regions and age groups launch first? This determines data residency, child-safety, and retention configuration.

## Research References

- [SmolLM2 official model card](https://huggingface.co/HuggingFaceTB/SmolLM2-1.7B-Instruct)
- [Whisper tiny.en official model card](https://huggingface.co/openai/whisper-tiny.en)
- [Moonshine Tiny English model card](https://huggingface.co/UsefulSensors/moonshine-tiny)
- [BGE small English v1.5 model card](https://huggingface.co/BAAI/bge-small-en-v1.5)
- [Kokoro-82M model card](https://huggingface.co/hexgrad/Kokoro-82M)
- [Piper English ONNX voices](https://huggingface.co/rhasspy/piper-voices/tree/main/en/en_US)
- [llama.rn repository and current integration documentation](https://github.com/mybigday/llama.rn)
- [sherpa-onnx documentation](https://k2-fsa.github.io/sherpa/onnx/)
- [Model Context Protocol specification](https://modelcontextprotocol.io/specification/2026-07-28)
- [OpenAI: apps and custom MCP connectors in ChatGPT](https://help.openai.com/en/articles/11487775-connectors-in)
- [OpenAI: developer mode and full MCP apps](https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta.svgz)
- [Google Gemini: remote MCP through function calling](https://ai.google.dev/gemini-api/docs/function-calling)
- [Duolingo FY2025 shareholder letter](https://www.sec.gov/Archives/edgar/data/1562088/000162828026012513/q4fy25duolingo12-31x25shar.htm)
- [Speak product and learning loop](https://www.speak.com/?lang=en)
- [ELSA 2026 speaking product update](https://blog.elsaspeak.com/en/discover-the-new-elsa-speak-experience/)
- [AI conversation bots, speaking skills, and anxiety study](https://www.nature.com/articles/s41599-025-05550-z)
