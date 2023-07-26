import * as React from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ImageStyle, View, ViewStyle } from "react-native"
import { Icon, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { useSafeAreaInsetsStyle } from "app/utils/useSafeAreaInsetsStyle"
import { SECURE_JWT_KEY, secureDelete } from "app/utils/storage/secureStorageAsync"
import CameraVerification from "app/components/CameraVerification"
import { CameraType } from "expo-camera"

interface ICover {
  logout: () => void
}

const Cover = observer(function Cover({ logout }: ICover) {
  const [closedCameraP, setClosedCameraP] = React.useState(true)
  const [closedCameraC, setClosedCameraC] = React.useState(true)

  const $coverContainerInsets = useSafeAreaInsetsStyle(["top"])

  const handleLogout = async () => {
    await secureDelete(SECURE_JWT_KEY)
    logout()
  }

  return (
    <>
      <ImageBackground
        style={$coverContainer}
        source={{ uri: "https://i.pravatar.cc/300" }}
        resizeMode="cover"
      >
        <View style={[$coverLeftContentContainer, $coverContainerInsets]}>
          <Icon
            onPress={() => setClosedCameraC(false)}
            containerStyle={$cameraIcon}
            icon="camera"
            size={25}
            color={colors.palette.white}
          />
          <View style={$userNameContainer}>
            <Text text="Fahim Montasir" preset="subheading" numberOfLines={1} />
            <Icon icon="pen" size={20} color={colors.palette.black} />
          </View>
        </View>

        <View style={[$coverRightContentContainer, $coverContainerInsets]}>
          <Icon
            onPress={handleLogout}
            icon="logout"
            size={25}
            color={colors.palette.white}
            style={$logoutIcon}
          />
          <ImageBackground
            imageStyle={$profilePhotoImage}
            style={$profilePhotoContainer}
            source={{ uri: "https://i.pravatar.cc/300" }}
            resizeMode="cover"
          >
            <Icon
              onPress={() => setClosedCameraP(false)}
              containerStyle={$profilePhotoCameraContainer}
              icon="camera"
              size={20}
              color={colors.palette.black}
            />
          </ImageBackground>
        </View>
      </ImageBackground>

      {!closedCameraP && <CameraVerification handleCloseCamera={setClosedCameraP} />}
      {!closedCameraC && (
        <CameraVerification handleCloseCamera={setClosedCameraC} cameraType={CameraType.back} />
      )}
    </>
  )
})

export default Cover

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

const $coverRightContentContainer: ViewStyle = {
  height: "100%",
  justifyContent: "space-between",
  alignItems: "flex-end",
}

const $cameraIcon: ImageStyle = {
  marginLeft: spacing.sm,
  width: 25,
}

const $logoutIcon: ImageStyle = {
  marginRight: spacing.sm,
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
