import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "src/navigators"
import { Button, MaterialCard, Modal, Screen, Text, TextField } from "src/components"
import { spacing } from "src/theme"
import { MaterialTile } from "./components/MaterialTile"

export const MaterialScreen: FC<AppStackScreenProps<"Material">> = observer(function MaterialScreen(
  _props,
) {
  const { navigation } = _props
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Screen contentContainerStyle={$root} preset="fixed" safeAreaEdges={["top"]}>
      <View style={$topHeadingContainer}>
        <Text text="Basic English for Speaking" preset="heading" />
        <Button text="Request" onPress={() => setModalVisible(true)} />
      </View>
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
            <MaterialCard
              title="abc"
              thumbnail="dljfsdk"
              key={i}
              onPress={() => navigation.navigate("MaterialDetails")}
            />
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

      <Modal modalVisible={modalVisible} setModalVisible={setModalVisible}>
        <View style={$modalContainer}>
          <TextField
            // value={state.country}
            // onChangeText={(t) => updateValue("country", t)}
            inputMode="text"
            placeholder="Type what you want in details!"
            label="Request box:"
            multiline
            numberOfLines={15}
          />

          <Button
            text="Submit"
            preset="reversed"
            onPress={() => {
              setModalVisible(false)
            }}
          />
        </View>
      </Modal>
    </Screen>
  )
})

const $root: ViewStyle = { flex: 1 }

const $topHeadingContainer: ViewStyle = {
  marginTop: spacing.sm,
  marginHorizontal: spacing.sm,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}

const $headingText: TextStyle = { marginTop: 20, marginLeft: spacing.sm, marginBottom: 10 }

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

const $modalContainer: ViewStyle = {
  marginTop: spacing.xl,
  gap: spacing.sm,
  marginBottom: spacing.md,
}
