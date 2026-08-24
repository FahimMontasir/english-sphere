## Purpose

Preserves and completes the community speaking experience through safe discovery, messaging, matching, real-time calls, live streams, and reputation signals.

## ADDED Requirements

### Requirement: Learner discovery and leaderboard
The system SHALL let authenticated learners search, filter, sort, and page through discoverable profiles using name, country, interests, skills, age band, gender disclosure, activity, and reputation, subject to each learner's visibility controls.

#### Scenario: Filtered discovery
- **WHEN** a learner applies valid discovery filters
- **THEN** the system returns a paginated, stable result set containing only profiles permitted to be discovered

#### Scenario: Hidden profile
- **WHEN** a learner disables discovery visibility or blocks another learner
- **THEN** the hidden profile is omitted from the affected learner's search and leaderboard results

### Requirement: Reputation and achievement signals
The system SHALL support up-votes, down-votes, badges, practice achievements, and leaderboard positions with anti-abuse controls and an explanation of how each signal is calculated.

#### Scenario: Manipulated voting
- **WHEN** automated, reciprocal, or otherwise abusive voting is detected
- **THEN** the suspect signal is excluded from ranking pending moderation and no private detector details are exposed

### Requirement: Relationship requests and messaging
The system SHALL support chat invitations, acceptance, rejection, blocking, a friend/conversation list, presence, message history, and real-time text messaging with delivery state.

#### Scenario: Accepted invitation
- **WHEN** a recipient accepts a valid chat invitation
- **THEN** both learners can open a shared conversation and receive authorized real-time messages

#### Scenario: Blocked contact
- **WHEN** a learner blocks another learner
- **THEN** new invitations, messages, calls, discovery exposure, and presence sharing between them are denied

### Requirement: Instant speaking partner matching
The system SHALL match opted-in learners for short English conversations using level, goals, interests, availability, safety constraints, and recent-match diversity, and SHALL allow either learner to skip or leave.

#### Scenario: Successful InstaTalk match
- **WHEN** two compatible learners are available and consent to matching
- **THEN** the system creates a time-bounded speaking room and provides topic prompts appropriate to both levels

#### Scenario: No match available
- **WHEN** no compatible learner is available within the wait target
- **THEN** the app offers an AI practice session or a later notification without silently broadening safety preferences

### Requirement: Real-time audio and video calls
The system SHALL support authenticated audio/video rooms, microphone and camera controls, camera switching, connection recovery, leave/end controls, and clear recording consent. A useful audio-only fallback SHALL remain available on weak networks.

#### Scenario: Network degradation
- **WHEN** video quality cannot be sustained
- **THEN** the call offers or automatically enters an announced audio-only mode while preserving the room

### Requirement: Learner live streams
The system SHALL let eligible hosts create live English-practice streams, let learners browse and join them, and let hosts accept a bounded number of participant requests, mute/remove participants, and end the stream.

#### Scenario: Participant limit
- **WHEN** a host has reached the configured on-stage participant limit
- **THEN** further requests remain queued or are rejected without exceeding the limit

### Requirement: Community safety and moderation
The system SHALL provide report, block, mute, rate-limit, eligibility, moderation, and emergency-exit controls across discovery, messaging, matching, calls, and live streams.

#### Scenario: Abuse report
- **WHEN** a learner submits a report
- **THEN** the system acknowledges it, preserves only authorized evidence, prevents retaliation exposure, and routes it to a traceable moderation workflow

