import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity, ScrollView, TextStyle } from "react-native"
import { FlashList } from "@shopify/flash-list"
import { AppStackScreenProps } from "src/navigators"
import { spacing } from "src/theme"
// components
import { Button, Icon, MaterialCard, Screen, Text } from "src/components"
import { LSCard } from "./components/LSCard"
// hooks
import { useHomeScreen } from "./useHomeScreen"
import { FastImage, FastImageStyle } from "src/components/FastImage"
import { openLinkInBrowser } from "src/utils/openLinkInBrowser"
import { useStores } from "src/models"
import { onAppReadyForNotification } from "src/services/pushNotification/onAppReady"

export const HomeScreen: FC<AppStackScreenProps<"Home">> = observer(function HomeScreen(_props) {
  onAppReadyForNotification()

  const { navigation } = _props
  const {
    userStore: { user, setUserFcmToken },
  } = useStores()

  const { data, handleRefresh, refreshing } = useHomeScreen(user, setUserFcmToken)

  return (
    <Screen contentContainerStyle={$screenContentContainer} preset="fixed" safeAreaEdges={["top"]}>
      <FlashList
        ListHeaderComponent={
          <>
            <View style={$topContainer}>
              <TouchableOpacity style={$avatar} onPress={() => navigation.navigate("Account")}>
                <FastImage uri={user.imageUrl} priority="high" style={$avatarImg} />
              </TouchableOpacity>
              <Icon
                icon="leaderBoard"
                size={45}
                onPress={() => navigation.navigate("LeaderBoard")}
              />
            </View>

            <View style={$instaTalkContainer}>
              <Icon icon="instaTalk" size={100} onPress={() => navigation.navigate("InstaTalk")} />
              <Text preset="subheading" tx="homeScreen.voice" />
            </View>

            {/* materials section */}
            <Text preset="heading" tx="homeScreen.learning" />
            <ScrollView horizontal>
              <View style={$materialContainer}>
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <MaterialCard key={i} onPress={() => navigation.navigate("Material")} />
                  ))}
              </View>
            </ScrollView>

            {/* live stream */}
            <View style={$goLsContainer}>
              <Text preset="heading" tx="homeScreen.ls" />
              <Button tx="homeScreen.lsBtn" onPress={() => navigation.navigate("LiveStreaming")} />
            </View>
          </>
        }
        numColumns={3}
        contentContainerStyle={$flatListContentContainer}
        scrollEnabled
        estimatedItemSize={100}
        data={data}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <LSCard onPress={() => navigation.navigate("LiveStreaming")} item={item} />
        )}
        ListFooterComponent={
          <View style={$footerContainer}>
            <Text text="Made with ❤️ by " />
            <Text
              onPress={() => openLinkInBrowser("https://github.com/FahimMontasir")}
              text="Fahim Montasir"
              style={$fahimMontasir}
            />
          </View>
        }
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  flex: 1,
}

const $topContainer: ViewStyle = {
  flexDirection: "row",
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "10%",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 20,
}

const $avatar: ViewStyle = {
  borderRadius: 50,
  overflow: "hidden",
}
const $avatarImg: FastImageStyle = { width: 50, height: 50 }

const $instaTalkContainer: ViewStyle = {
  alignItems: "center",
  paddingVertical: 40,
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "25%",
}

const $materialContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "25%",
  height: 185,
  flexWrap: "wrap",
  gap: 15,
  marginTop: spacing.xs,
}

const $goLsContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "5%",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.sm,
}

const $flatListContentContainer: ViewStyle = {
  paddingVertical: spacing.xl,
  paddingHorizontal: spacing.sm,
}

const $footerContainer: ViewStyle = {
  flexDirection: "row",
  marginTop: spacing.xxxl,
  alignSelf: "center",
}

const $fahimMontasir: TextStyle = { textDecorationLine: "underline", color: "blue" }
