import { Instance, SnapshotOut, types } from "mobx-state-tree"

const Material = types.model("Material", {
  fullName: types.string,
  imageUrl: types.string,
})

export interface InitMaterial extends Instance<typeof Material> {}

export const MaterialStoreModel = types
  .model("MaterialStore")
  .props({
    material: types.array(Material),
  })
  .actions((store) => ({
    setAuthTokenWithMaterial(materials: InitMaterial[]) {
      store.material = materials as any
    },
  }))

export interface MaterialStore extends Instance<typeof MaterialStoreModel> {}
export interface MaterialStoreSnapshot extends SnapshotOut<typeof MaterialStoreModel> {}
