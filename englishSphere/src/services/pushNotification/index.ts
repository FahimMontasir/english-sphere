import notifee, { AndroidImportance } from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { fromNow } from "src/utils/formatDate"
import { NOTI_TYPE, NotiPayload } from "./types"

notifee.onBackgroundEvent(async () => {
  // handle all events inside onBackgroundHandler
})

const onMessageReceived = async (message) => {
  const { data, notification, sentTime } = message as NotiPayload
  console.log(fromNow(sentTime), data)

  if (data.type === NOTI_TYPE.DEFAULT) {
    await notifee.displayNotification({
      id: data.id,
      title: notification.title,
      body: notification.body,
      android: {
        channelId: NOTI_TYPE.DEFAULT,
        importance: AndroidImportance.DEFAULT,
        sound: "cool",
        pressAction: {
          id: data.type,
        },
      },
    })
  } else if (data.type === NOTI_TYPE.APP_UPDATE) {
    await notifee.displayNotification({
      id: data.id,
      title: notification.title,
      body: notification.body,
      android: {
        channelId: NOTI_TYPE.APP_UPDATE,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
        },
      },
      // ios: {
      //   categoryId: data.type,
      //   foregroundPresentationOptions: {
      //     badge: true,
      //     sound: true,
      //     banner: true,
      //     list: true,
      //   },
      // },
    })
  } else if (data.type === NOTI_TYPE.MATERIALS) {
    await notifee.displayNotification({
      id: data.id,
      title: notification.title,
      body: notification.body,
      android: {
        channelId: NOTI_TYPE.MATERIALS,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
        },
      },
    })
  } else if (data.type === NOTI_TYPE.INSTA) {
    await notifee.displayNotification({
      id: data.id,
      title: notification.title,
      body: notification.body,
      android: {
        channelId: NOTI_TYPE.INSTA,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
        },
      },
    })
  } else if (data.type === NOTI_TYPE.MESSAGE) {
    await notifee.displayNotification({
      id: data.id,
      title: notification.title,
      body: notification.body,
      android: {
        channelId: NOTI_TYPE.MESSAGE,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
        },
      },
    })
  } else if (data.type === NOTI_TYPE.MESSAGE_REQUEST) {
    await notifee.displayNotification({
      id: data.id,
      title: notification.title,
      body: notification.body,
      android: {
        channelId: NOTI_TYPE.MESSAGE_REQUEST,
        importance: AndroidImportance.LOW,
        pressAction: {
          id: data.type,
        },
      },
    })
  }
}

messaging().onMessage(onMessageReceived)
messaging().setBackgroundMessageHandler(onMessageReceived)
