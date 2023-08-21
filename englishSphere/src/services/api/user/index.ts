import api from ".."

const saveRefreshedFcmToken = async <T>(input: T) => {
  return await api.post("/user/app/refresh-fcm-token", { fcmToken: input })
}

export const UserApi = {
  saveRefreshedFcmToken,
}
