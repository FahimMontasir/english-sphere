import api from ".."
export interface IUser {
  fcmTokens: { token: string; device: string }
  fullName: string
  imageUrl: string
  coverUrl?: string
  interests: string[]
  badges?: "silver" | "gold" | "diamond" | "guard"[]
  upVotes?: number
  downVotes?: number
  isBanned?: boolean
  age?: number
  gender: string
}

export interface IMaterialSection {
  title: string
  thumbnail: string
}

interface IGetUpdatedUserInfo {
  userData: IUser
  materialSections: IMaterialSection[]
  message: string
  statusCode: number
  success: boolean
}

const getUpdatedUserInfo = async (): Promise<IGetUpdatedUserInfo> => {
  const res = await api.get("/user/app/updated-info")
  return res.data?.data
}

const saveRefreshedFcmToken = async <T>(input: T) => {
  return await api.post("/user/app/refresh-fcm-token", { fcmToken: input })
}

const addSkill = async (input: string) => {
  return await api.post("/user/app/add-skill", { value: input })
}

const updateUserInfo = async (input: Partial<IUser>) => {
  return await api.patch("/user/app/update-user", input)
}

const removeSkill = async (input: string) => {
  return await api.delete("/user/app/remove-skill", { data: { value: input } })
}

const removeOtherDevice = async (input: string) => {
  return await api.delete("/user/app/remove-other-user", { data: { device: input } })
}

export const UserApi = {
  saveRefreshedFcmToken,
  getUpdatedUserInfo,
  updateUserInfo,
  addSkill,
  removeSkill,
  removeOtherDevice,
}
