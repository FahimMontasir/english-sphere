import { UserStoreModel } from "./UserStore"

const data = {
  authToken: "lkdfjsdklfjsdlkfjsdkfjsdklfjsdlkfjsld",
  authEmail: "fahim@gmail.com",
  lang: null || "en",
}

const auth = UserStoreModel.create(data)

test("auth token format", () => {
  expect(auth.authToken).toBe("lkdfjsdklfjsdlkfjsdkfjsdklfjsdlkfjsld")
})
