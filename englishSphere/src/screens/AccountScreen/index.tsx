import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Icon, Modal, Screen, Text, TextField } from "src/components"
import Cover from "./components/Cover"
import { colors, spacing } from "src/theme"
import Skill from "./components/Skill"
import NotiLogs from "./components/NotiLogs"
import { useStores } from "src/models"
import { useAccountScreen } from "./useAccountScreen"

export const AccountScreen: FC<AppStackScreenProps<"Account">> = observer(function AccountScreen(
  _props,
) {
  const { navigation } = _props
  const {
    userStore: { user, setUser },
  } = useStores()
  const { handleAgeAndGender, modalVisible, setModalVisible } = useAccountScreen({ user, setUser })

  return (
    <Screen
      StatusBarProps={{
        translucent: true,
        hidden: true,
      }}
      contentContainerStyle={$contentContainerStyle}
      preset="fixed"
    >
      <Cover />

      {/* position section */}
      <View style={$positionTextContainer}>
        <Text text="icon upvotes and downvots icon" />
      </View>

      <Icon
        onPress={() => navigation.navigate("Chat")}
        containerStyle={$chatIcon}
        icon="chat"
        size={35}
        color={colors.palette.black}
      />

      <Skill />

      <NotiLogs navigation={navigation} />
      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <TextField inputMode="numeric" keyboardType="numeric" />
        <TextField inputMode="text" />
      </Modal>
    </Screen>
  )
})

const $contentContainerStyle: ViewStyle = {
  flex: 1,
}

const $positionTextContainer: TextStyle = {
  marginTop: spacing.xxs,
  marginLeft: spacing.sm,
  flexDirection: "row",
  gap: spacing.xxs,
  width: "50%",
}

const $chatIcon: ImageStyle = {
  alignSelf: "flex-end",
  marginRight: spacing.md,
  marginTop: spacing.xs,
}
