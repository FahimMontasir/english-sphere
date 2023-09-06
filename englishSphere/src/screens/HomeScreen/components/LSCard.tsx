import * as React from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native"
import { spacing } from "src/theme"
import { FastImage, FastImageStyle } from "src/components/FastImage"

export interface LSCardProps extends TouchableOpacityProps {
  style?: StyleProp<FastImageStyle>
  item: { thumbnail: string }
}

export const LSCard = observer(function LSCard(props: LSCardProps) {
  const { style, item, ...others } = props
  const $styles = [$lsThumbnail, style]

  return (
    <TouchableOpacity style={$container} activeOpacity={0.8} {...others}>
      <FastImage style={$styles} uri={item.thumbnail} />
    </TouchableOpacity>
  )
})
const $container: ViewStyle = { width: "100%", height: "100%" }
const $lsThumbnail: FastImageStyle = {
  margin: spacing.xs,
  height: 100,
  borderRadius: spacing.xs,
}
