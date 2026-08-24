import type { LearningMaterial, MaterialCollection } from "../types";

const MATERIALS: readonly LearningMaterial[] = [
  {
    id: "basic-speaking-starters",
    title: "Basic English for Speaking",
    summary: "Start short everyday conversations with practical greetings and responses.",
    level: "A1",
    topic: "Speaking",
    format: "Practice",
    skill: "speaking",
    isImportant: true,
    publishedAt: "2026-08-20T08:00:00.000Z",
    publicationState: "published",
    revision: 1,
    sourceTitle: "Legacy English Sphere learning materials",
  },
  {
    id: "future-tense-quick-guide",
    title: "Future Tense Quick Guide",
    summary: "Choose between will, going to, and the present continuous with confidence.",
    level: "A2",
    topic: "Grammar",
    format: "Lesson",
    skill: "grammar",
    isImportant: true,
    publishedAt: "2026-08-22T08:00:00.000Z",
    publicationState: "published",
    revision: 1,
    sourceTitle: "Legacy English Sphere learning materials",
  },
  {
    id: "daily-conversation-questions",
    title: "Daily Conversation Questions",
    summary: "Practice useful questions for meeting people and keeping a conversation moving.",
    level: "A1",
    topic: "Speaking",
    format: "Practice",
    skill: "speaking",
    isImportant: true,
    publishedAt: "2026-08-21T08:00:00.000Z",
    publicationState: "published",
    revision: 1,
    sourceTitle: "Legacy English Sphere learning materials",
  },
  {
    id: "workplace-words",
    title: "Workplace Words in Context",
    summary: "Learn common workplace vocabulary through short, natural examples.",
    level: "B1",
    topic: "Vocabulary",
    format: "Lesson",
    skill: "vocabulary",
    isImportant: false,
    publishedAt: "2026-08-24T08:00:00.000Z",
    publicationState: "published",
    revision: 1,
    sourceTitle: "Legacy English Sphere learning materials",
  },
  {
    id: "polite-requests",
    title: "Polite Requests",
    summary: "Use could, would, and may to make clear and respectful requests.",
    level: "A2",
    topic: "Speaking",
    format: "Practice",
    skill: "speaking",
    isImportant: false,
    publishedAt: "2026-08-23T08:00:00.000Z",
    publicationState: "published",
    revision: 1,
    sourceTitle: "Legacy English Sphere learning materials",
  },
];

export function listPublishedMaterials(): MaterialCollection {
  const recent = [...MATERIALS].sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );

  return {
    important: recent.filter((material) => material.isImportant),
    recent,
  };
}

export function findPublishedMaterial(materialId: string): LearningMaterial | null {
  return MATERIALS.find((material) => material.id === materialId) ?? null;
}
