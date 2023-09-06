import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, View, ViewStyle, TouchableOpacity } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Icon, Screen, Text, UserCard } from "src/components"
import { colors, spacing } from "src/theme"
import { FastImage, FastImageStyle } from "src/components/FastImage"
import { ContentStyle, FlashList } from "@shopify/flash-list"
// import { useStores } from "src/models"

export const LiveStreamingScreen: FC<AppStackScreenProps<"LiveStreaming">> = observer(
  function LiveStreamingScreen(_props) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const { navigation } = _props

    return (
      <Screen contentContainerStyle={$root} preset="auto" safeAreaEdges={["top", "bottom"]}>
        <Icon
          onPress={() => navigation.navigate("Home")}
          style={$endIcon}
          icon="endCall"
          color={colors.palette.red}
          size={30}
        />
        <FastImage uri="https://i.pravatar.cc/500" style={$userVideo} />

        <View style={$othersVideoContainer}>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <View key={i}>
                <TouchableOpacity activeOpacity={1} style={$dotContainer}>
                  <Icon
                    icon="dot"
                    color={colors.palette.yellow}
                    size={15}
                    onPress={() => console.log("mute")}
                  />
                  <Icon
                    icon="dot"
                    color={colors.palette.red}
                    size={15}
                    onPress={() => console.log("remove")}
                  />
                </TouchableOpacity>
                <FastImage uri="https://i.pravatar.cc/500" style={$othersVideo} />
              </View>
            ))}
        </View>

        <Text text="Other users request" preset="heading" />
        <Text text="* You only can accept up to 3 users" />

        <FlashList
          horizontal
          contentContainerStyle={$requestedUserContainer}
          ItemSeparatorComponent={() => <View style={$flashListItemSeparator} />}
          estimatedItemSize={100}
          data={Array(10)
            .fill(0)
            .map((_, i) => ({ name: i }))}
          renderItem={() => <UserCard />}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.sm,
}

const $endIcon: ImageStyle = {
  alignSelf: "flex-end",
  marginTop: spacing.md,
}

const $userVideo: FastImageStyle = {
  flexBasis: "25%",
  flexGrow: 1,
  flexShrink: 1,
  height: 250,
  width: "100%",
  borderRadius: spacing.xs,
  marginTop: spacing.sm,
}

const $othersVideoContainer: ViewStyle = {
  flexBasis: "10%",
  flexGrow: 0,
  flexShrink: 1,
  marginTop: spacing.md,
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginBottom: spacing.xl,
}

const $othersVideo: FastImageStyle = {
  height: 100,
  width: 100,
  borderRadius: spacing.xs,
}

const $dotContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  paddingHorizontal: spacing.xxs,
  position: "absolute",
  zIndex: 99,
  top: 5,
  width: "100%",
}

const $requestedUserContainer: ContentStyle = { paddingTop: spacing.sm }

const $flashListItemSeparator: ViewStyle = { marginLeft: 10 }
