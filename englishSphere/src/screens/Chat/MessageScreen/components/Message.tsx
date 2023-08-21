import React from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "src/components"
import { colors } from "src/theme"

export interface MessageProps {
  style?: StyleProp<ImageStyle>
  replay?: boolean
  message: string
  timestamps: string
}

export const Message = observer(function Message(props: MessageProps) {
  const { style, replay, message, timestamps } = props

  const $styles = [$container, style, replay ? $replay : $send]
  const $timestamps = replay ? $tsReplay : $tsSend

  return (
    <View style={$styles}>
      <Text text={message} preset="subheading" />
      <Text style={$timestamps} text={timestamps} />
    </View>
  )
})

const $container: ViewStyle = {
  maxWidth: 320,
  paddingHorizontal: 10,
  paddingTop: 10,
  marginVertical: 5,
}

const $replay: ViewStyle = {
  alignSelf: "flex-start",
  backgroundColor: colors.palette.gray,
  borderTopRightRadius: 12,
  borderBottomRightRadius: 12,
  borderBottomLeftRadius: 12,
}

const $send: ViewStyle = {
  alignSelf: "flex-end",
  backgroundColor: colors.palette.white,
  borderTopLeftRadius: 12,
  borderBottomLeftRadius: 12,
  borderBottomRightRadius: 12,
}

const $tsReplay: TextStyle = {
  alignSelf: "flex-end",
  color: "#11111182",
  fontSize: 11,
}

const $tsSend: TextStyle = {
  alignSelf: "flex-start",
  color: "#11111167",
  fontSize: 11,
}
