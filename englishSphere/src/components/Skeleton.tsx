import React, { StyleProp, View, ViewProps, ViewStyle } from "react-native"
import { colors, spacing } from "src/theme"

export type SkeletonProps = ViewProps & {
  style?: StyleProp<ViewStyle>
}

export const Skeleton = ({ style, ...others }: SkeletonProps) => {
  const $style = [$skeletonStyle, style]
  return <View style={$style} {...others} />
}
const $skeletonStyle: ViewStyle = { backgroundColor: colors.skeleton, borderRadius: spacing.sm }

export const TileSkeleton = () => (
  <View style={$tileSkeletonContainer}>
    {Array(4)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={i} style={$tileSkeletonStyle} />
      ))}
  </View>
)

const $tileSkeletonContainer: ViewStyle = { gap: 10, marginVertical: 10 }
const $tileSkeletonStyle: ViewStyle = { height: 60 }
