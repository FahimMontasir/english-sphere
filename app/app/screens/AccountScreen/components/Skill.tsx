import React from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { Icon, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { colors, spacing } from "app/theme"
import SkillElement from "./SkillElement"

const SkillAddIcon = (props: TextFieldAccessoryProps) => {
  return <Icon containerStyle={props.style} icon="plus" />
}

const Skill = observer(function Skill() {
  return (
    <>
      {/* position section */}
      <View style={$positionTextContainer}>
        <Text tx="accountScreen.position" />
        <Text text="400" />
      </View>
      <TouchableOpacity activeOpacity={0.8}>
        <Icon style={$chatIcon} icon="chat" size={30} color={colors.palette.black} />
      </TouchableOpacity>

      {/* skill section */}
      <View style={$skillHeadingContainer}>
        <Text tx="accountScreen.skill" preset="heading" />
        <View style={$skillInputContainer}>
          <TextField inputWrapperStyle={$inputWrapper} RightAccessory={SkillAddIcon} />
        </View>
      </View>
      <View style={$skillsContainer}>
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <SkillElement key={i} />
          ))}
      </View>
    </>
  )
})

export default Skill

const $positionTextContainer: TextStyle = {
  marginTop: spacing.xxs,
  marginLeft: spacing.xs,
  flexDirection: "row",
  gap: spacing.xxs,
}

const $chatIcon: ImageStyle = {
  alignSelf: "flex-end",
  marginRight: spacing.md,
  marginTop: spacing.xs,
}

const $skillHeadingContainer: ViewStyle = {
  marginHorizontal: spacing.xs,
  marginTop: 25,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $skillInputContainer: ViewStyle = {
  width: 180,
}

const $inputWrapper: ViewStyle = {
  borderColor: colors.palette.black,
  borderRadius: spacing.sm,
  backgroundColor: "white",
}

const $skillsContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: 5,
  rowGap: 10,
  justifyContent: "center",
  marginTop: 10,
  marginBottom: 30,
}
