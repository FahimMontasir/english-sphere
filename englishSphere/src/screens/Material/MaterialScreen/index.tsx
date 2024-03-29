import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ScrollView, TextStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { MaterialCard, Screen, Text } from "src/components"
import { spacing } from "src/theme"
import { MaterialTile } from "./components/MaterialTile"

// import { useStores } from "src/models"

export const MaterialScreen: FC<AppStackScreenProps<"Material">> = observer(function MaterialScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const { navigation } = _props
  return (
    <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
      <Text text="Basic English for Speaking" preset="heading" style={$topHeadingText} />
      <Text text="Important Materials" preset="heading" style={$headingText} />
      <ScrollView
        horizontal
        style={$importantContainer}
        contentContainerStyle={$importantMaterialContentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <MaterialCard key={i} onPress={() => navigation.navigate("MaterialDetails")} />
          ))}
      </ScrollView>
      <Text text="Recent Materials" preset="heading" style={$headingText} />

      <FlatList
        contentContainerStyle={$recentMaterialContentContainer}
        data={Array(8)
          .fill(0)
          .map((_, i) => ({ name: i }))}
        renderItem={() => <MaterialTile onPress={() => navigation.navigate("MaterialDetails")} />}
      />
    </Screen>
  )
})

const $root: ViewStyle = { flex: 1 }

const $topHeadingText: TextStyle = { alignSelf: "center", marginTop: spacing.sm }

const $headingText: TextStyle = { marginTop: 30, marginLeft: spacing.sm, marginBottom: 10 }

const $importantMaterialContentContainer: ViewStyle = {
  gap: 10,
  paddingHorizontal: spacing.sm,
}

const $importantContainer: ViewStyle = { flexShrink: 0 }

const $recentMaterialContentContainer: ViewStyle = {
  gap: spacing.sm,
  marginHorizontal: spacing.sm,
  paddingBottom: spacing.sm,
}
