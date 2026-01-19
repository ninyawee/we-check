import { FC } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { Check, Warning, ArrowForwardIos } from "@mui/icons-material";
import STATUS_COLORS from "@/src/config/statusColors";

type Props = {
  unitKey: string;
  statusKey?: string;
  onSelect?: (key: string) => void;
  showIosArrow?: boolean;
};

const parseUnitKey = (key: string) => {
  const parts = key.split("_");
  if (parts.length >= 6) {
    const provinceName = parts[0] || "";
    const divisionNumber = Number(parts[1]) || 0;
    const districtName = parts[2] || "";
    const subDistrictName = parts[3] || "";
    const unitNumber = Number(parts[4]) || 0;
    const unitName = parts.slice(5).join("_") || "";
    return { provinceName, divisionNumber, districtName, subDistrictName, unitNumber, unitName };
  }

  const maybeNumber = parts.length >= 2 ? Number(parts[parts.length - 2]) : NaN;
  const unitNumber = Number.isFinite(maybeNumber) ? maybeNumber : 0;
  const unitName = parts.length ? parts[parts.length - 1] : key;
  return { provinceName: parts[0] || "", divisionNumber: 0, districtName: "", subDistrictName: "", unitNumber, unitName };
};

const UnitButton: FC<Props> = ({ unitKey, statusKey = "", onSelect}) => {
  const p = parseUnitKey(unitKey);
  if (statusKey == "")
    statusKey = "missing";

  const color = statusKey ? (STATUS_COLORS as any)[statusKey] : (STATUS_COLORS as any).missing;
  const showWarning = statusKey === "missing" || statusKey === "needsRepeat";
  const showCheck = statusKey === "counting" || statusKey === "reported";

  return (
    <Button
      variant="outlined"
      size="large"
      fullWidth
      onClick={() => onSelect && onSelect(unitKey)}
      sx={{
        justifyContent: "space-between",
        textTransform: "none",
        borderColor: color || undefined,
        color: "inherit",
        py: 1.5,
        px: 2,
        minHeight: 35,
        '&:hover': { borderColor: color || undefined },
      }}
    >
      <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={0.75}>
          {showWarning && <Warning sx={{ color: "#f35e13ff", marginRight: "0.25rem", maxWidth: "1rem" }} />}
          {showCheck && <Check sx={{ color: color || undefined, marginRight: "0.25rem", maxWidth: "1rem" }} />}
          <Typography fontSize="0.75rem" color="#A4A4A4" sx={{ textAlign: "center" }}>{`หน่วย ${p.unitNumber}`}</Typography>
          <Typography component="span" fontSize="0.9rem" sx={{ textAlign: "left", fontWeight: 500, color: "#ffffffff"}}>{p.unitName}</Typography>
        </Stack>
          <ArrowForwardIos sx={{ verticalAlign: "middle", fontSize: "1rem", color: color || 'inherit' }} />
      </Stack>
    </Button>
  );
};

export default UnitButton;
