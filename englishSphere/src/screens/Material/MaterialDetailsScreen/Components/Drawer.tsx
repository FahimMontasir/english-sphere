import React, { FC, useEffect, useRef, useState } from "react"
import { Dimensions, Platform, TextStyle, View, ViewStyle } from "react-native"
import { DrawerLayout, DrawerState, GestureHandlerRootView } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { ContentStyle, FlashList } from "@shopify/flash-list"
import { Text } from "src/components"
import { isRTL } from "src/i18n"
import { colors, spacing } from "src/theme"
import { useSafeAreaInsetsStyle } from "src/utils/useSafeAreaInsetsStyle"
import { DrawerButton } from "./DrawerButton"
import { MaterialTile } from "../../MaterialScreen/components/MaterialTile"
import { AppStackScreenProps } from "src/navigators"

export interface IDrawer {
  children: React.ReactNode
  navigator: AppStackScreenProps<"MaterialDetails">
}

export const Drawer: FC<IDrawer> = function Drawer(props) {
  const {
    children,
    navigator: { navigation },
  } = props
  const [open, setOpen] = useState(false)
  const timeout = useRef<ReturnType<typeof setTimeout>>()
  const drawerRef = useRef<DrawerLayout>()
  const menuRef = useRef<FlashList<any>>()
  const progress = useSharedValue(0)

  const toggleDrawer = () => {
    if (!open) {
      setOpen(true)
      drawerRef.current?.openDrawer({ speed: 2 })
    } else {
      setOpen(false)
      drawerRef.current?.closeDrawer({ speed: 2 })
    }
  }

  const handleNavigate = () => {
    toggleDrawer()
    navigation.navigate("MaterialDetails")
  }

  useEffect(() => {
    return () => timeout.current && clearTimeout(timeout.current)
  }, [])

  const $drawerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <GestureHandlerRootView style={$root}>
      <DrawerLayout
        ref={drawerRef as any}
        drawerWidth={Platform.select({ default: 326, web: Dimensions.get("window").width * 0.3 })}
        drawerType={"slide"}
        drawerPosition={isRTL ? "right" : "left"}
        overlayColor={open ? colors.palette.overlay20 : "transparent"}
        onDrawerSlide={(drawerProgress) => {
          progress.value = open ? 1 - drawerProgress : drawerProgress
        }}
        onDrawerStateChanged={(newState: DrawerState, drawerWillShow: boolean) => {
          if (newState === "Settling") {
            progress.value = withTiming(drawerWillShow ? 1 : 0, {
              duration: 250,
            })
            setOpen(drawerWillShow)
          }
        }}
        renderNavigationView={() => (
          <View style={[$drawer, $drawerInsets]}>
            <FlashList
              ref={menuRef as any}
              ListHeaderComponent={
                <Text style={$materialsHeading} text="Recent Materials" preset="heading" />
              }
              showsVerticalScrollIndicator={false}
              estimatedItemSize={100}
              contentContainerStyle={$flatListContentContainer}
              ItemSeparatorComponent={() => <View style={$flashListItemSeparator} />}
              data={Array(15)
                .fill(0)
                .map((_, i) => ({ name: i }))}
              renderItem={() => (
                <MaterialTile
                  textContainerStyle={$materialTileTextContainer}
                  onPress={handleNavigate}
                />
              )}
            />
          </View>
        )}
      >
        <>
          <DrawerButton onPress={toggleDrawer} {...{ open, progress }} />
          {children}
        </>
      </DrawerLayout>
    </GestureHandlerRootView>
  )
}

const $root: ViewStyle = { flex: 1 }
const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $materialsHeading: TextStyle = { marginBottom: spacing.sm }

const $flatListContentContainer: ContentStyle = {
  paddingHorizontal: spacing.xs,
  paddingVertical: 50,
}

const $materialTileTextContainer: ViewStyle = { width: "65%" }

const $flashListItemSeparator: ViewStyle = { marginTop: 10 }
