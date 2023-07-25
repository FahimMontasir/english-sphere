import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, Screen, Text } from "app/components"
import Cover from "./components/Cover"
import { colors, spacing } from "app/theme"
import Skill from "./components/Skill"
import NotiLogs from "./components/NotiLogs"
import { useStores } from "app/models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const AccountScreen: FC<AppStackScreenProps<"Account">> = observer(function AccountScreen(
  _props,
) {
  const {
    authenticationStore: { logout },
  } = useStores()
  const { navigation } = _props

  return (
    <Screen
      StatusBarProps={{ backgroundColor: "transparent" }}
      statusBarStyle="light"
      contentContainerStyle={$contentContainerStyle}
      preset="scroll"
    >
      <Cover logout={logout} />

      {/* position section */}
      <View style={$positionTextContainer}>
        <Text tx="accountScreen.position" />
        <Text text="400" />
      </View>
      <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate("Chat")}>
        <Icon style={$chatIcon} icon="chat" size={30} color={colors.palette.black} />
      </TouchableOpacity>

      <Skill />

      <NotiLogs />
    </Screen>
  )
})

const $contentContainerStyle: ViewStyle = {
  flex: 1,
}

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
