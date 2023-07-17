import React from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { Button, Tile, Text } from "app/components"
import { spacing } from "app/theme"

const NotiLogs = observer(function NotiLogs() {
  return (
    <>
      <Text tx="accountScreen.logNHistory" preset="heading" style={$logsHeading} />
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

const $logsHeading: TextStyle = {
  marginLeft: spacing.xs,
  marginBottom: spacing.sm,
}

const $logsNotiContainer: ViewStyle = { gap: 10, margin: spacing.sm, alignItems: "center" }

const $loadBtn: ViewStyle = { width: 120 }
