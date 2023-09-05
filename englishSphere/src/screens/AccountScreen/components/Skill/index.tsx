import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Icon, Modal, Text, TextField, TextFieldAccessoryProps } from "src/components"
import { spacing } from "src/theme"
import SkillElement from "./SkillElement"
import { useStores } from "src/models"
import { Settings } from "../Settings"

const Skill = observer(function Skill() {
  const {
    userStore: { user, setUser },
  } = useStores()
  const [newSkill, setNewSkill] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const onAddSkill = () => {
    // Todo: save to db
    if (user?.interests) {
      setUser({ interests: [...user.interests, newSkill] as any })
    } else {
      setUser({ interests: [newSkill] as any })
    }

    setNewSkill("")
  }

  const onDeletePress = (v: string) => {
    // Todo: delete from db
    console.log("delete", v)
    setUser({ interests: user?.interests.filter((i) => i !== v) as any })
  }

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
          <SkillElement value={v} key={v} onDeletePress={onDeletePress} />
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
}
