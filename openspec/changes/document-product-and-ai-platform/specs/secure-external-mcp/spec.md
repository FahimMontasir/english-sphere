## Purpose

Lets learners deliberately connect English Sphere data and safe learning actions to compatible ChatGPT and Gemini clients through a standards-based remote MCP service.

## ADDED Requirements

### Requirement: Interoperable remote MCP endpoint
The system SHALL expose a versioned Streamable HTTP MCP endpoint and standards-conformant server metadata usable by compatible ChatGPT and Gemini clients. Client-specific limitations SHALL be documented and compatibility-tested.

#### Scenario: Client capability negotiation
- **WHEN** a supported client initializes an MCP session
- **THEN** the server negotiates only protocol capabilities and tools supported by both parties

### Requirement: OAuth-protected resource
The MCP service SHALL publish protected-resource and authorization-server metadata, require authorization code flow with PKCE where applicable, validate issuer, signature, expiry, audience/resource, scopes, tenant, and user on every request, use short-lived access tokens and rotating refresh tokens, and prohibit token passthrough.

#### Scenario: Wrong-audience token
- **WHEN** a valid token issued for another resource is presented
- **THEN** the MCP service rejects it and records a sanitized security event

### Requirement: Least-privilege learner grants
Users SHALL explicitly grant fine-grained scopes for profile, progress, saved vocabulary, materials, practice plans, and allowed mutations. Read-only access SHALL be the default, and the service SHALL expose only data owned by or shared with the authorized user.

#### Scenario: Missing scope
- **WHEN** a client calls a tool outside the token's scopes
- **THEN** the request is denied with a scope challenge and no protected data is returned

### Requirement: Safe MCP resources and tools
Initial resources and tools SHALL prioritize read-only learning use cases: get learner summary, list goals, list saved vocabulary, search approved materials, retrieve cited material, build a practice plan, and record a learner-confirmed practice result. Tool schemas SHALL be bounded and outputs SHALL minimize sensitive data.

#### Scenario: Unconfirmed mutation
- **WHEN** a tool would create, update, share, or delete learner data without explicit current confirmation
- **THEN** the service returns a confirmation-required response and performs no mutation

### Requirement: Revocation, audit, and rate control
Learners SHALL be able to view and revoke connected clients and grants. The service SHALL keep tamper-evident authorization and tool audit events, apply per-user/client/tool rate limits, and provide administrators security visibility without granting routine access to content.

#### Scenario: Grant revoked
- **WHEN** a learner revokes a client grant
- **THEN** its access and refresh tokens can no longer obtain protected MCP results

### Requirement: MCP threat controls
The service SHALL defend against confused-deputy flows, prompt injection, tool poisoning, excessive data return, replay, session fixation, SSRF, cross-tenant access, and unsafe chained mutations. Tool annotations SHALL not be the sole authorization control.

#### Scenario: Prompt requests broader authority
- **WHEN** a client prompt or tool argument asks the server to ignore policy or access another account
- **THEN** server-side authorization and validation deny the request regardless of model output

