type UseLocalStorage = {
  getItem: <T>(key: string) => T | null;
  setItem: <T>(key: string, value: T) => void;
  removeItem: (key: string) => void;
};

export const useLocalStorage: UseLocalStorage = {
  getItem: <T>(key: string): T | null => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    }
    return null;
  },
  setItem: <T>(key: string, value: T): void => {
    const stringifiedValue = JSON.stringify(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, stringifiedValue);
    }
  },
  removeItem: (key: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
};
