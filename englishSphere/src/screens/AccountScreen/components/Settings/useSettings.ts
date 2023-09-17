import Toast from "react-native-toast-message"
import { InitUser } from "src/models/UserStore"
import { UserApi } from "src/services/api/user"

interface IUseSettings {
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export const useSettings = ({ setUser, user }: IUseSettings) => {
  const onDeletePress = (device: string) => {
    setUser({ fcmTokens: user?.fcmTokens.filter((i) => i.device !== device) as any })
    UserApi.removeOtherDevice(device).catch(() => {
      Toast.show({
        type: "error",
        text1: "Removing device failed!",
        text2: "Please try again.",
      })
    })
  }

  return { onDeletePress }
}
