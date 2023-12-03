import * as React from "react"
import {
  StyleProp,
  TouchableOpacity,
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacityProps,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "src/theme"
import { Text } from "./Text"
import { FastImage, FastImageStyle } from "./FastImage"

export interface MaterialCardProps extends TouchableOpacityProps {
  style?: StyleProp<FastImageStyle>
  title: string
  thumbnail: string
}

export const MaterialCard = observer(function MaterialCard(props: MaterialCardProps) {
  const { style, title, thumbnail, ...others } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity activeOpacity={0.8} style={$touchableContainer} {...others}>
      <FastImage style={$styles} uri={thumbnail} priority="high">
        <View style={$textContainer}>
          <Text numberOfLines={1} preset="subheading" style={$text}>
            {title}
          </Text>
        </View>
      </FastImage>
    </TouchableOpacity>
  )
})

const $touchableContainer: ViewStyle = {
  overflow: "hidden",
  borderRadius: 8,
}

const $container: FastImageStyle = {
  width: 170,
  height: 80,
  justifyContent: "flex-end",
}

const $textContainer: ViewStyle = {
  backgroundColor: colors.palette.transparentGray,
  zIndex: 99,
}

const $text: TextStyle = {
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
}
