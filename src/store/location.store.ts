import { create } from "zustand";
import { ILocation } from "../interfaces/location.interface";

interface ILocationStore {
  selectedLocation: ILocation | null

  setSelectedLocation: (selectedLocation: ILocation) => void
  // For dev/testing: inject or generate a mock unitKeyList on the selected location
  mockUnitKeys: (keys?: string) => void
}

export const useLocationStore = create<ILocationStore>((set, get) => ({
  selectedLocation: null,

  setSelectedLocation(selectedLocation) {
    console.log(selectedLocation)
    set({ selectedLocation })
  }
  ,
  mockUnitKeys(keys?: string) {
    const { selectedLocation } = get();

    const defaultKeys = keys ?? [1, 2, 3, 4, 5].map((n) => `${n}`).join(",");

    if (!selectedLocation) {
      // create a minimal mock ILocation object for testing
      const mockLocation: ILocation = {
        provinceName: "Mock Province",
        districtName: "Mock District",
        subDistrictName: "Mock Subdistrict",
        locationName: "Mock Location",
        latitude: 0,
        longitude: 0,
        placeId: "mock-place-id",
        locationGrade: "ตำบล",
        unitKeyList: defaultKeys,
        locationStatus: "missing",
        unitStatusList: "",
      };

      set({ selectedLocation: mockLocation });
      return;
    }

    // update existing selectedLocation with mocked unitKeyList
    set({ selectedLocation: { ...selectedLocation, unitKeyList: defaultKeys } });
  }
}))


