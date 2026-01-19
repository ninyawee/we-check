export interface ILocation {
  provinceName: string
  districtName: string
  subDistrictName: string
  locationName: string // all unit numbers in this location, comma-separated

  latitude: number
  longitude: number
  placeId: string

  locationGrade :string
  unitKeyList: string
  locationStatus: string // "reported" , "needsRepeat" , "missing" , "ended" , "counting"
  unitStatusList: string
}
