import React from "react"
// import Toast from "react-native-toast-message"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Button, Tile, Text, Icon } from "app/components"
import { spacing } from "app/theme"
// import { loadString, saveString } from "app/utils/storage"
import { useStores } from "app/models"

const NotiLogs = observer(function NotiLogs() {
  const {
    authenticationStore: { toggleLang, lang },
  } = useStores()

  // Toast.show({
  //   type: "success",
  //   text1: "Close the app to see language change!",
  //   text2: `Your language has been changed to ${lang === "bn" ? "English" : "Bengali"}`,
  // })

  return (
    <>
      <View style={$logsHeadingContainer}>
        <Text tx="accountScreen.logNHistory" preset="heading" />
        <Icon
          onPress={toggleLang}
          icon={lang === "en" ? "ban" : "eng"}
          size={30}
          activeOpacity={0.9}
        />
      </View>
      <ScrollView>
        <View style={$logsNotiContainer}>
          <Tile />
          <Tile isNoti />
          <Tile isNoti />
          <Tile isNoti />
          <Button style={$loadBtn} tx="accountScreen.loadBtn" />
        </View>
      </ScrollView>
    </>
  )
})

export default NotiLogs

const $logsHeadingContainer: TextStyle = {
  marginHorizontal: spacing.xs,
  marginBottom: spacing.sm,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $logsNotiContainer: ViewStyle = { gap: 10, margin: spacing.sm, alignItems: "center" }

const $loadBtn: ViewStyle = { width: 120 }
