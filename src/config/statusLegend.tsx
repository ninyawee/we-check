import STATUS_COLORS from "./statusColors";

const STATUS_LEGEND = [
  {
    key: "reported",
    color: STATUS_COLORS.reported,
    label: "ได้รับการรายงานแล้ว",
  },
  {
    key: "needsRepeat",
    color: STATUS_COLORS.needsRepeat,
    label: "ต้องได้รับการรายงานซ้ำ",
    small: "ทุกหน่วยต้องการการรายงานซ้ำทุก ๆ 4 ชั่วโมง",
  },
  {
    key: "counting",
    color: STATUS_COLORS.counting,
    label: "มีอาสาฯ รอนับคะแนนแล้ว",
    small: "มีอาสาสมัคร Vote62 พร้อมนับคะแนนแล้ว อย่างน้อย 1 คน",
  },
  {
    key: "missing",
    color: STATUS_COLORS.missing,
    label: "ขาดการรายงาน",
  }
];

export default STATUS_LEGEND;
