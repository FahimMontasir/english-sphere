## Purpose

Provides accessible, low-pressure English speaking and dictation practice with evidence-linked feedback, adaptive review, and clear offline and online behavior.

## ADDED Requirements

### Requirement: Goal-directed speaking practice

The system SHALL offer level-appropriate role plays, free conversation, guided dialogue, shadowing, read-aloud, interview practice, and human-call preparation with selectable topic, duration, difficulty, accent, and correction style.

#### Scenario: Start role play

- **WHEN** a learner selects a role-play goal and duration
- **THEN** the coach establishes the scenario, keeps turns within the learner's level, and completes with a concise learning recap

### Requirement: Dictation and transcription

The system SHALL support tap-to-record and optional streaming English dictation, visible partial/final transcripts, edit-before-save, timestamps, and an explicit distinction between recognized text and the learner's intended text.

#### Scenario: Low-confidence transcript

- **WHEN** recognition confidence is below the calibrated threshold
- **THEN** uncertain spans are identified for learner confirmation and are not treated as pronunciation errors by default

### Requirement: Speech playback

The system SHALL provide intelligible English text-to-speech with user-controlled voice, accent, speed, replay, captions, and interruption, with an offline voice on supported devices.

#### Scenario: Learner interrupts playback

- **WHEN** the learner begins speaking or presses stop during AI speech
- **THEN** playback stops promptly and the new learner turn is accepted without waiting for the full utterance

### Requirement: Evidence-linked learning feedback

The system SHALL provide separate pronunciation, fluency, grammar, vocabulary, and task-completion feedback, link each claim to a transcript/audio span or rule, express uncertainty, and limit each session to a manageable number of priority corrections.

#### Scenario: Post-turn feedback

- **WHEN** a learner completes a turn in non-interrupting correction mode
- **THEN** the conversation continues naturally and priority corrections are shown after the turn or session with examples and a retry action

#### Scenario: Unsupported pronunciation judgment

- **WHEN** audio quality, accent coverage, or model confidence is insufficient
- **THEN** the system withholds a numeric pronunciation judgment and offers transcription review or a retry

### Requirement: Adaptive review and progress

The system SHALL create learner-approved review items from recurring mistakes and useful vocabulary, schedule retrieval practice, and show progress by skill and scenario using calibrated evidence rather than a single opaque score.

#### Scenario: Recurring grammar pattern

- **WHEN** the same confirmed grammar pattern occurs across sessions
- **THEN** the system proposes a focused explanation and review exercise without permanently labeling the learner

### Requirement: Hybrid continuity

The coach SHALL disclose whether a session is local, server-assisted, or degraded and SHALL preserve a useful offline path for downloaded capabilities. Server escalation SHALL require an allowed preference and protected network path.

#### Scenario: Connection loss during practice

- **WHEN** a server-assisted session loses connectivity
- **THEN** the app preserves the recording and transcript state, switches to an available local capability or pauses clearly, and avoids duplicate turns after reconnection
