import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Icon, Text, TextField, TextFieldAccessoryProps } from "app/components"
import { spacing } from "app/theme"
import SkillElement from "./SkillElement"

const SkillAddIcon = (props: TextFieldAccessoryProps) => {
  return <Icon containerStyle={props.style} icon="plus" />
}

const Skill = observer(function Skill() {
  return (
    <>
      <View style={$skillHeadingContainer}>
        <Text tx="accountScreen.skill" preset="heading" />
        <View style={$skillInputContainer}>
          <TextField RightAccessory={SkillAddIcon} />
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

const $skillsContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  columnGap: 5,
  rowGap: 10,
  justifyContent: "center",
  marginTop: 10,
  marginBottom: 30,
}
