import React from "react"
import { Image, StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { Camera as RNVCamera } from "react-native-vision-camera"
import { Icon } from "../Icon"
import { colors, spacing } from "src/theme"
import { useCamera } from "./useCamera"
import { observer } from "mobx-react-lite"
import { useStores } from "src/models"

interface ICamera {
  style?: StyleProp<ViewStyle>
  cameraType?: "front" | "back"
  isClosed: boolean
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>
}

export const Camera = observer(function Camera(props: ICamera) {
  const { style, isClosed, setIsClosed, cameraType = "front" } = props
  const $style = [StyleSheet.absoluteFill, $cameraContainer, style]

  const {
    userStore: { setUser },
  } = useStores()

  const { device, camera, imageSource, handleTakePhoto } = useCamera({
    setIsClosed,
    cameraType,
    setUser,
  })

  if (device == null) return null

  return (
    <View style={$style}>
      {!imageSource ? (
        <>
          <RNVCamera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={!isClosed}
            preset="photo"
            photo={true}
          />
          <View style={$buttonContainer}>
            <Icon
              onPress={handleTakePhoto}
              icon="camera"
              color={colors.palette.black}
              size={50}
              containerStyle={{
                padding: spacing.xs,
                backgroundColor: colors.background,
                borderRadius: spacing.xs,
              }}
            />
          </View>
        </>
      ) : (
        <Image
          style={StyleSheet.absoluteFill}
          source={{
            uri: `file://${imageSource}`,
          }}
        />
      )}
    </View>
  )
})

const $cameraContainer: ViewStyle = {
  zIndex: 999,
  backgroundColor: colors.background,
}

const $buttonContainer: ViewStyle = {
  position: "absolute",
  bottom: 50,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
}
