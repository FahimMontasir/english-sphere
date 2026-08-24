## Why

English Sphere has a modern replacement stack in `_latest-es/`, but its established learner-facing features exist only in legacy applications and are not captured as durable product requirements. At the same time, speaking-focused language products are moving toward low-latency, personalized AI conversation; English Sphere needs a privacy-conscious hybrid AI plan that works on affordable mobile devices, scales on small server models, and safely exposes learner-owned capabilities to assistants through MCP.

## What Changes

- Establish `_latest-es/` as the only active implementation target and classify all other application folders as legacy reference code.
- Inventory and specify every non-shop legacy capability: authentication, onboarding, profiles, learner skills/interests, discovery and leaderboards, votes/badges, chat requests and messaging, InstaTalk matching, audio/video calls, live streams, learning materials, notifications, localization, administration, and app-update messaging.
- Explicitly exclude the `rse-shop` application, book marketplace, catalog, checkout, order, inventory, delivery, and shop administration from this change.
- Add a speaking-first product loop with scenario practice, dictation, transcripts, pronunciation/fluency/grammar/vocabulary feedback, adaptive review, progress evidence, and human/community practice.
- Add a tiered on-device AI runtime for English ASR, VAD, TTS, embeddings, and an optional compact conversation LLM, with hardware qualification, downloadable model packs, offline fallback, and server escalation.
- Add a small-model server AI platform for conversation coaching, retrieval, reranking, safety, evaluation, model routing, and cost/latency controls.
- Add a cited, permission-aware RAG system over curated English-learning content and user-owned learning history.
- Add a secured, remote Streamable HTTP MCP service that users can authorize from compatible ChatGPT and Gemini clients using least-privilege OAuth scopes.
- Add AI privacy, consent, safety, licensing, observability, red-team, and quality gates so model output is never treated as an authoritative language assessment without evidence and calibration.
- Sequence delivery through measurable pilots rather than committing the product to one model before device and learner evaluations.

## Capabilities

### New Capabilities

- `product-foundation`: Active/legacy boundaries plus authentication, onboarding, profiles, learner attributes, localization, preferences, and account lifecycle requirements.
- `social-speaking`: Learner discovery, leaderboard and reputation, chat relationships, messaging, instant partner matching, calls, live streams, presence, moderation, and safety.
- `learning-content-and-admin`: Learning-material discovery and consumption, progress hooks, push/app-update communication, and administrative user/content operations.
- `ai-speaking-coach`: AI conversation scenarios, dictation, transcription, speech playback, feedback, adaptive review, learner controls, and graceful offline/online behavior.
- `on-device-ai-runtime`: Device qualification, model packs, local ASR/VAD/TTS/LLM/embedding execution, routing, resource budgets, updates, and fallbacks.
- `ai-serving-and-evaluation`: Small server-model gateway, inference routing, English-teaching adaptation, safety, evaluation, observability, and release governance.
- `knowledge-rag`: Curated and user-scoped ingestion, retrieval, reranking, citations, freshness, privacy, deletion, and RAG quality evaluation.
- `secure-external-mcp`: Remote MCP resources/tools for ChatGPT and Gemini with OAuth discovery, least privilege, tenant isolation, confirmation, auditing, and revocation.
- `trust-privacy-and-ai-safety`: Voice-data consent, retention, child/learner safety, model licensing and supply-chain controls, abuse prevention, transparency, and incident response.

### Modified Capabilities

None. The repository has no existing main OpenSpec capability specifications.

## Impact

- Active implementation scope: `_latest-es/apps/native`, `_latest-es/apps/server`, and `_latest-es/packages/*`.
- Legacy reference scope: `englishSphere`, `backend`, `dashboard`, and `web`; these remain read-only migration sources. `rse-shop` is excluded.
- Expected platform additions include native Expo development builds, mobile model download/storage management, native LLM and ONNX inference bindings, object storage, background ingestion workers, a vector-capable PostgreSQL deployment, an inference service, an OAuth authorization surface, and a remote MCP endpoint.
- New data domains include learner goals and proficiency, conversations and turns, consent/retention settings, feedback evidence, practice events, content/chunks/embeddings, model manifests, evaluations, MCP grants, and immutable audit events.
- Public/API behavior expands to streaming speech/conversation, RAG answers with citations, model-pack management, and scoped MCP tools. Existing Better Auth identity becomes the user and authorization anchor.
- Product rollout requires representative low/mid/high mobile-device benchmarks, English-learner evaluations across accents and CEFR levels, privacy/security review, model-license review, and staged feature flags.
