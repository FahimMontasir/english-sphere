import { observer } from "mobx-react-lite"
import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Icon, Text } from "src/components"
import { colors, spacing } from "src/theme"

interface IElement {
  value: string
  onDeletePress?: () => void
  maxWidth?: string | number
}

export const Element = observer(function Element({ value, onDeletePress, maxWidth }: IElement) {
  const $style = maxWidth ? ([$container, { maxWidth }] as ViewStyle) : $container

  return (
    <View style={$style}>
      <Text text={value} />
      {onDeletePress ? (
        <Icon onPress={onDeletePress} icon="dot" size={18} />
      ) : (
        <Icon color={colors.palette.green} icon="dot" size={18} />
      )}
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.palette.white,
  borderRadius: spacing.sm,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 5,
  flexShrink: 0,
  padding: 5,
}
