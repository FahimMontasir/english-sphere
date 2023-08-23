import React, { ComponentType } from "react"
import I18n from "i18n-js"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, spacing } from "src/theme"
import { Text } from "./Text"
import { Icon } from "./Icon"
import { TxKeyPath, translate } from "src/i18n"
import { FastImage, FastImageStyle } from "./FastImage"
import { truncateText } from "src/utils/formatString"

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
  unread?: boolean
}

export const Tile = observer(function Tile(props: TileProps) {
  const {
    style,
    isNoti,
    imgUri,
    headingTxOptions,
    heading = "Elon Musk",
    headingTx,
    rightCaption = "1h ago...",
    msg,
    position,
    unread,
    ...WrapperProps
  } = props
  const $styles = [
    $container,
    style,
    { backgroundColor: unread ? colors.palette.gray : colors.palette.white },
  ]

  const i18nText = headingTx && translate(headingTx, headingTxOptions)
  const headingContent = i18nText || heading

  const isPressable = !!WrapperProps.onPress
  const Wrapper: ComponentType<TouchableOpacityProps | any> = isPressable ? TouchableOpacity : View

  return (
    <Wrapper accessibilityRole={isPressable ? "list" : undefined} {...WrapperProps} style={$styles}>
      <View style={$topContainer}>
        <View style={$userContainer}>
          {isNoti ? (
            <>
              {imgUri ? (
                <FastImage uri={imgUri} style={$image} />
              ) : (
                <Icon icon="bell" containerStyle={$notiIconContainer} size={30} />
              )}
            </>
          ) : (
            <FastImage uri={imgUri || ""} style={$image} />
          )}
          <Text text={truncateText(headingContent, 26, "...")} preset="subheading" />
        </View>
        {position && <Text text={String(position)} />}
        <Text text={rightCaption} />
      </View>
      {isNoti && msg && <Text style={$notiDes} text={truncateText(msg, 100, "...See more!")} />}
    </Wrapper>
  )
})

const $container: ViewStyle = {
  borderRadius: spacing.md,
  padding: spacing.xs,
  elevation: 1,
  width: "100%",
}

const $image: FastImageStyle = { height: 40, width: 40, borderRadius: 40, marginRight: 3 }

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
  marginRight: 3,
}

const $notiDes: TextStyle = {
  marginTop: spacing.xs,
  marginHorizontal: spacing.sm,
}
