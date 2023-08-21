import * as React from "react"
import { StyleProp, View, ViewStyle, ViewProps } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "src/theme"
import { Text, TextPresets } from "src/components/Text"
import { Button } from "./Button"
import { FastImage, FastImageStyle } from "./FastImage"

export interface UserCardProps extends ViewProps {
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<FastImageStyle>
  buttonContainerStyle?: StyleProp<ViewStyle>
  acceptText?: string
  rejectText?: string
  textPreset?: TextPresets
}

export const UserCard = observer(function UserCard(props: UserCardProps) {
  const {
    style,
    imageStyle,
    buttonContainerStyle,
    acceptText = "Accept",
    rejectText = "Reject",
    textPreset = "subheading",
    ...others
  } = props
  const $styles = [$container, style]

  return (
    <View style={$styles} {...others}>
      <FastImage
        uri="https://i.pravatar.cc/500"
        priority="high"
        style={[$pendingUserImg, imageStyle]}
      />
      <Text text="Atel Montasir" preset={textPreset} />
      <View style={[$buttonContainer, buttonContainerStyle]}>
        <Button text={acceptText} preset="reversed" />
        <Button text={rejectText} />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  alignItems: "center",
  gap: spacing.xxs,
  backgroundColor: colors.palette.white,
  padding: spacing.sm,
  borderRadius: spacing.xxs,
}

const $buttonContainer: ViewStyle = { flexDirection: "row", columnGap: spacing.xxs }

const $pendingUserImg: FastImageStyle = {
  height: 80,
  width: 80,
  borderRadius: spacing.xs,
}
