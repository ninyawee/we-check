import { create } from "zustand";
import { IUnitData } from "../interfaces/UnitData.interface";

interface IUnitDataStore {
  selectedUnitData: IUnitData | null
  setSelectedUnitData: (selectedUnitData: IUnitData) => void
}

export const useUnitDataStore = create<IUnitDataStore>((set, get) => ({
  selectedUnitData: null,

  setSelectedUnitData(selectedUnitData) {
    console.log(selectedUnitData)
    set({ selectedUnitData })
  }
}))
