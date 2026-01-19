
export interface IUnitData {
  unitName: string;
  provinceName: string;
  divisionNumber: number;
  districtName: string;
  subDistrictName: string;
  unitNumber: number;

  status: string;
  isObservationValid: boolean; // มีเอกสารครบไหม (ไม่เกี่ยวกับสี หน่วยจะเป็นสีเขียวแต่เอกสารไม่ครบก็ได้)
  lastObservedTime: string | null;
  incidentCount: number;
  incidentStr: string; // Example "07:45 | เปิดหน่วยเลือกตั้งช้า", "09:20 | จนท คุกคามผู้ใช้สิทธิ์"
  vote62VolunteerCount: number; // Number of vote62 volunteers ready to count votes at this location
  year?: number; // Optional election year (e.g., 66 for 2566)
}
