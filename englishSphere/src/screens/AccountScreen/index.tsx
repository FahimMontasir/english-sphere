import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Button, Icon, IconTypes, Modal, Screen, Text, TextField } from "src/components"
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
      <View style={$positionTextContainer}>
        <Icon icon="dot" color={colors.palette.green} size={16} />
        <Text text={upVotes ? String(upVotes) : "0"} />
        <View style={$positionGutter} />
        <Icon icon="dot" color={colors.palette.accent500} size={16} />
        <Text text={downVotes ? String(downVotes) : "0"} />
      </View>

      <Icon
        onPress={() => navigation.navigate("Chat")}
        containerStyle={$chatIcon}
        icon="chat"
        size={35}
        color={colors.palette.black}
      />
      {/* show upto 4 badges then add show the count + */}
      {!!badges.length && (
        <View style={$badgesContainer}>
          {badges.slice(0, 4).map((badge, index) => (
            <Icon key={index} icon={badge as IconTypes} size={50} />
          ))}
          {badges.length > 4 && <Text text={`+${badges.length - 4}`} style={$moreBadges} />}
        </View>
      )}

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

const $positionTextContainer: TextStyle = {
  marginTop: spacing.xxs,
  marginLeft: spacing.sm,
  flexDirection: "row",
  gap: 1,
  width: "50%",
  alignItems: "center",
}

const $positionGutter: ViewStyle = { padding: 5 }

const $chatIcon: ImageStyle = {
  alignSelf: "flex-end",
  marginRight: spacing.lg,
  marginTop: spacing.xs,
}

const $badgesContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: -30,
  marginBottom: -15,
  marginLeft: spacing.sm,
  gap: spacing.xs,
  alignItems: "center",
}

const $modalContainer: ViewStyle = {
  marginTop: 150,
  gap: spacing.sm,
  marginBottom: spacing.md,
}

const $moreBadges: TextStyle = { marginLeft: -10, alignSelf: "flex-end" }
