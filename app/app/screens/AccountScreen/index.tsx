import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
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
    userStore: {
      logout,
      user: { coverUrl, fullName, imageUrl },
    },
  } = useStores()
  const { navigation } = _props

  return (
    <Screen
      StatusBarProps={{ backgroundColor: "transparent" }}
      statusBarStyle="light"
      contentContainerStyle={$contentContainerStyle}
      preset="scroll"
    >
      <Cover logout={logout} coverUrl={coverUrl} fullName={fullName} imageUrl={imageUrl} />

      {/* position section */}
      <View style={$positionTextContainer}>
        <Text text="icon upvotes and downvots" />
        <Text text="400" />
      </View>

      <Icon
        onPress={() => navigation.navigate("Chat")}
        containerStyle={$chatIcon}
        icon="chat"
        size={30}
        color={colors.palette.black}
      />

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
  width: "50%",
}

const $chatIcon: ImageStyle = {
  alignSelf: "flex-end",
  marginRight: spacing.md,
  marginTop: spacing.xs,
}
