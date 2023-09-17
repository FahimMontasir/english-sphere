import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Icon, Modal, Text, TextField, TextFieldAccessoryProps } from "src/components"
import { spacing } from "src/theme"
import { Element } from "../Element"
import { useStores } from "src/models"
import { Settings } from "../Settings"
import { truncateText } from "src/utils/formatString"
import { useSkill } from "./useSkill"

const Skill = observer(function Skill() {
  const {
    userStore: { user, setUser },
  } = useStores()

  const { onAddSkill, onDeletePress, newSkill, setNewSkill, modalVisible, setModalVisible } =
    useSkill({ setUser, user })

  const SkillAddIcon = (props: TextFieldAccessoryProps) => {
    return <Icon onPress={onAddSkill} containerStyle={props.style} icon="plus" />
  }

  return (
    <>
      <View style={$skillHeadingContainer}>
        <Text tx="accountScreen.skill" preset="heading" />

        {user?.interests.length === 6 ? (
          <Icon icon="settings" size={25} onPress={() => setModalVisible(true)} />
        ) : (
          <View style={$skillInputContainer}>
            <TextField
              value={newSkill}
              onChangeText={(t) => setNewSkill(t)}
              RightAccessory={SkillAddIcon}
            />
          </View>
        )}
      </View>
      <View style={$skillsContainer}>
        {user?.interests?.map((v) => (
          <Element
            value={truncateText(v, 14, "..")}
            key={v}
            onDeletePress={() => onDeletePress(v)}
          />
        ))}
      </View>
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <Settings />
      </Modal>
    </>
  )
})

export default Skill

const $skillHeadingContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
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
  marginHorizontal: spacing.sm,
}
