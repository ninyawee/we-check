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
    label: "ต้องการการรายงานซ้ำ",
    small: "เราอยากให้ทุกหน่วยถูกรายงานซ้ำ ทุก ๆ 4 ชั่วโมง",
  },
  {
    key: "missing",
    color: STATUS_COLORS.missing,
    label: "ขาดการรายงาน",
  },
  {
    key: "counting",
    color: STATUS_COLORS.counting,
    label: "มีอาสาฯ รอนับคะแนนแล้ว",
  },
];

export default STATUS_LEGEND;
