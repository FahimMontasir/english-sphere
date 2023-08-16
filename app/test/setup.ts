// we always make sure 'react-native' gets included first
import * as ReactNative from "react-native"
import mockFile from "./mockFile"

// libraries to mock
jest.doMock("react-native", () => {
  // Extend ReactNative
  return Object.setPrototypeOf(
    {
      Image: {
        ...ReactNative.Image,
        resolveAssetSource: jest.fn((_source) => mockFile), // eslint-disable-line @typescript-eslint/no-unused-vars
        getSize: jest.fn(
          (
            uri: string, // eslint-disable-line @typescript-eslint/no-unused-vars
            success: (width: number, height: number) => void,
            failure?: (_error: any) => void, // eslint-disable-line @typescript-eslint/no-unused-vars
          ) => success(100, 100),
        ),
      },
    },
    ReactNative,
  )
})

jest.mock("i18n-js", () => ({
  currentLocale: () => "en",
  t: (key: string, params: Record<string, string>) => {
    return `${key} ${JSON.stringify(params)}`
  },
}))

jest.mock("react-native-mmkv", () => ({
  MMKV: function () {
    const storage = new Map<string, string | boolean | number>()

    return {
      set: (key: string, value: string): void => {
        storage.set(key, value)
      },
      getString: (key: string): string | undefined => {
        const result = storage.get(key)
        if (typeof result === "string") return result
        else return undefined
      },
      getNumber: (key: string): number | undefined => {
        const result = storage.get(key)
        if (typeof result === "number") return result
        else return undefined
      },
      getBoolean: (key: string): boolean | undefined => {
        const result = storage.get(key)
        if (typeof result === "boolean") return result
        else return undefined
      },
      contains: (key: string): boolean => storage.has(key),
      delete: (key: string) => {
        storage.delete(key)
      },
      getAllKeys: () => storage.keys(),
      clearAll: () => storage.clear(),
      recrypt: () => {
        console.warn("Encryption is not supported in mocked MMKV instances!")
      },
      addOnValueChangedListener: () => {
        console.warn("Value-changed listeners are not supported in mocked MMKV instances!")
      },
    }
  },
}))

declare const tron // eslint-disable-line @typescript-eslint/no-unused-vars

jest.useFakeTimers()
declare global {
  let __TEST__
}
