import { useEffect, useState } from "react"
import Toast from "react-native-toast-message"
import { InitUser } from "src/models/UserStore"
import { UserApi } from "src/services/api/user"

interface IUseAccountScreen {
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export const useAccountScreen = ({ user, setUser }: IUseAccountScreen) => {
  const [modalVisible, setModalVisible] = useState(false)
  const [gender, setGender] = useState(user?.gender === "unknown" ? "male" : user?.gender || "")
  const [age, setAge] = useState<string>()

  useEffect(() => {
    if (!user?.age) {
      setModalVisible(true)
    }
  }, [])

  const handleAgeAndGender = async () => {
    if (!Number(age) || !gender) {
      Toast.show({
        type: "error",
        text1: "Please provide all information.",
        text2: "Otherwise you will see this popup agin.",
      })
      return
    }
    const prevGender = user?.gender
    const prevAge = user?.age

    setUser({ age: Number(age), gender })
    setModalVisible(false)

    UserApi.updateUserInfo({ age: Number(age), gender }).catch(() => {
      // if failed restore the prev one prevFullName
      Toast.show({
        type: "error",
        text1: "Failed to add age and gender!",
        text2: "Please try again.",
      })
      setUser({ age: prevAge, gender: prevGender })
    })
  }

  return { modalVisible, setModalVisible, handleAgeAndGender, gender, setGender, age, setAge }
}
