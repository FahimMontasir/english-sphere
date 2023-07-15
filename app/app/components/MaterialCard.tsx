import * as React from "react"
import {
  ImageBackground,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "app/components/Text"

export interface MaterialCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const MaterialCard = observer(function MaterialCard(props: MaterialCardProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={$touchableContainer}
      onPress={() => console.log("card")}
    >
      <ImageBackground
        style={$styles}
        source={{ uri: "https://i.pravatar.cc/300" }}
        resizeMode="cover"
      >
        <View style={$textContainer}>
          <Text numberOfLines={1} preset="subheading" style={$text}>
            English for Web developers
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $touchableContainer: ViewStyle = {
  overflow: "hidden",
  borderRadius: 8,
}

const $container: ImageStyle = {
  width: 170,
  height: 80,
  justifyContent: "flex-end",
}

const $textContainer: ViewStyle = {
  backgroundColor: colors.palette.transparentGray,
}

const $text: TextStyle = {
  paddingHorizontal: spacing.xs,
  paddingVertical: spacing.xxxs,
}
