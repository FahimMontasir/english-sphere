const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  const value = email.trim();

  if (!value) {
    return "Email is required";
  }

  return EMAIL_PATTERN.test(value) ? null : "Enter a valid email address";
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "Password is required";
  }

  return password.length >= 8 ? null : "Use at least 8 characters";
}

export function validateName(name: string): string | null {
  const value = name.trim();

  if (!value) {
    return "Name is required";
  }

  return value.length >= 2 ? null : "Name must be at least 2 characters";
}
