## Purpose

Defines safe, observable, and resource-bounded delivery of downloadable English speech, language, and retrieval models on diverse Android and iOS devices.

## ADDED Requirements

### Requirement: Device qualification and capability tiers
The system SHALL benchmark or conservatively infer device memory, storage, processor support, thermal state, battery state, and runtime compatibility before enabling a model. It SHALL assign capabilities independently rather than requiring one all-or-nothing AI tier.

#### Scenario: Budget device
- **WHEN** a device cannot safely host the local conversation LLM
- **THEN** qualified local VAD/ASR/TTS capabilities remain available and language generation routes to an allowed server or a deterministic offline exercise

### Requirement: Verifiable model packs
Every downloadable model pack SHALL declare task, language, version, format, quantization, size, minimum runtime, license, source, evaluation summary, checksum, and signature. The app SHALL verify integrity and compatibility before activation.

#### Scenario: Tampered model pack
- **WHEN** a downloaded model fails signature or checksum verification
- **THEN** it is never loaded, the previous valid version remains available, and a security event is recorded

### Requirement: Local English speech pipeline
Qualified devices SHALL support local voice activity detection, English speech recognition, and English speech synthesis with interruptible audio. Streaming and final-pass recognition MAY use different local models but SHALL identify final transcript state.

#### Scenario: End of utterance
- **WHEN** local VAD detects a calibrated endpoint
- **THEN** the recognizer finalizes or refines the utterance and the UI distinguishes final text from prior partial text

### Requirement: Optional local conversation model
Qualified devices SHALL be able to run a quantized, English-capable compact instruct model with token streaming, bounded context, cancellation, and structured-output validation. The local model SHALL not receive server-only tools or private data outside the current user's allowed context.

#### Scenario: Resource pressure
- **WHEN** memory, thermal, or battery pressure exceeds a safe threshold
- **THEN** generation is cancelled or downgraded cleanly and the app explains the fallback

### Requirement: Local routing and data minimization
The runtime SHALL choose the smallest qualified capability that meets the task and learner preference, and SHALL not upload raw audio, transcripts, embeddings, or prompts when a local-only preference applies.

#### Scenario: Local-only mode
- **WHEN** local-only mode is enabled
- **THEN** all enabled AI inference occurs on device and network requests contain no practice content

### Requirement: Model lifecycle controls
Learners SHALL be able to inspect, download, pause, resume, update, roll back, and remove optional model packs. Updates SHALL be staged, resumable, and storage-aware.

#### Scenario: Insufficient storage
- **WHEN** a model update cannot coexist with the active version safely
- **THEN** the app requests an explicit storage choice and keeps the active model usable until a verified replacement is ready

