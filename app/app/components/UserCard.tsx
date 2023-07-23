import * as React from "react"
import { ImageStyle, StyleProp, View, ViewStyle, ViewProps, Image } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text, TextPresets } from "app/components/Text"
import { Button } from "./Button"

export interface UserCardProps extends ViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  imageStyle?: StyleProp<ImageStyle>
  buttonContainerStyle?: StyleProp<ViewStyle>
  acceptText?: string
  rejectText?: string
  textPreset?: TextPresets
}

/**
 * Describe your component here
 */
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
      <Image
        source={{ uri: "https://i.pravatar.cc/500" }}
        resizeMode="cover"
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

const $container: ImageStyle = {
  alignItems: "center",
  gap: spacing.xxs,
  backgroundColor: colors.palette.white,
  padding: spacing.sm,
  borderRadius: spacing.xxs,
}

const $buttonContainer: ViewStyle = { flexDirection: "row", columnGap: spacing.xxs }

const $pendingUserImg: ImageStyle = {
  height: 80,
  width: 80,
  borderRadius: spacing.xs,
}
