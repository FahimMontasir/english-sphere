import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { Icon, Screen, Text } from "../../components"
import { AppStackScreenProps } from "../../navigators"
import { spacing } from "../../theme"
import { SECURE_JWT_KEY, secureSave } from "app/utils/storage/secureStorageAsync"
import { useStores } from "app/models"
import { getCountryByTimezone } from "app/utils/getCountryByTimezone"

import gender from "gender-detection" // TODO: move this pkg to backend

export const LoginScreen: FC<AppStackScreenProps<"Login">> = observer(function LoginScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { setAuthToken },
  } = useStores()
  const { countryName, currency, countryCodeISO } = getCountryByTimezone() // TODO: move this pkg to backend

  console.log({
    gender: gender.detect("fahim"), // TODO: move this pkg to backend
  })

  const handleLogin = async () => {
    console.log({ countryCodeISO, countryName, currency })

    await secureSave(SECURE_JWT_KEY, "demojwttoken: ")
    setAuthToken("from settoken")
  }

  return (
    <Screen preset="fixed" contentContainerStyle={$screenContentContainer} safeAreaEdges={["top"]}>
      <Text
        text="Hi, enthusiastic learner! Welcome to this world"
        preset="heading"
        style={$topText}
      />
      <TouchableOpacity onPress={handleLogin} style={$iconContainer} activeOpacity={0.8}>
        <Icon icon="google" />
        <Text style={$iconText} text="Continue with google!" />
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
