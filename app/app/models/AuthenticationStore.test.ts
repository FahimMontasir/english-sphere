import { AuthenticationStoreModel } from "./AuthenticationStore"

const data = {
  authToken: "lkdfjsdklfjsdlkfjsdkfjsdklfjsdlkfjsld",
  authEmail: "fahim@gmail.com",
  lang: null || "en",
}

const auth = AuthenticationStoreModel.create(data)

test("auth token format", () => {
  expect(auth.authToken).toBe("lkdfjsdklfjsdlkfjsdkfjsdklfjsdlkfjsld")
})
