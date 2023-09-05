import React from "react"
import { ScrollView } from "react-native"
import { Text } from "src/components"
import SkillElement from "../Skill/SkillElement"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"

export const Settings = observer(function Settings() {
  const {
    userStore: { user, setUser },
  } = useStores()

  const onDeletePress = () => {
    // todo: update db
  }
  // todo: reuse ske a device box
  return (
    <>
      <Text text="Connected Devices" preset="heading" />
      <ScrollView>
        {user?.fcmTokens?.map((v) => (
          <SkillElement value={v.device} key={v.token} onDeletePress={onDeletePress} />
        ))}
      </ScrollView>
    </>
  )
})
