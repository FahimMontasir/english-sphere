import { Instance, SnapshotOut, types } from "mobx-state-tree"

const Material = types.model("Material", {
  title: types.string,
  thumbnail: types.string,
})

export interface InitMaterial extends Instance<typeof Material> {}

export const MaterialStoreModel = types
  .model("MaterialStore")
  .props({
    materialSections: types.array(Material),
  })
  .actions((store) => ({
    setMaterialSections(materials: InitMaterial[]) {
      store.materialSections = materials as any
    },
  }))

export interface MaterialStore extends Instance<typeof MaterialStoreModel> {}
export interface MaterialStoreSnapshot extends SnapshotOut<typeof MaterialStoreModel> {}
