import { useState } from "react"
import { InitUser } from "src/models/UserStore"

interface IUseSkill {
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export const useSkill = ({ setUser, user }: IUseSkill) => {
  const [newSkill, setNewSkill] = useState("")
  const [modalVisible, setModalVisible] = useState(false)

  const onAddSkill = () => {
    // Todo: save to db
    if (user?.interests) {
      setUser({ interests: [...user.interests, newSkill] as any })
    } else {
      setUser({ interests: [newSkill] as any })
    }

    setNewSkill("")
  }

  const onDeletePress = (v: string) => {
    // Todo: delete from db
    console.log("delete", v)
    setUser({ interests: user?.interests.filter((i) => i !== v) as any })
  }

  return { newSkill, setNewSkill, modalVisible, setModalVisible, onAddSkill, onDeletePress }
}
