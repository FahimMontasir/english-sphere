import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Icon, Screen, UserCard } from "src/components"
import { colors } from "src/theme"
import { FastImageStyle } from "src/components/FastImage"

// import { useStores } from "src/models"

export const InstaTalkScreen: FC<AppStackScreenProps<"InstaTalk">> = observer(
  function InstaTalkScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const { navigation } = _props

    return (
      <Screen contentContainerStyle={$root} preset="scroll" safeAreaEdges={["top"]}>
        <UserCard
          style={$userCardStyle}
          imageStyle={$userCardImageStyle}
          rejectText="Next"
          textPreset="heading"
        />

        <Icon
          icon="endCall"
          onPress={() => navigation.navigate("Home")}
          color={colors.palette.red}
          size={50}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "space-between",
  paddingVertical: 30,
}

const $userCardStyle: ViewStyle = { backgroundColor: "transparent", gap: 10 }
const $userCardImageStyle: FastImageStyle = { width: 250, height: 250 }
