import React, { StyleProp, View, ViewProps, ViewStyle } from "react-native"
import { colors, spacing } from "src/theme"

export type SkeletonProps = ViewProps & {
  style?: StyleProp<ViewStyle>
}

export const Skeleton = ({ style, ...others }: SkeletonProps) => {
  const $style = [$skeletonStyle, style, $skeletonDefaultStyle]
  return <View style={$style} {...others} />
}
const $skeletonDefaultStyle: ViewStyle = { backgroundColor: colors.skeleton }
const $skeletonStyle: ViewStyle = { borderRadius: spacing.sm }

export const TileSkeleton = ({ elemCount = 4 }: { elemCount?: number }) => (
  <View style={$tileSkeletonContainer}>
    {Array(elemCount)
      .fill(0)
      .map((_, i) => (
        <Skeleton key={i} style={$tileSkeletonStyle} />
      ))}
  </View>
)

const $tileSkeletonContainer: ViewStyle = { gap: 10, marginVertical: 10 }
const $tileSkeletonStyle: ViewStyle = { height: 60 }

export const VisitProfileSkeleton = () => (
  <View>
    <Skeleton style={$coverContainer} />
    <View style={$withoutCoverContainer}>
      <Skeleton style={$upDown} />
      <Skeleton style={$badgeHeading} />
      <View style={$badgesContainer}>
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} style={$badge} />
          ))}
      </View>
      <Skeleton style={$badgeHeading} />
      <View style={$skillContainer}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <Skeleton key={i} style={$skill} />
          ))}
      </View>
    </View>
  </View>
)
const $coverContainer: ViewStyle = {
  height: 150,
}
const $withoutCoverContainer: ViewStyle = { marginHorizontal: spacing.sm }
const $upDown: ViewStyle = {
  height: 30,
  width: 100,
  marginTop: spacing.xxs,
  marginBottom: spacing.md,
}
const $badgeHeading: ViewStyle = {
  height: 20,
  width: 200,
  marginBottom: spacing.xs,
}
const $badgesContainer: ViewStyle = {
  flexDirection: "row",
  gap: spacing.xs,
  alignItems: "center",
  marginBottom: spacing.md,
  marginLeft: spacing.xs,
}
const $badge: ViewStyle = {
  height: 60,
  width: 60,
}
const $skillContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: 5,
  rowGap: 10,
  marginLeft: spacing.xs,
}
const $skill: ViewStyle = {
  height: 25,
  width: 110,
}
