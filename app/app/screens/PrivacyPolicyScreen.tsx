import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, Screen, Text } from "app/components"

export const PrivacyPolicyScreen: FC<AppStackScreenProps<"PrivacyPolicy">> = observer(
  function PrivacyPolicyScreen(_props) {
    const { navigation } = _props

    return (
      <Screen style={$root} preset="scroll" safeAreaEdges={["top", "bottom"]}>
        <Text text="privacyPolicy" />
        <Button onPress={() => navigation.navigate("Login")} text="Back to Login" />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
