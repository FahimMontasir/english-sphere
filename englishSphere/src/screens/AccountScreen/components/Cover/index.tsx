import React from "react"
import { observer } from "mobx-react-lite"
import { ImageBackground, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Icon, Text, TextField, TextFieldAccessoryProps, Camera } from "src/components"
import { colors, spacing, typography } from "src/theme"
import { useSafeAreaInsetsStyle } from "src/utils/useSafeAreaInsetsStyle"
import { useStores } from "src/models"
import { useCover } from "./useCover"

const Cover = observer(function Cover() {
  const $coverContainerInsets = useSafeAreaInsetsStyle(["top"])

  const {
    userStore: { logout, user, setUser },
  } = useStores()

  const {
    onChangeName,
    handleLogout,
    setClosedCameraC,
    setClosedCameraP,
    closedCameraC,
    closedCameraP,
    disableLogout,
    penPressed,
    setPenPressed,
    userEnteredName,
    setUserEnteredName,
  } = useCover({ logout, setUser, user })

  const SkillAddIcon = (props: TextFieldAccessoryProps) => {
    return <Icon onPress={onChangeName} containerStyle={props.style} icon="plus" />
  }

  return (
    <>
      <ImageBackground
        style={$coverContainer}
        source={
          user?.coverUrl
            ? { uri: user.coverUrl }
            : require("../../../../../assets/images/bootsplash_logo_original.png")
        }
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
            {penPressed ? (
              <TextField
                placeholder="Type here..."
                value={userEnteredName}
                onChangeText={(v) => setUserEnteredName(v)}
                containerStyle={$nameInputContainer}
                inputWrapperStyle={$nameInputWrapper}
                style={$nameInput}
                RightAccessory={SkillAddIcon}
              />
            ) : (
              <>
                <Text text={user?.fullName} preset="subheading" numberOfLines={1} />
                <Icon
                  icon="pen"
                  size={20}
                  color={colors.palette.black}
                  onPress={() => setPenPressed(true)}
                />
              </>
            )}
          </View>
        </View>

        <View style={[$coverRightContentContainer, $coverContainerInsets]}>
          <Icon
            disabled={disableLogout}
            onPress={handleLogout}
            icon="logout"
            size={25}
            color={colors.palette.white}
            style={$logoutIcon}
          />
          <ImageBackground
            imageStyle={$profilePhotoImage}
            style={$profilePhotoContainer}
            source={{ uri: user?.imageUrl }}
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

      {!closedCameraP && <Camera setIsClosed={setClosedCameraP} isClosed={closedCameraP} />}
      {!closedCameraC && (
        <Camera setIsClosed={setClosedCameraC} isClosed={closedCameraC} cameraType={"back"} />
      )}
    </>
  )
})

export default Cover

const $coverContainer: ImageStyle = {
  flexBasis: "17.6%",
  flexGrow: 0,
  flexShrink: 0,
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

const $nameInput: TextStyle = { marginHorizontal: 0, fontFamily: typography.primary.medium }

const $nameInputContainer: ViewStyle = { width: "100%" }

const $nameInputWrapper: ViewStyle = {
  backgroundColor: "transparent",
  borderColor: "transparent",
}
