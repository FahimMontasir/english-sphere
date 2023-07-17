import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, Screen, Text, TextField, Tile } from "app/components"
import { colors, spacing } from "app/theme"
// import { useStores } from "app/models"

export const ChatScreen: FC<AppStackScreenProps<"Chat">> = observer(function ChatScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  return (
    <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
      {/* top search and chat req section */}
      <View style={$searchMessageContainer}>
        <TextField
          inputWrapperStyle={$searchInputWrapper}
          placeholderTx="chatScreen.search"
          RightAccessory={(props) => <Icon containerStyle={props.style} icon="searchUser" />}
        />
        <Icon icon="chatRequest" size={25} color={colors.palette.black} />
      </View>

      {/* insta chat section */}
      <Text tx="chatScreen.instaChat" preset="heading" style={$instaChatHeading} />
      <Tile
        headingTx="chatScreen.instaMsg"
        rightCaption="Active: 200"
        imgUri="https://i.ibb.co/592yx4h/windows-p74ndn-YWRY4-unsplash.jpg"
      />

      {/* chat user list section */}
      <Text tx="chatScreen.friends" preset="heading" style={$friendsHeading} />
      <ScrollView>
        <View style={$chatListContainer}>
          {Array(15)
            .fill(0)
            .map((_, i) => (
              <Tile key={i} />
            ))}
        </View>
      </ScrollView>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.sm,
}

const $searchMessageContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.md,
}

const $searchInputWrapper: ViewStyle = { width: 180 }

const $instaChatHeading: TextStyle = {
  marginTop: 30,
  marginBottom: 10,
}

const $friendsHeading: TextStyle = {
  marginTop: 30,
  marginBottom: 10,
}

const $chatListContainer: ViewStyle = {
  gap: spacing.xs,
  marginBottom: spacing.sm,
}
