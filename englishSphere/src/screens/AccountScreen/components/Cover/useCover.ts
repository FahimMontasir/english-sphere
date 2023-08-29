import { useState } from "react"
import { InitUser } from "src/models/UserStore"
import { AuthApi } from "src/services/api/auth"
import { truncateText } from "src/utils/formatString"

interface IUseCover {
  logout: () => void
  setUser: (value: Partial<InitUser>) => void
}

export function useCover({ logout, setUser }: IUseCover) {
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
    const updatedFullName = truncateText(userEnteredName, 18, "")
    setUser({ fullName: updatedFullName })
    // Todo: update to backend

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
