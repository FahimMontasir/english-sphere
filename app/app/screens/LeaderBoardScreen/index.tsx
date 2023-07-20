import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, Screen, Text, TextField, Tile } from "app/components"
import { spacing } from "app/theme"
// import { useStores } from "app/models"

const data = [
  { position: 1, rightCaption: "Active: 25m ago" },
  { position: 2, rightCaption: "Active: 30m ago" },
  { position: 3, rightCaption: "Active: 25m ago" },
  { position: 4, rightCaption: "Active: 15m ago" },
  { position: 5, rightCaption: "Active: 25m ago" },
  { position: 6, rightCaption: "Active: 35m ago" },
  { position: 7, rightCaption: "Active: 25m ago" },
  { position: 8, rightCaption: "Active: 25m ago" },
  { position: 9, rightCaption: "Active: 25m ago" },
  { position: 10, rightCaption: "Active: 55m ago" },
  { position: 11, rightCaption: "Active: 25m ago" },
  { position: 12, rightCaption: "Active: 1h ago" },
  { position: 13, rightCaption: "Active: 25m ago" },
  { position: 14, rightCaption: "Active: 25m ago" },
]

export const LeaderBoardScreen: FC<AppStackScreenProps<"LeaderBoard">> = observer(
  function LeaderBoardScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    return (
      <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
        <FlatList
          ListHeaderComponent={
            <View style={$searchUserContainer}>
              <Text text="Your Position: 221" preset="subheading" />
              <TextField
                inputWrapperStyle={$searchInputWrapper}
                placeholderTx="leaderBoardScreen.searchPlaceholder"
                RightAccessory={(props) => <Icon containerStyle={props.style} icon="searchUser" />}
              />
            </View>
          }
          contentContainerStyle={$flatListContentContainer}
          data={data}
          renderItem={({ item }) => (
            <Tile position={item.position} rightCaption={item.rightCaption} />
          )}
          showsVerticalScrollIndicator={false}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  marginHorizontal: spacing.sm,
}

const $searchUserContainer: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: spacing.md,
  marginBottom: 25,
}

const $searchInputWrapper: ViewStyle = { width: 180 }

const $flatListContentContainer: ViewStyle = { gap: 10, paddingBottom: spacing.xl }
