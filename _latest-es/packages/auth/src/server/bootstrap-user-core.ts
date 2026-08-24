export interface BootstrapUserInput {
  name: string;
  email: string;
  password: string;
}

export interface BootstrapUserCandidate {
  email: string;
}

export interface BootstrapUserRepository<Candidate extends BootstrapUserCandidate> {
  findByEmail: (email: string) => Promise<Candidate | undefined>;
  create: (input: BootstrapUserInput) => Promise<Candidate>;
}

export function normalizeBootstrapUser(input: BootstrapUserInput): BootstrapUserInput {
  return {
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    password: input.password,
  };
}

export async function ensureBootstrapUserWith<Candidate extends BootstrapUserCandidate>(
  repository: BootstrapUserRepository<Candidate>,
  rawInput: BootstrapUserInput,
) {
  const input = normalizeBootstrapUser(rawInput);
  const existing = await repository.findByEmail(input.email);
  if (existing) return { candidate: existing, created: false as const, raced: false as const };

  try {
    const candidate = await repository.create(input);
    return { candidate, created: true as const, raced: false as const };
  } catch (error) {
    const racedCandidate = await repository.findByEmail(input.email);
    if (racedCandidate) {
      return { candidate: racedCandidate, created: false as const, raced: true as const };
    }
    throw error;
  }
}
