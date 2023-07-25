import React, { useState, useRef, useEffect } from "react"
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native"
import { Camera, CameraType } from "expo-camera"
import { AntDesign, MaterialIcons } from "@expo/vector-icons"

const WINDOW_HEIGHT = Dimensions.get("window").height
const CAPTURE_SIZE = Math.floor(WINDOW_HEIGHT * 0.08)

export default function CameraVerification() {
  const cameraRef = useRef<Camera>()
  const [permission, requestPermission] = Camera.useCameraPermissions()
  const [cameraType, setCameraType] = useState(CameraType.front)
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

  const switchCamera = () => {
    if (isPreview) {
      return
    }
    setCameraType((prevCameraType) =>
      prevCameraType === CameraType.back ? CameraType.front : CameraType.back,
    )
  }

  const onSnap = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.7, base64: true }
      const data = await cameraRef.current.takePictureAsync(options)
      const source = data.base64

      console.log("form snap")
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
      }
    }
  }

  const cancelPreview = () => {
    cameraRef.current.resumePreview()
    setIsPreview(false)
  }

  if (!permission) {
    return <Text style={$text}>No access to camera</Text>
  }

  if (!permission.granted) {
    return <Text style={$text}>No access to camera</Text>
  }

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        type={cameraType}
        onCameraReady={onCameraReady}
        useCamera2Api={true}
      />
      <View style={StyleSheet.absoluteFillObject}>
        {isPreview && (
          <TouchableOpacity onPress={cancelPreview} style={$closeButton} activeOpacity={0.7}>
            <AntDesign name="close" size={32} color="#fff" />
          </TouchableOpacity>
        )}
        {!isPreview && (
          <View style={$bottomButtonsContainer}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
              <MaterialIcons name="flip-camera-ios" size={28} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              disabled={!isCameraReady}
              onPress={onSnap}
              style={$capture}
            />
          </View>
        )}
      </View>
    </View>
  )
}

const $bottomButtonsContainer: ViewStyle = {
  alignItems: "center",
  bottom: 28,
  flexDirection: "row",
  justifyContent: "center",
  position: "absolute",
  width: "100%",
}

const $capture: ViewStyle = {
  backgroundColor: "#4834e0",
  borderRadius: Math.floor(CAPTURE_SIZE / 2),
  height: CAPTURE_SIZE,
  marginBottom: 28,
  marginHorizontal: 30,
  width: CAPTURE_SIZE,
}

const $closeButton: ViewStyle = {
  alignItems: "center",
  backgroundColor: "#5A45FF",
  borderRadius: 25,
  height: 50,
  justifyContent: "center",
  opacity: 0.7,
  position: "absolute",
  right: 20,
  top: 35,
  width: 50,
}

const $text: TextStyle = {
  color: "#ffffff",
}
