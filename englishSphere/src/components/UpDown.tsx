import React from "react"
import { observer } from "mobx-react-lite"
import { StyleProp, ViewStyle, View, ViewProps, TextStyle } from "react-native"
import { Icon } from "./Icon"
import { Text } from "./Text"
import { colors } from "src/theme"

export type UpDownProps = ViewProps & {
  style?: StyleProp<ViewStyle>
  upVotes?: number
  downVotes?: number
  circleSize?: number
}

export const UpDown = observer(function UpDown(props: UpDownProps) {
  const { upVotes, downVotes, style, circleSize = 16, ...others } = props
  const $upDownContainerStyle = [$defaultUpDownContainer, style]

  return (
    <View style={$upDownContainerStyle} {...others}>
      {!!upVotes && (
        <>
          <Text text={String(upVotes)} />
          <Icon icon="dot" color={colors.palette.green} size={circleSize} />
        </>
      )}
      {!!downVotes && (
        <>
          <View style={$gutter} />
          <Text text={String(downVotes)} />
          <Icon icon="dot" color={colors.palette.accent500} size={circleSize} />
        </>
      )}
    </View>
  )
})

const $defaultUpDownContainer: TextStyle = {
  flexDirection: "row",
  gap: 1,
  alignItems: "center",
}

const $gutter: ViewStyle = { padding: 2 }
