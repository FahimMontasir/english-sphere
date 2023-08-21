import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import YoutubePlayer from "react-native-youtube-iframe"
import { Button, Text } from "../../components"
import { isRTL } from "../../i18n"
import { AppStackScreenProps } from "../../navigators"
import { colors, spacing } from "../../theme"
import { useSafeAreaInsetsStyle } from "../../utils/useSafeAreaInsetsStyle"

const welcomeFace = require("../../../assets/images/welcome-face.png")

export const WelcomeScreen: FC<AppStackScreenProps<"Welcome">> = observer(function WelcomeScreen(
  _props,
) {
  const { navigation } = _props
  const [playing, setPlaying] = useState(true)

  function goNext() {
    setPlaying(false)
    navigation.navigate("Login")
  }

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.readyForLaunch"
          preset="heading"
        />
        <Text style={$subHeading} tx="welcomeScreen.exciting" preset="subheading" />

        <YoutubePlayer height={300} play={playing} videoId={"SJOnhWiJArM"} />

        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
      </View>

      <View style={[$bottomContainer, $bottomContainerInsets]}>
        <Text tx="welcomeScreen.postscript" size="md" />
        <Button
          testID="next-screen-button"
          preset="reversed"
          tx="welcomeScreen.letsGo"
          onPress={goNext}
        />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}
const $subHeading: TextStyle = { marginBottom: 60 }
const $bottomContainer: ViewStyle = {
  flexShrink: 0,
  flexGrow: 0,
  flexBasis: "33%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.lg,
  justifyContent: "space-around",
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.md,
}
