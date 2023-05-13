import { create } from "zustand";
import { ILocation } from "../interfaces/location.interface";

interface ILocationStore {
  selectedLocation: ILocation | null

  setSelectedLocation: (selectedLocation: ILocation) => void
}

export const useLocationStore = create<ILocationStore>((set, get) => ({
  selectedLocation: {
    unitId: 1,
    unitName: 'หอประชุม มหาวิทยาลัยศิลปากร ถนนมหาราช',
    provinceName: 'อุทัยธานี',
    divisionNumber: 1,
    districtName: 'พระบรมมหาราชวัง',
    subDistrictName: 'พระบรมมหาราชวัง',
    unitNumber: 1,

    color: 'green',
    isObservationValid: true,

    latitude: 123,
    longitude: 123,

    lastObservedTime: new Date(new Date().getTime() - (60 * 50 * 1000)),
    incidentCount: 1,
    incidentJson: 'A, B, C',
    googleMapUrl: 'https://www.google.co.th/maps'
  },

  setSelectedLocation(selectedLocation) {
    set({ selectedLocation })
  }
}))
