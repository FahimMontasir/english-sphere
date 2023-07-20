import React, { ComponentType } from "react"
import I18n from "i18n-js"
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
import { Text } from "./Text"
import { Icon } from "./Icon"
import { TxKeyPath, translate } from "app/i18n"

export interface TileProps extends TouchableOpacityProps {
  style?: StyleProp<ViewStyle>
  isNoti?: boolean
  imgUri?: string
  headingTxOptions?: I18n.TranslateOptions
  headingTx?: TxKeyPath
  heading?: string
  rightCaption?: string
  msg?: string
  position?: number
}

export const Tile = observer(function Tile(props: TileProps) {
  const {
    style,
    isNoti,
    imgUri = "https://i.pravatar.cc/300",
    headingTxOptions,
    heading = "Elon Musk",
    headingTx,
    rightCaption = "1h ago...",
    msg = "the app is still in active development. Wait for a while!",
    position,
    ...WrapperProps
  } = props
  const $styles = [$container, style]

  const i18nText = headingTx && translate(headingTx, headingTxOptions)
  const headingContent = i18nText || heading

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps> = WrapperProps?.onPress
    ? TouchableOpacity
    : View

  return (
    <Wrapper accessibilityRole={isPressable ? "list" : undefined} {...WrapperProps} style={$styles}>
      <View style={$topContainer}>
        <View style={$userContainer}>
          {isNoti ? (
            <Icon icon="bell" containerStyle={$notiIconContainer} size={30} />
          ) : (
            <Image source={{ uri: imgUri }} resizeMode="cover" style={$image} />
          )}
          <Text text={headingContent} preset="subheading" />
        </View>
        {position && <Text text={String(position)} />}
        <Text text={rightCaption} />
      </View>
      {isNoti && <Text style={$notiDes} text={msg} />}
    </Wrapper>
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
