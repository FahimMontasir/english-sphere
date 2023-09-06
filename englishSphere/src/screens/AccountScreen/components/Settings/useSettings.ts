import { InitUser } from "src/models/UserStore"

interface IUseSettings {
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export const useSettings = ({ setUser, user }: IUseSettings) => {
  const onDeletePress = (device: string) => {
    // todo: update db

    setUser({ fcmTokens: user?.fcmTokens.filter((i) => i.device !== device) as any })
  }

  return { onDeletePress }
}
