import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text, Tile } from "app/components"
import { colors, spacing } from "app/theme"
// import { useStores } from "app/models"

export const ChatReqScreen: FC<AppStackScreenProps<"ChatReq">> = observer(function ChatReqScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { navigation } = _props

  return (
    <Screen
      style={$root}
      contentContainerStyle={$contentContainer}
      preset="scroll"
      safeAreaEdges={["top"]}
    >
      <Text tx="chatReqScreen.request" preset="heading" />
      <Text style={$instructionText} tx="chatReqScreen.instruction" />
      <View style={$reqUsersContainer}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Tile onPress={() => navigation.navigate("Message")} key={i} />
          ))}
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $contentContainer: ViewStyle = {
  marginHorizontal: spacing.sm,
  marginTop: 20,
}
const $instructionText: TextStyle = {
  color: colors.palette.indigo,
  marginTop: spacing.xs,
  marginBottom: spacing.lg,
}

const $reqUsersContainer: ViewStyle = {
  gap: spacing.sm,
  marginBottom: spacing.xxl,
}
