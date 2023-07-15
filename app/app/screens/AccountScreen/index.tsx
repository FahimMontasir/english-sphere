import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ImageStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Icon, Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

export const AccountScreen: FC<AppStackScreenProps<"Account">> = observer(function AccountScreen(
  _props,
) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const $coverContainerInsets = useSafeAreaInsetsStyle(["top"])

  return (
    <Screen
      StatusBarProps={{ backgroundColor: "transparent" }}
      statusBarStyle="light"
      contentContainerStyle={$contentContainerStyle}
      preset="scroll"
    >
      <ImageBackground
        style={$coverContainer}
        source={{ uri: "https://i.pravatar.cc/300" }}
        resizeMode="cover"
      >
        <View style={[$coverLeftContentContainer, $coverContainerInsets]}>
          <Icon style={$cameraIcon} icon="camera" size={25} color={colors.palette.white} />
          <View style={$userNameContainer}>
            <Text text="Fahim Montasir" preset="subheading" numberOfLines={1} />
            <Icon icon="pen" size={20} color={colors.palette.black} />
          </View>
        </View>

        <ImageBackground
          imageStyle={$profilePhotoImage}
          style={$profilePhotoContainer}
          source={{ uri: "https://i.pravatar.cc/300" }}
          resizeMode="cover"
        >
          <TouchableOpacity activeOpacity={0.8} style={$profilePhotoCameraContainer}>
            <Icon icon="camera" size={20} color={colors.palette.black} />
          </TouchableOpacity>
        </ImageBackground>
      </ImageBackground>
    </Screen>
  )
})

const $contentContainerStyle: ViewStyle = {
  flex: 1,
}

const $coverContainer: ImageStyle = {
  height: 150,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "flex-end",
}

const $coverLeftContentContainer: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
}

const $cameraIcon: ImageStyle = {
  marginLeft: spacing.sm,
}

const $userNameContainer: ViewStyle = {
  backgroundColor: colors.palette.transparentGray,
  width: 165,
  height: 40,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: spacing.xs,
  borderTopRightRadius: spacing.md,
}

const $profilePhotoImage: ImageStyle = {
  borderRadius: 50,
}

const $profilePhotoContainer: ImageStyle = {
  width: 100,
  height: 100,
  marginBottom: -25,
  marginRight: spacing.md,
  justifyContent: "flex-end",
}

const $profilePhotoCameraContainer: ViewStyle = {
  backgroundColor: colors.background,
  width: 30,
  height: 30,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
}
