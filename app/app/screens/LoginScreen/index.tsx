import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { spacing } from "../../theme"
import { useStores } from "app/models"

import { useLoginScreen } from "./useLoginScree"

export const LoginScreen: FC<AppStackScreenProps<"Login">> = observer(function LoginScreen(_props) {
  const { navigation } = _props

  const {
    authenticationStore: { setAuthToken },
  } = useStores()

  const { signIn, isLoading } = useLoginScreen(setAuthToken)

  const handleLogin = async () => {
    await signIn()
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer} safeAreaEdges={["top"]}>
      <Text
        text="Hi, enthusiastic learner! Welcome to this world"
        preset="heading"
        style={$topText}
      />
      <TouchableOpacity
        disabled={isLoading}
        onPress={handleLogin}
        style={$iconContainer}
        activeOpacity={0.8}
      >
        <Icon icon="google" />
        <Text style={$iconText} text={isLoading ? "Signing in..." : "Continue with google!"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("PrivacyPolicy")}
        style={$endContainer}
        activeOpacity={0.9}
      >
        <Text text="Made with ❤️ by Fahim Montasir" style={$endText} />
        <Text text="Privacy Policy" style={$privacyPolicy} />
      </TouchableOpacity>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
  paddingTop: 130,
  paddingBottom: spacing.xxl,
  paddingHorizontal: spacing.sm,
  alignItems: "center",
  justifyContent: "space-between",
}

const $topText: TextStyle = { width: "80%", textAlign: "center" }

const $iconContainer: ViewStyle = { alignItems: "center" }

const $iconText: TextStyle = { marginTop: -60 }

const $endText: TextStyle = {
  color: "#b5b3b3",
}

const $endContainer: ViewStyle = { alignItems: "center", gap: spacing.sm }

const $privacyPolicy: TextStyle = {
  color: "blue",
  textDecorationLine: "underline",
}
