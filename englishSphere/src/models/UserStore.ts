import { loadString, saveString } from "src/utils/storage"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

const User = types.model("User", {
  fcmTokens: types.array(types.model({ token: types.string, device: types.string })),
  fullName: types.string,
  imageUrl: types.string,
  coverUrl: types.maybe(types.string),
  email: types.string,
  role: types.string,
  gender: types.string,
  age: types.maybe(types.number),
  country: types.model({ name: types.string, code: types.string }),
  currency: types.string,
  interests: types.array(types.string),
})

export interface InitUser extends Instance<typeof User> {}
export interface FcmToken {
  token: string
  device: string
}

export const UserStoreModel = types
  .model("UserStore")
  .props({
    authToken: types.maybe(types.string),
    user: types.maybe(User),
    lang: loadString("lang") || "en",
    badges: types.array(types.string),
    upVotes: 0,
    downVotes: 0,
  })
  .views((store) => ({
    get isAuthenticated() {
      return !!store.authToken
    },
  }))
  .actions((store) => ({
    setAuthTokenWithUser(value: string, user: InitUser) {
      store.authToken = value
      store.user = user
    },
    setUser(value: Partial<InitUser>) {
      store.user = { ...store.user, ...value } as any
    },
    setUserInterest(value: string) {
      if (store.user) {
        if (!store.user.interests.find((i) => i !== value)) {
          store.user.interests.push(value)
        }
      }
    },
    setUserFcmToken(value: FcmToken) {
      if (store.user) {
        store.user.fcmTokens = [
          ...store.user.fcmTokens.filter((v) => v.device !== value.device),
          value,
        ] as any
      }
    },
    logout() {
      store.authToken = undefined
      store.user = undefined
      store.lang = "en"
    },
    toggleLang() {
      const toggled = store.lang === "en" ? "bn" : "en"
      store.lang = toggled
      saveString("lang", toggled)
    },
    setBadges(value: string[]) {
      store.badges = value as any
    },
    increaseUpVotes() {
      if (store.upVotes) {
        store.upVotes = store.upVotes + 1
      } else {
        store.upVotes = 1
      }
    },
    increaseDownVotes() {
      if (store.downVotes) {
        store.downVotes = store.downVotes + 1
      } else {
        store.downVotes = 1
      }
    },
    setUpVotesDownVotes(upVotes: number, downVotes: number) {
      store.upVotes = upVotes
      store.downVotes = downVotes
    },
  }))

export interface UserStore extends Instance<typeof UserStoreModel> {}
export interface UserStoreSnapshot extends SnapshotOut<typeof UserStoreModel> {}
