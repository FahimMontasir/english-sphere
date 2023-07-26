import * as React from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { spacing } from "app/theme"
import { FastImage, FastImageStyle } from "app/components/FastImage"

export interface LSCardProps extends TouchableOpacityProps {
  style?: StyleProp<FastImageStyle>
  item: { thumbnail: string }
}

export const LSCard = observer(function LSCard(props: LSCardProps) {
  const { style, item, ...others } = props
  const $styles = [$lsThumbnail, style]

  return (
    <TouchableOpacity activeOpacity={0.8} {...others}>
      <FastImage style={$styles} uri={item.thumbnail} />
    </TouchableOpacity>
  )
})

const $lsThumbnail: FastImageStyle = {
  width: 100,
  height: 80,
  borderRadius: spacing.xs,
  marginTop: 10,
}
