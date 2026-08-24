export function safeBootstrapRedirect(path: string) {
  if (!path.startsWith("/") || path.startsWith("//")) return "/";
  return path;
}

export function isBootstrapAuthEnabled(nodeEnvironment: string) {
  return nodeEnvironment !== "production";
}
