import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Badges, Button, Icon, Modal, Screen, Text, TextField, UpDown } from "src/components"
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
    userStore: { user, setUser, upVotes, downVotes, badges },
  } = useStores()

  const { modalVisible, setModalVisible, gender, setGender, age, setAge, handleAgeAndGender } =
    useAccountScreen({
      user,
      setUser,
    })

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
      <UpDown upVotes={upVotes} downVotes={downVotes} style={$upDownContainer} />

      <Icon
        onPress={() => navigation.navigate("Chat")}
        containerStyle={$chatIcon}
        icon="chat"
        size={35}
        color={colors.palette.black}
      />
      <Badges badges={badges} style={$badgesContainer} />

      <Skill />

      <NotiLogs navigation={navigation} />

      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={$modalContainer}>
          <Text text="Provide these information accurately" preset="heading" />
          <TextField
            value={age}
            onChangeText={(t) => setAge(t)}
            inputMode="numeric"
            keyboardType="numeric"
            placeholder="Your current Age"
          />
          <TextField
            value={gender}
            onSelect={setGender}
            selectOptions={[{ value: "male" }, { value: "female" }]}
            preset="select"
            inputMode="text"
            placeholder="Your gender"
            RightAccessory={(p) => <Icon icon="view" style={p.style} color={colors.textDim} />}
          />
          <Button text="Submit" preset="reversed" onPress={handleAgeAndGender} />
        </View>
      </Modal>
    </Screen>
  )
})

const $contentContainerStyle: ViewStyle = {
  flex: 1,
}

const $upDownContainer: TextStyle = {
  marginTop: spacing.xxs,
  marginLeft: spacing.sm,
  width: "50%",
}

const $chatIcon: ImageStyle = {
  alignSelf: "flex-end",
  marginRight: spacing.lg,
  marginTop: spacing.xs,
}

const $badgesContainer: ViewStyle = {
  marginTop: -30,
  marginBottom: -15,
  marginLeft: spacing.sm,
}

const $modalContainer: ViewStyle = {
  marginTop: 150,
  gap: spacing.sm,
  marginBottom: spacing.md,
}
