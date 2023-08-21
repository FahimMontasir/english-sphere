import { useEffect } from "react"
import notifee, { EventType } from "@notifee/react-native"
import { NavigationProp } from "@react-navigation/native"
import { AppStackParamList } from "src/navigators"
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

export default function useNotificationEvents(navigation: NavigationProp<AppStackParamList>) {
  useEffect(() => {
    onBackgroundEventHandler(navigation)
    return onForegroundEventHandler(navigation)
  }, [])
}
