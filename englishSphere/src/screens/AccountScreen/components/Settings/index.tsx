import React from "react"
import { View, ViewStyle } from "react-native"
import { Text } from "src/components"
import { Element } from "../../Element"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"
import DeviceInfo from "react-native-device-info"
import { useSettings } from "./useSettings"

export const Settings = observer(function Settings() {
  const {
    userStore: { user, setUser },
  } = useStores()

  const { onDeletePress } = useSettings({ setUser, user })

  return (
    <>
      <Text text="Connected Devices" preset="heading" />
      <View style={$deviceContainer}>
        {user?.fcmTokens?.map((v) => (
          <Element
            value={v.device}
            key={v.token}
            onDeletePress={
              DeviceInfo.getModel() !== v.device ? () => onDeletePress(v.device) : undefined
            }
          />
        ))}
      </View>
    </>
  )
})

const $deviceContainer: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  // justifyContent: "center",
  marginVertical: 10,
}
