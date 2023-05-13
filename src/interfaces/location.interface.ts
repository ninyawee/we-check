export interface ILocation {
  unitId: number
  unitName: string
  provinceName: string
  divisionNumber: number
  districtName: string
  subDistrictName: string
  unitNumber: number

  color: string //  "red", "green", "gray"
  isObservationValid: boolean // มีเอกสารครบไหม (ไม่เกี่ยวกับสี หน่วยจะเป็นสีเขียวแต่เอกสารไม่ครบก็ได้)

  latitude: number
  longitude: number

  lastObservedTime: Date | null
  incidentCount: number
  incidentJson: string // Example "เปิดหน่วยเลือกตั้งช้า", "จนท คุกคามผู้ใช้สิทธิ์"
  googleMapUrl: string
}

