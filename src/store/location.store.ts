import { create } from "zustand";
import { ILocation } from "../interfaces/location.interface";

interface ILocationStore {
  selectedLocation: ILocation | null
  
  setSelectedLocation: (selectedLocation: ILocation) => void
}

export const useLocationStore = create<ILocationStore>((set, get) => ({
  selectedLocation: null,

  setSelectedLocation(selectedLocation) {
    console.log(selectedLocation)
    set({ selectedLocation })
  }
}))
