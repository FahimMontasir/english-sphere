/** Expo inlines EXPO_PUBLIC_* references into the client bundle. Never put secrets here. */
export const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL ?? "http://localhost:3000";
