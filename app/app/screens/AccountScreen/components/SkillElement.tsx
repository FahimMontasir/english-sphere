import * as React from "react"
import { View, ViewStyle } from "react-native"
import { TextField } from "app/components"
import { colors, spacing } from "app/theme"

const SkillElement = () => {
  // const inputRef = React.useRef<TextInput>()
  const [value, setValue] = React.useState("React.js")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [status, setStatus] = React.useState()

  // const onIconPress = () => {
  //   setStatus(undefined)
  //   // if (!inputRef.current.isFocused()) {
  //   //   inputRef.current.focus()
  //   // }
  // }

  // const RightIcon = () => {
  //   return (
  //     <TouchableOpacity onPress={onIconPress} activeOpacity={0.8} style={$rightIconContainer}>
  //       <Icon icon="pen" size={20} />
  //     </TouchableOpacity>
  //   )
  // }

  return (
    <View style={$container}>
      <TextField
        // ref={inputRef}
        status={status as "disabled"}
        value={value}
        onChangeText={(t) => setValue(t)}
        inputWrapperStyle={$inputWrapper}
        // RightAccessory={RightIcon}
      />
    </View>
  )
}

export default SkillElement

const $container: ViewStyle = { width: 120 }

const $inputWrapper: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.palette.white,
  borderRadius: spacing.sm,
  // overflow: "visible",
}

// const $rightIconContainer: ViewStyle = {
//   backgroundColor: colors.background,
//   width: 35,
//   height: 35,
//   borderRadius: 35,
//   marginTop: -10,
//   alignItems: "center",
//   justifyContent: "center",
// }
