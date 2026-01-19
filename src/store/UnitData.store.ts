import { create } from "zustand";
import { IUnitData } from "../interfaces/UnitData.interface";

interface IUnitDataStore {
  selectedUnitData: IUnitData | null
  setSelectedUnitData: (selectedUnitData: IUnitData | null) => void
  // controls whether the UnitInfoForm is shown inside the location panel
  openUnitInfoForm: boolean
  setOpenUnitInfoForm: (open: boolean) => void
}

export const useUnitDataStore = create<IUnitDataStore>((set, get) => ({
  selectedUnitData: null,

  openUnitInfoForm: false,

  setSelectedUnitData(selectedUnitData) {
    console.log(selectedUnitData)
    set({ selectedUnitData })
  }
  ,
  setOpenUnitInfoForm(open: boolean) {
    set({ openUnitInfoForm: open })
  }
}))
