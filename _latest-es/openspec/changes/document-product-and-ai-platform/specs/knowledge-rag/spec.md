## Purpose

Grounds English-learning answers and personalization in curated, permission-aware knowledge with citations, freshness, deletion, and measurable retrieval quality.

## ADDED Requirements

### Requirement: Curated knowledge ingestion

The system SHALL ingest only approved English-learning sources with source identity, license, author, level, topic, revision, checksum, and publication status; extracted and chunked representations SHALL remain traceable to the source.

#### Scenario: Source revision

- **WHEN** an approved source changes
- **THEN** affected chunks and embeddings are versioned or replaced and stale representations stop serving after the configured transition

### Requirement: Permission-aware retrieval

Retrieval SHALL apply tenant, user, content-access, age, consent, and publication filters before ranking and SHALL combine lexical and semantic retrieval where evaluation shows benefit.

#### Scenario: Cross-user isolation

- **WHEN** a learner query is similar to another learner's private history
- **THEN** the other learner's content is excluded before candidate results reach generation or reranking

### Requirement: Grounded answers with citations

RAG answers SHALL cite the supporting material at a resolvable section or chunk, distinguish source statements from generated coaching, and decline or qualify claims when evidence is missing or conflicting.

#### Scenario: Unsupported question

- **WHEN** retrieved evidence is insufficient for a reliable answer
- **THEN** the assistant states the limitation and offers a safer search, teacher review, or general practice response without invented citations

### Requirement: Learner-controlled memory

Personalization memory SHALL be derived from learner-approved goals, saved vocabulary, confirmed errors, and practice history; learners SHALL be able to inspect, correct, forget, export, or delete it.

#### Scenario: Forget memory item

- **WHEN** a learner deletes a memory item
- **THEN** it is removed from retrieval and downstream derived indexes within the disclosed deletion window

### Requirement: Retrieval and answer evaluation

The system SHALL maintain representative English-learning evaluation sets and measure retrieval recall, ranking quality, citation precision, answer faithfulness, level appropriateness, latency, and negative permission cases.

#### Scenario: Retrieval configuration change

- **WHEN** chunking, embedding, index, reranking, or prompt configuration changes
- **THEN** the candidate is compared against the current baseline and cannot ship if critical groundedness or access-control gates regress

### Requirement: Injection-resistant content handling

Retrieved documents and learner content SHALL be treated as untrusted data, separated from system instructions, size-limited, scanned, and prevented from expanding tool authority.

#### Scenario: Malicious instruction in a document

- **WHEN** retrieved text asks the model to reveal secrets or invoke a tool
- **THEN** the instruction is treated as quoted content and receives no additional authority
