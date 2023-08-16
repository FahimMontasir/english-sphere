// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import "./app/services/pushNotification"
import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"

// Check if app was launched in the background and conditionally render null if so
function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }

  // Render the app component on foreground launch
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("app", () => HeadlessCheck)
export default App
