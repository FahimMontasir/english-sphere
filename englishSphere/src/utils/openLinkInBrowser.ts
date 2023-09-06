import { Linking } from "react-native"
import Toast from "react-native-toast-message"

/**
 * Helper for opening a give URL in an external browser.
 */
export function openLinkInBrowser(url: string) {
  // Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url))
  Linking.openURL(url).catch(() =>
    Toast.show({
      type: "error",
      text1: "Link cannot be opened!",
      text2: "This may cause because of your device does not support.",
    }),
  )
}
