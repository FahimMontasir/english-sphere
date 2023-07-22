import React from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "app/components"

export interface MaterialTileProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>
  imgUri?: string
  heading?: string
  details?: string
  textStyle?: StyleProp<TextStyle>
  imageStyle?: StyleProp<ImageStyle>
  textContainerStyle?: StyleProp<ViewStyle>
}

export const MaterialTile = observer(function MaterialTile(props: MaterialTileProps) {
  const {
    style,
    imgUri = "https://i.pravatar.cc/300",
    heading = "The best way to learn future tense quic",
    details = "alkssfj alfjalk;jfla;jdf j dfjojri lueoriu sf oiru orije dfjl;sd dlf sl oeoi ldf eoi ru dlfjls; dlfjk sdlf ldkfj sdfjsdf dslkfj dsfsldfk",
    textStyle,
    textContainerStyle,
    imageStyle,
    ...WrapperProps
  } = props
  const $styles = [$container, style]

  return (
    <TouchableOpacity {...WrapperProps} style={$styles} activeOpacity={0.8}>
      <Image source={{ uri: imgUri }} resizeMode="cover" style={[$image, imageStyle]} />

      <View style={[$textContainer, textContainerStyle]}>
        <Text style={textStyle} text={heading} preset="subheading" numberOfLines={1} />
        <Text style={textStyle} text={details} numberOfLines={2} />
      </View>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.palette.gray,
  borderRadius: spacing.md,
  flexDirection: "row",
  gap: 5,
  elevation: 1,
  width: "100%",
  overflow: "hidden",
  height: 80,
}

const $image: ImageStyle = { height: "100%", width: 100 }

const $textContainer: ViewStyle = { justifyContent: "center", width: "70%", gap: 5 }
