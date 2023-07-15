import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity, FlatList, ScrollView } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { spacing } from "app/theme"
// components
import { AutoImage, Button, Icon, MaterialCard, Screen, Text } from "app/components"
import { LSCard } from "./components/LSCard"
// hooks
import { useHomeScreen } from "./useHomeScreen"
// import { useStores } from "app/models"
// assets
const defaultAccImage = require("../../../assets/icons/view.png")

export const HomeScreen: FC<AppStackScreenProps<"Home">> = observer(function HomeScreen(_props) {
  const { navigation } = _props
  // MST stores
  // const { somestore } = useStores()

  const { data, handleRefresh, refreshing } = useHomeScreen()

  return (
    <Screen contentContainerStyle={$screenContentContainer} preset="fixed" safeAreaEdges={["top"]}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={$topContainer}>
              <TouchableOpacity style={$avatar} onPress={() => navigation.navigate("Account")}>
                <AutoImage
                  maxWidth={50}
                  maxHeight={50}
                  defaultSource={defaultAccImage}
                  source={{ uri: "https://i.pravatar.cc/50" }}
                />
              </TouchableOpacity>
              <Icon icon="leaderBoard" size={45} onPress={() => console.log("hi")} />
            </View>

            <View style={$instaTalkContainer}>
              <Icon icon="instaTalk" size={100} onPress={() => console.log("hi")} />
              <Text preset="subheading" tx="homeScreen.voice" />
            </View>

            {/* materials section */}
            <Text preset="heading" tx="homeScreen.learning" />
            <ScrollView horizontal>
              <View style={$materialContainer}>
                <MaterialCard />
                <MaterialCard />
                <MaterialCard />
                <MaterialCard />
                <MaterialCard />
              </View>
            </ScrollView>

            {/* live stream */}
            <View style={$goLsContainer}>
              <Text preset="heading" tx="homeScreen.ls" />
              <Button tx="homeScreen.lsBtn" />
            </View>
          </>
        }
        numColumns={3}
        columnWrapperStyle={$flatListColumnWrapper}
        contentContainerStyle={$flatListContentContainer}
        scrollEnabled
        data={data}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => <LSCard item={item} />}
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

const $flatListColumnWrapper: ViewStyle = {
  columnGap: 10,
  justifyContent: "center",
}
