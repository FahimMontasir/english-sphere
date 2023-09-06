import { useEffect, useState } from "react"
import { InitUser } from "src/models/UserStore"

interface IUseAccountScreen {
  setUser: (value: Partial<InitUser>) => void
  user: InitUser | undefined
}

export const useAccountScreen = ({ user, setUser }: IUseAccountScreen) => {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (!user?.age) {
      setModalVisible(true)
    }
  }, [])

  const handleAgeAndGender = async (v: { age: number; gender: string }) => {
    // todo: update db
    setUser({ age: v.age, gender: v.gender })
  }

  return { modalVisible, setModalVisible, handleAgeAndGender }
}
