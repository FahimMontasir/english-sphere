import { useRef, useState } from "react"
import { Camera as RNVCamera, useCameraDevices } from "react-native-vision-camera"
import Toast from "react-native-toast-message"
import { blobToBase64, uriToBlob } from "src/utils/uriToBlob"
import Config from "src/config"
import { InitUser } from "src/models/UserStore"
import { UserApi } from "src/services/api/user"

interface IUseCamera {
  cameraType: "front" | "back"
  setIsClosed: React.Dispatch<React.SetStateAction<boolean>>
  setUser: (v: Partial<InitUser>) => void
}

export function useCamera({ setIsClosed, cameraType, setUser }: IUseCamera) {
  const [imageSource, setImageSource] = useState("")

  // requesting camera permission
  RNVCamera.requestCameraPermission().then((v) => {
    if (v === "denied") {
      Toast.show({
        type: "error",
        text1: "Camera permission is required!",
        text2: "Otherwise you cannot use this feature.",
        onHide: () => {
          // stop camera screen
          setIsClosed(true)
        },
      })
    }
  })

  const devices = useCameraDevices()
  const device = cameraType === "back" ? devices.back : devices.front

  const camera = useRef<RNVCamera>(null)

  const handleTakePhoto = async () => {
    if (camera.current) {
      try {
        Toast.show({
          type: "info",
          text1: "Image upload started!",
        })

        const photo = await camera.current.takeSnapshot({
          skipMetadata: true,
          flash: "off",
          quality: 90,
        })

        setImageSource(photo.path)

        const blobData = await uriToBlob(`file://${photo.path}`)
        const base64Data = await blobToBase64(blobData)

        const data = new FormData()
        data.append("image", base64Data.replace(/^data:image\/\w+;base64,/, ""))

        // upload to imageBB cloud
        const upload = await fetch(Config.IMG_API_URL, {
          method: "POST",
          body: data,
        })
        const json = await upload.json()
        const imageExactUrl =
          cameraType === "back"
            ? { coverUrl: json.data?.display_url }
            : { imageUrl: json.data?.display_url }

        UserApi.updateUserInfo(imageExactUrl)
          .then(() =>
            Toast.show({
              type: "success",
              text1: "Your image uploaded successfully!",
              onHide: () => {
                // update local state
                setUser(imageExactUrl)
                // stop camera screen
                setIsClosed(true)
              },
            }),
          )
          .catch(() =>
            Toast.show({
              type: "error",
              text1: "Your image uploaded failed!",
              onHide: () => {
                // stop camera screen
                setIsClosed(true)
              },
            }),
          )
      } catch {
        Toast.show({
          type: "error",
          text1: "Your image uploaded failed!",
          onHide: () => {
            // stop camera screen
            setIsClosed(true)
          },
        })
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Something went wrong. Click again!",
      })
    }
  }

  return { device, camera, imageSource, handleTakePhoto }
}
