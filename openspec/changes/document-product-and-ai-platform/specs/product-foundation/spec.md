## Purpose

Defines the active product boundary and the identity, profile, preference, and account behaviors required by every English Sphere experience.

## ADDED Requirements

### Requirement: Active product boundary
The project SHALL treat `_latest-es/` as the only active implementation and SHALL use legacy applications only as behavioral references. The product SHALL exclude every `rse-shop` and marketplace capability from this migration.

#### Scenario: Legacy feature migration
- **WHEN** a preserved legacy behavior is implemented
- **THEN** its production code and tests exist under `_latest-es/` and no legacy application is modified

#### Scenario: Marketplace request
- **WHEN** a plan or migration item is derived from shop, catalog, cart, checkout, order, inventory, delivery, or book-marketplace code
- **THEN** it is marked out of scope for this product change

### Requirement: Secure account access
The system SHALL support email-and-password registration, sign-in, sign-out, session restoration, credential recovery, and verified session revocation through a single identity shared by the mobile app, server AI services, RAG, and MCP.

#### Scenario: Session restoration
- **WHEN** an authenticated learner reopens the mobile app with a valid session
- **THEN** the app restores the learner session without requesting credentials again

#### Scenario: Revoked session
- **WHEN** a session is revoked or expired
- **THEN** protected product, AI, RAG, and MCP access is denied and the learner is prompted to authenticate

### Requirement: Learner onboarding and profile
The system SHALL let a learner maintain a display name, image, age band, gender disclosure, country, English proficiency, goals, interests, preferred accent, daily practice target, and self-selected skills. Optional or sensitive fields SHALL be visibly optional and access-controlled.

#### Scenario: Minimum onboarding
- **WHEN** a new learner supplies the minimum required identity, consent, English level, and goal fields
- **THEN** the learner can enter the product without disclosing optional demographic data

#### Scenario: Skill management
- **WHEN** a learner adds or removes a skill or learning interest
- **THEN** discovery and personalization use the updated value without changing historical practice evidence

### Requirement: Preferences and localization
The system SHALL provide theme, notification, accessibility, speech speed, caption, accent, AI-processing, retention, and language preferences. The learner-facing shell SHALL support English and Bangla localization while English-learning content remains explicitly identified as English.

#### Scenario: AI preference respected
- **WHEN** a learner disables server AI processing
- **THEN** the app uses qualified on-device features only and clearly identifies unavailable server-only capabilities

#### Scenario: Localized shell
- **WHEN** a learner selects Bangla as the interface language
- **THEN** navigation and product controls use Bangla while lesson examples and English feedback retain their intended language

### Requirement: Account lifecycle and portability
The system SHALL let learners export and delete their account data, revoke active sessions and external grants, and understand which records are retained for legal or security reasons.

#### Scenario: Account deletion
- **WHEN** a learner confirms account deletion
- **THEN** personal data, voice artifacts, user-scoped RAG memory, model personalization, and MCP grants are deleted or irreversibly de-identified according to the disclosed retention schedule

