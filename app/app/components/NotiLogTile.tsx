import * as React from "react"
import { Image, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "app/theme"
import { Text } from "./Text"
import { Icon } from "./Icon"

export interface NotiLogTileProps {
  style?: StyleProp<ViewStyle>
  isNoti?: boolean
}

export const NotiLogTile = observer(function NotiLogTile(props: NotiLogTileProps) {
  const { style, isNoti } = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <View style={$topContainer}>
        <View style={$userContainer}>
          {isNoti ? (
            <Icon icon="bell" containerStyle={$notiIconContainer} size={30} />
          ) : (
            <Image
              source={{ uri: "https://i.pravatar.cc/300" }}
              resizeMode="cover"
              style={$image}
            />
          )}
          <Text text="Elon Musk Porich" preset="subheading" />
        </View>
        <Text text="1h ago..." />
      </View>
      {isNoti && (
        <Text style={$notiDes} text="the app is still in active development. Wait for a while!" />
      )}
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.palette.gray,
  borderRadius: spacing.md,
  padding: spacing.xs,
  elevation: 1,
  width: "100%",
}

const $image: ImageStyle = { height: 40, width: 40, borderRadius: 40 }

const $topContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}
const $userContainer: ViewStyle = { flexDirection: "row", alignItems: "center", gap: spacing.xxxs }

const $notiIconContainer: ViewStyle = {
  backgroundColor: colors.palette.white,
  width: 40,
  height: 40,
  borderRadius: 40,
  justifyContent: "center",
  alignItems: "center",
}

const $notiDes: TextStyle = {
  marginTop: spacing.xs,
  marginHorizontal: spacing.sm,
}
