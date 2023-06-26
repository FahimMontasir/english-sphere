import * as React from "react"
import { observer } from "mobx-react-lite"
import { Image, ImageStyle, StyleProp, TouchableOpacity } from "react-native"
import { spacing } from "app/theme"

export interface LSCardProps {
  style?: StyleProp<ImageStyle>
  item: { thumbnail: string }
}

export const LSCard = observer(function LSCard(props: LSCardProps) {
  const { style, item } = props
  const $styles = [$lsThumbnail, style]

  return (
    <TouchableOpacity activeOpacity={0.8}>
      <Image style={$styles} source={{ uri: item.thumbnail }} />
    </TouchableOpacity>
  )
})

const $lsThumbnail: ImageStyle = {
  width: 100,
  height: 80,
  borderRadius: spacing.xs,
  marginTop: 10,
}
