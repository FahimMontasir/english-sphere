import { useEffect } from "react"
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from "react-native"
import notifee, { AndroidImportance, AuthorizationStatus, EventType } from "@notifee/react-native"
import Toast from "react-native-toast-message"
import { NavigationProp } from "@react-navigation/native"
import { AppStackParamList } from "app/navigators"
import { NOTI_TYPE } from "./types"

const onForegroundEventHandler = (navigation: NavigationProp<AppStackParamList>) => {
  return notifee.onForegroundEvent(async ({ type, detail }) => {
    if (navigation) {
      if (
        type === EventType.PRESS &&
        detail.notification?.android?.pressAction?.id === NOTI_TYPE.APP_UPDATE
      ) {
        navigation.navigate("Account")
      }
    }
  })
}

async function onBackgroundEventHandler(navigation: NavigationProp<AppStackParamList>) {
  const initialNotification = await notifee.getInitialNotification()
  console.log({ initialNotification })

  if (initialNotification && navigation) {
    if (initialNotification.pressAction?.id === NOTI_TYPE.APP_UPDATE) {
      navigation.navigate("Account")
    }
  }
}

async function onAppBoots() {
  if (Platform.OS === "android") {
    await notifee.createChannel({
      id: NOTI_TYPE.DEFAULT,
      name: "Default",
      importance: AndroidImportance.DEFAULT,
      sound: "cool",
    })
    await notifee.createChannel({
      id: NOTI_TYPE.APP_UPDATE,
      name: "Features update",
      importance: AndroidImportance.HIGH,
      sound: "cool",
      vibration: false,
    })
    await notifee.createChannel({
      id: NOTI_TYPE.MATERIALS,
      name: "Materials",
      importance: AndroidImportance.HIGH,
      sound: "cool",
      vibration: false,
    })
    await notifee.createChannel({
      id: NOTI_TYPE.INSTA,
      name: "Insta (audio/video)",
      importance: AndroidImportance.HIGH,
      sound: "cool",
    })
    await notifee.createChannel({
      id: NOTI_TYPE.MESSAGE,
      name: "Message",
      importance: AndroidImportance.HIGH,
      sound: "cool",
      vibration: false,
    })
    await notifee.createChannel({
      id: NOTI_TYPE.MESSAGE_REQUEST,
      name: "Message request",
      importance: AndroidImportance.LOW,
    })

    const settings = await notifee.getNotificationSettings()

    if (settings.authorizationStatus === AuthorizationStatus.DENIED) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      )
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Toast.show({
          type: "error",
          text1: "Your notification permission is required!!!",
          text2: "Otherwise the insta log won't work.",
        })
      }
    }
  } else if (Platform.OS === "ios") {
    // await notifee.setNotificationCategories([
    //   {
    //     id: NOTI_TYPE.APP_UPDATE,
    //     actions: [
    //       {
    //         id: NOTI_TYPE.APP_UPDATE,
    //         title: "Feature update",
    //       },
    //     ],
    //   },
    // ])

    const settings = await notifee.requestPermission()

    if (settings.authorizationStatus < AuthorizationStatus.AUTHORIZED) {
      Toast.show({
        type: "error",
        text1: "Your notification permission is required!!!",
        text2: "Otherwise the insta log won't work.",
      })
    }
  }
}

export default function useNotificationEvents(navigation: NavigationProp<AppStackParamList>) {
  useEffect(() => {
    onBackgroundEventHandler(navigation)
    return onForegroundEventHandler(navigation)
  }, [])

  onAppBoots()
}
