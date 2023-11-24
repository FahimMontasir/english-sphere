import { formatQueryString } from "src/utils/formatQueryString"
import api from ".."
import { State } from "src/screens/LeaderBoardScreen/useLeaderBoard"
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

interface ISearchLead {
  data: {
    _id: string
    fullName: string
    imageUrl: string
    badges: string[]
    upVotes: number
    downVotes: number
    country: { name: string }
  }[]
  meta: { page: number; isLastPage: boolean; limit: number; total: number }
}

const getUpdatedUserInfo = async (): Promise<IGetUpdatedUserInfo> => {
  const res = await api.get("/user/app/updated-info")
  return res.data?.data
}

const getLeadSearch = async (query: State): Promise<ISearchLead> => {
  const queryStr = formatQueryString(query)
  const res = await api.get(`/user/app/lead-search?${queryStr}`)

  return res.data
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
  getUpdatedUserInfo,
  getLeadSearch,
  saveRefreshedFcmToken,
  updateUserInfo,
  addSkill,
  removeSkill,
  removeOtherDevice,
}
