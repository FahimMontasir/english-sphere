import notifee, { AndroidImportance, AndroidStyle } from "@notifee/react-native"
import messaging from "@react-native-firebase/messaging"
import { NOTI_TYPE, NotiPayload } from "./types"
import { HandleNotiData } from "./handleNotificationData"
import { EventEmitter } from "events"
export const storageEmitter = new EventEmitter()

notifee.onBackgroundEvent(async () => {
  // handle all events inside onBackgroundHandler
})

const onMessageReceived = async (message) => {
  const { data, notification, sentTime } = message as NotiPayload

  HandleNotiData.add({ data, notification, sentTime, unread: true })

  if (data.type === NOTI_TYPE.DEFAULT) {
    await notifee.displayNotification({
      id: data.id,
      title: data.title || notification.title,
      subtitle: data.subtitle || "Live, Breathe, Speak English",
      body: data.body || notification.body,
      android: {
        channelId: NOTI_TYPE.DEFAULT,
        importance: AndroidImportance.DEFAULT,
        sound: "cool",
        pressAction: {
          id: data.type,
          launchActivity: "default",
        },
      },
    })
  } else if (data.type === NOTI_TYPE.APP_UPDATE) {
    await notifee.displayNotification({
      id: data.id,
      title: data.title || notification.title,
      subtitle: data.subtitle || "Live, Breathe, Speak English",
      body: data.body || notification.body,
      android: {
        channelId: NOTI_TYPE.APP_UPDATE,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
          launchActivity: "default",
        },
        largeIcon: data.imageUrl || "https://avatars.githubusercontent.com/u/76746363",
        style: { type: AndroidStyle.BIGPICTURE, picture: data.banner || "" },
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
      title: data.title || notification.title,
      subtitle: data.subtitle || "Live, Breathe, Speak English",
      body: data.body || notification.body,
      android: {
        channelId: NOTI_TYPE.MATERIALS,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
          launchActivity: "default",
        },
      },
    })
  } else if (data.type === NOTI_TYPE.INSTA) {
    await notifee.displayNotification({
      id: data.id,
      title: data.title || notification.title,
      subtitle: data.subtitle || "Live, Breathe, Speak English",
      body: data.body || notification.body,
      android: {
        channelId: NOTI_TYPE.INSTA,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
          launchActivity: "default",
        },
      },
    })
  } else if (data.type === NOTI_TYPE.MESSAGE) {
    await notifee.displayNotification({
      id: data.id,
      title: data.title || notification.title,
      subtitle: data.subtitle || "Live, Breathe, Speak English",
      body: data.body || notification.body,
      android: {
        channelId: NOTI_TYPE.MESSAGE,
        importance: AndroidImportance.HIGH,
        sound: "cool",
        pressAction: {
          id: data.type,
          launchActivity: "default",
        },
      },
    })
  } else if (data.type === NOTI_TYPE.MESSAGE_REQUEST) {
    await notifee.displayNotification({
      id: data.id,
      title: data.title || notification.title,
      subtitle: data.subtitle || "Live, Breathe, Speak English",
      body: data.body || notification.body,
      android: {
        channelId: NOTI_TYPE.MESSAGE_REQUEST,
        importance: AndroidImportance.LOW,
        pressAction: {
          id: data.type,
          launchActivity: "default",
        },
      },
    })
  }
}

messaging().onMessage(onMessageReceived)
messaging().setBackgroundMessageHandler(onMessageReceived)
