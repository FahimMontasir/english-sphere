import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Icon, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$screenContainer} preset="scroll" safeAreaEdges={["top", "bottom"]}>
      <View style={$topContainer}>
        <TouchableOpacity style={$avatar}>
          <AutoImage maxWidth={50} maxHeight={50} source={{ uri: "https://i.pravatar.cc/100" }} />
        </TouchableOpacity>
        <Icon icon="leaderBoard" size={45} onPress={() => console.log("hi")} />
      </View>

      <View style={$instaTalkContainer}>
        <Icon icon="instaTalk" size={100} onPress={() => console.log("hi")} />
        <Text text="Insta Talk" />
      </View>
    </Screen>
  )
})

const $screenContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  paddingHorizontal: spacing.sm,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "20%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
}

const $avatar: ViewStyle = {
  borderRadius: 50,
  overflow: "hidden",
}

const $instaTalkContainer: ViewStyle = {
  alignItems: "center",
  paddingVertical: 40,
}
