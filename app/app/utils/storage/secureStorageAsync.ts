import * as SecureStore from "expo-secure-store"

// this is not any secret key (only used to retrieve jwt value)
export const SECURE_JWT_KEY = "jwt"

export async function secureSave(key: string, value: string): Promise<boolean> {
  try {
    await SecureStore.setItemAsync(key, value)
    return true
  } catch {
    return false
  }
}

export async function secureLoad(key: string): Promise<string | null> {
  try {
    return await SecureStore.getItemAsync(key)
  } catch {
    return null
  }
}

export async function secureDelete(key: string): Promise<boolean> {
  try {
    await SecureStore.deleteItemAsync(key)
    return true
  } catch {
    return false
  }
}
