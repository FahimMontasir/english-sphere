import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Button, NotiLogTile, Screen, Text } from "app/components"
import Cover from "./components/Cover"
import { spacing } from "app/theme"
import Skill from "./components/Skill"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const AccountScreen: FC<AppStackScreenProps<"Account">> = observer(function AccountScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // const { navigation } = _props

  return (
    <Screen
      StatusBarProps={{ backgroundColor: "transparent" }}
      statusBarStyle="light"
      contentContainerStyle={$contentContainerStyle}
      preset="scroll"
    >
      <Cover />

      <Skill />
      {/* logs and history */}
      <Text tx="accountScreen.logNHistory" preset="heading" style={$logsHeading} />
      <ScrollView>
        <View style={$logsNotiContainer}>
          <NotiLogTile />
          <NotiLogTile isNoti />
          <NotiLogTile isNoti />
          <NotiLogTile isNoti />
          <Button style={$loadBtn} tx="accountScreen.loadBtn" />
        </View>
      </ScrollView>
    </Screen>
  )
})

const $contentContainerStyle: ViewStyle = {
  flex: 1,
}

const $logsHeading: TextStyle = {
  marginLeft: spacing.xs,
  marginBottom: spacing.sm,
}

const $logsNotiContainer: ViewStyle = { gap: 10, margin: spacing.sm, alignItems: "center" }

const $loadBtn: ViewStyle = { width: 120 }
