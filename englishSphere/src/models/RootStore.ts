import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserStoreModel } from "./UserStore"
import { MaterialStoreModel } from "./MaterialStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  userStore: types.optional(UserStoreModel, {}),
  materialStore: types.optional(MaterialStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
