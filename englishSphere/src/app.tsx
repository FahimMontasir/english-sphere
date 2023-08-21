import "./i18n"
import "./utils/ignoreWarnings"
import React from "react"
import { Config as RNBConfig } from "react-native-bootsplash"
import Toast from "react-native-toast-message"
import { initialWindowMetrics, SafeAreaProvider } from "react-native-safe-area-context"
import Config from "./config"
import * as storage from "./utils/storage"
import { useInitialRootStore } from "./models"
import { AppNavigator, useNavigationPersistence } from "./navigators"
import { ErrorBoundary } from "./screens/ErrorScreen/ErrorBoundary"
import TanStackProvider from "./services/tanStack"
import { useOnlineManager } from "./services/tanStack/hooks/useOnlineManager"
import { useAppState } from "./services/tanStack/hooks/useAppState"

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"
interface IApp {
  hideSplashScreen: (config?: RNBConfig) => Promise<void>
}

function App({ hideSplashScreen }: IApp) {
  // required for tan stack query
  useOnlineManager()
  useAppState()

  const {
    initialNavigationState,
    onNavigationStateChange,
    isRestored: isNavigationStateRestored,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  const { rehydrated } = useInitialRootStore()

  if (__DEV__) {
    if (!rehydrated || !isNavigationStateRestored) return null
  } else {
    if (!rehydrated) return null
  }

  return (
    <>
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <ErrorBoundary catchErrors={Config.catchErrors}>
          <TanStackProvider>
            <AppNavigator
              onReady={() => hideSplashScreen({ fade: true, duration: 500 })}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </TanStackProvider>
        </ErrorBoundary>
      </SafeAreaProvider>

      <Toast />
    </>
  )
}

export default App
