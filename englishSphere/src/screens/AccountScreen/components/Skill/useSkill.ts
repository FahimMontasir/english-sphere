import { useState } from "react"
import Toast from "react-native-toast-message"
import { InitUser } from "src/models/UserStore"
import { UserApi } from "src/services/api/user"
import { cleanString } from "src/utils/formatString"

interface IUseSkill {
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export const useSkill = ({ setUser, user }: IUseSkill) => {
  const [newSkill, setNewSkill] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const onAddSkill = () => {
    if (user?.interests.find((v) => cleanString(v) === cleanString(newSkill))) {
      Toast.show({
        type: "error",
        text1: "You cannot add same skills twice!",
        text2: "Please try with a new one.",
      })
      return
    }

    if (user?.interests) {
      setUser({ interests: [...user.interests, newSkill] as any })
    } else {
      setUser({ interests: [newSkill] as any })
    }
    setNewSkill("")

    UserApi.addSkill(newSkill).catch(() => {
      Toast.show({
        type: "error",
        text1: "Adding skill or interests failed!",
        text2: "Please try again.",
      })
      setUser({ interests: user?.interests.filter((v) => v !== newSkill) as any })
    })
  }

  const onDeletePress = (v: string) => {
    const removedIndex = user?.interests.indexOf(v) as number
    setUser({ interests: user?.interests.filter((i) => i !== v) as any })

    UserApi.removeSkill(v).catch(() => {
      Toast.show({
        type: "error",
        text1: "Removing skill or interests failed!",
        text2: "Please try again.",
      })

      const prevInterests = [...(user?.interests || [])] as any
      prevInterests.splice(removedIndex, 0, v)
      setUser({ interests: prevInterests })
    })
  }

  return { newSkill, setNewSkill, modalVisible, setModalVisible, onAddSkill, onDeletePress }
}
