import React, { FC, useEffect, useRef, useState } from "react"
import { Dimensions, FlatList, Platform, View, ViewStyle } from "react-native"
import { DrawerLayout, DrawerState } from "react-native-gesture-handler"
import { useSharedValue, withTiming } from "react-native-reanimated"
import { Text } from "app/components"
import { isRTL } from "app/i18n"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { DrawerButton } from "./DrawerButton"
import { MaterialTile } from "../../MaterialScreen/components/MaterialTile"
import { AppStackScreenProps } from "app/navigators"

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
  const menuRef = useRef<FlatList>()
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
    <DrawerLayout
      ref={drawerRef}
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
          <FlatList
            ref={menuRef}
            ListHeaderComponent={<Text text="Recent Materials" preset="heading" />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={$flatListContentContainer}
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
  )
}

const $drawer: ViewStyle = {
  backgroundColor: colors.background,
  flex: 1,
}

const $flatListContentContainer: ViewStyle = {
  paddingHorizontal: spacing.xs,
  gap: spacing.xs,
  paddingVertical: 50,
}

const $materialTileTextContainer: ViewStyle = { width: "65%" }
