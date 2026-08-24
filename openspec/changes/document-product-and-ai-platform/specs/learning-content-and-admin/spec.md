## Purpose

Defines learning-material, learner communication, progress-event, and administrative operations while excluding all marketplace and commerce behavior.

## ADDED Requirements

### Requirement: Learning material catalog
The system SHALL present English-learning sections, important and recent materials, material details, and media appropriate to the learner's level and goals. Content SHALL carry provenance, level, topic, skill, publication state, and revision metadata.

#### Scenario: Browse learning materials
- **WHEN** a learner opens a material section
- **THEN** the app shows authorized published materials in a stable order with level and format indicators

#### Scenario: Unpublished material
- **WHEN** a material is draft, withdrawn, or outside the learner's access
- **THEN** it is not served from the learner catalog or RAG corpus

### Requirement: Learning activity and progress hooks
The system SHALL record consented completion, practice, vocabulary, grammar, speaking, and review events so that progress and AI personalization can be derived without overwriting source events.

#### Scenario: Offline activity sync
- **WHEN** an offline learning event reconnects
- **THEN** it is idempotently synchronized and contributes once to progress

### Requirement: Learner notifications and app messaging
The system SHALL support push-token lifecycle, notification preferences, in-app notification logs, targeted or broadcast administrative messages, and app-update notices.

#### Scenario: Revoked notification permission
- **WHEN** device notification permission or a push token is revoked
- **THEN** the invalid token is removed and the learner is not repeatedly targeted through it

### Requirement: Administrative user and content operations
Authorized administrators SHALL be able to search and review users, moderate accounts, create and revise learning materials, manage publication state, inspect delivery status, and send scoped learner communications. Every privileged mutation SHALL be auditable.

#### Scenario: Unauthorized administration
- **WHEN** a non-administrator requests an administrative operation
- **THEN** the system denies it without revealing protected user or moderation data

### Requirement: No commerce behavior
The learning-material experience SHALL NOT provide product prices, carts, checkout, payments, orders, inventory, shipping, or marketplace administration.

#### Scenario: Material recommendation
- **WHEN** the system recommends a learning material
- **THEN** the recommendation opens educational content and does not create or imply a commerce transaction

