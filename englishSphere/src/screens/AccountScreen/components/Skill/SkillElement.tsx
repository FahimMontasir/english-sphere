import { observer } from "mobx-react-lite"
import * as React from "react"
import { View, ViewStyle } from "react-native"
import { Icon, TextField, TextFieldAccessoryProps } from "src/components"
import { colors, spacing } from "src/theme"
import { truncateText } from "src/utils/formatString"

interface ISkillElement {
  value: string
  onDeletePress: (v: string) => void
}

const SkillElement = observer(function SkillElement({ value, onDeletePress }: ISkillElement) {
  const RightIcon = (props: TextFieldAccessoryProps) => {
    return (
      <Icon
        onPress={() => onDeletePress(value)}
        containerStyle={props.style}
        icon="dot"
        size={18}
      />
    )
  }

  return (
    <View style={$container}>
      <TextField
        status="disabled"
        value={truncateText(value, 9, "..")}
        inputWrapperStyle={$inputWrapper}
        RightAccessory={RightIcon}
      />
    </View>
  )
})

export default SkillElement

const $container: ViewStyle = {
  width: "28%",
}

const $inputWrapper: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.palette.white,
  borderRadius: spacing.sm,
}
