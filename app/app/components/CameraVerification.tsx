import React, { useState, useRef, useEffect } from "react"
import { StyleSheet, View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import { Camera, CameraType } from "expo-camera"
import Toast from "react-native-toast-message"
import { colors } from "app/theme"
import { Icon } from "./Icon"
import { Text } from "./Text"

interface ICameraVerification {
  cameraType?: CameraType
  handleCloseCamera: (param: boolean) => void
}

export default function CameraVerification(props: ICameraVerification) {
  const { cameraType = CameraType.front, handleCloseCamera } = props

  const cameraRef = useRef<Camera>()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [isPreview, setIsPreview] = useState(false)
  const [isCameraReady, setIsCameraReady] = useState(false)

  useEffect(() => {
    if (permission && !permission.granted) {
      onHandlePermission()
    }
  }, [permission])

  const onHandlePermission = async () => {
    await requestPermission()
  }

  const onCameraReady = () => {
    setIsCameraReady(true)
  }

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true }
      const data = await cameraRef.current.takePictureAsync(options)
      const source = data.base64

      if (source) {
        cameraRef.current.pausePreview()
        setIsPreview(true)

        // const base64Img = `data:image/jpg;base64,${source}`
        // const apiUrl = "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload"
        // const data = {
        //   file: base64Img,
        //   upload_preset: "<your-upload-preset>",
        // }

        // fetch(apiUrl, {
        //   body: JSON.stringify(data),
        //   headers: {
        //     "content-type": "application/json",
        //   },
        //   method: "POST",
        // })
        //   .then(async (response) => {
        //     const data = await response.json()
        //     if (data.secure_url) {
        //       alert("Upload successful")
        //     }
        //   })
        //   .catch((err) => {
        //     alert("Cannot upload")
        //     console.log(err)
        //   })

        Toast.show({
          type: "success",
          text1: "Your photo is uploaded successfully!",
          onHide: () => {
            cancelPreview()
            handleCloseCamera(true)
          },
        })
      }
    }
  }

  const cancelPreview = () => {
    cameraRef.current?.resumePreview()
    setIsPreview(false)
  }

  if (!permission) {
    return <View />
  }

  if (!permission.granted) {
    return (
      <View style={$container}>
        <Text style={$warningText} text="Please allow access to use camera!!!" preset="heading" />
      </View>
    )
  }

  return (
    <View style={$container}>
      <Camera
        ref={cameraRef}
        style={$cameraContainer}
        autoFocus
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={StyleSheet.absoluteFill}>
        {!isPreview && (
          <>
            <Icon
              onPress={() => handleCloseCamera(true)}
              icon="x"
              containerStyle={$closeButton}
              size={32}
              color={colors.palette.white}
            />
            <View style={$bottomButtonsContainer}>
              <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                onPress={onSnap}
                style={$capture}
              >
                <Icon icon="camera" color={colors.palette.white} size={32} />
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  // flex: 1,
  ...StyleSheet.absoluteFillObject,
  zIndex: 9999,
  justifyContent: "center",
  backgroundColor: colors.background,
}

const $cameraContainer: ViewStyle = { width: "100%", height: "65%", marginTop: -50 }

const $bottomButtonsContainer: ViewStyle = {
  alignItems: "center",
  bottom: 25,
  flexDirection: "row",
  justifyContent: "center",
  position: "absolute",
  width: "100%",
}

const $capture: ViewStyle = {
  backgroundColor: colors.palette.indigo,
  borderRadius: 25,
  height: 80,
  width: 80,
  marginBottom: 25,
  justifyContent: "center",
  alignItems: "center",
}

const $closeButton: ViewStyle = {
  alignItems: "center",
  backgroundColor: colors.palette.indigo,
  borderRadius: 25,
  height: 50,
  justifyContent: "center",
  position: "absolute",
  right: 20,
  top: 35,
  width: 50,
}

const $warningText: TextStyle = {
  color: colors.palette.red,
  textAlign: "center",
}
