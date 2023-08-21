import "src/services/pushNotification"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import App from "./src/app"
import { name as appName } from "./app.json"

// Check if app was launched in the background and conditionally render null if so
const HeadlessCheck = ({ isHeadless }) => {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null
  }

  // Render the app component on foreground launch
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
// AppRegistry.registerComponent(appName, () => App)
