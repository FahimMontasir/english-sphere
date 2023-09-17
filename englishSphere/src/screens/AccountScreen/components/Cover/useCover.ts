import { useState } from "react"
import Toast from "react-native-toast-message"
import { InitUser } from "src/models/UserStore"
import { AuthApi } from "src/services/api/auth"
import { UserApi } from "src/services/api/user"
import { truncateText } from "src/utils/formatString"

interface IUseCover {
  logout: () => void
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export function useCover({ logout, setUser, user }: IUseCover) {
  const [closedCameraP, setClosedCameraP] = useState(true)
  const [closedCameraC, setClosedCameraC] = useState(true)
  const [disableLogout, setDisableLogout] = useState(false)
  const [penPressed, setPenPressed] = useState(false)
  const [userEnteredName, setUserEnteredName] = useState("")

  const handleLogout = async () => {
    setDisableLogout(true)
    await AuthApi.logoutUser(logout)
  }

  const onChangeName = () => {
    if (!userEnteredName) return

    const prevFullName = user?.fullName
    const updatedFullName = truncateText(userEnteredName, 18, "")
    setUser({ fullName: updatedFullName })

    UserApi.updateUserInfo({ fullName: updatedFullName }).catch(() => {
      // if failed restore the prev one prevFullName
      Toast.show({
        type: "error",
        text1: "Failed to change name!",
        text2: "Please try again.",
      })
      setUser({ fullName: prevFullName })
    })

    setPenPressed(false)
    setUserEnteredName("")
  }
  return {
    handleLogout,
    onChangeName,
    closedCameraP,
    setClosedCameraP,
    closedCameraC,
    setClosedCameraC,
    disableLogout,
    penPressed,
    setPenPressed,
    userEnteredName,
    setUserEnteredName,
  }
}
