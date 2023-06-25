import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, TouchableOpacity, FlatList, Image, ImageStyle } from "react-native"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AppStackScreenProps } from "app/navigators"
import { AutoImage, Button, Icon, MaterialCard, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { ScrollView } from "react-native-gesture-handler"
const defaultAccImage = require("../../../assets/icons/view.png")
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface HomeScreenProps extends NativeStackScreenProps<AppStackScreenProps<"Home">> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <Screen contentContainerStyle={$screenContentContainer} preset="fixed" safeAreaEdges={["top"]}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={$topContainer}>
              <TouchableOpacity style={$avatar}>
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
        data={[
          { thumbnail: "https://i.pravatar.cc/300", id: 1 },
          { thumbnail: "https://i.pravatar.cc/300", id: 2 },
          { thumbnail: "https://i.pravatar.cc/300", id: 3 },
          { thumbnail: "https://i.pravatar.cc/300", id: 4 },
          { thumbnail: "https://i.pravatar.cc/300", id: 5 },
        ]}
        renderItem={({ item }) => <Image style={$lsThumbnail} source={{ uri: item.thumbnail }} />}
      />
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  backgroundColor: colors.background,
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

const $lsThumbnail: ImageStyle = {
  width: 100,
  height: 80,
  borderRadius: spacing.xs,
  marginTop: 10,
}

const $flatListColumnWrapper: ViewStyle = {
  columnGap: 10,
  justifyContent: "center",
}
