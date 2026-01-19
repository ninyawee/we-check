import { FC } from "react";
import { Stack, Button, Typography } from "@mui/material";
import STATUS_COLORS from "@/src/config/statusColors";

type Props = {
  unitKey: string;
  statusKey?: string;
  onSelect?: (key: string) => void;
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

const UnitButton: FC<Props> = ({ unitKey, statusKey = "", onSelect }) => {
  const p = parseUnitKey(unitKey);
  const color = statusKey ? (STATUS_COLORS as any)[statusKey] : (STATUS_COLORS as any).missing;

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
        minHeight: 50,
        '&:hover': { borderColor: color || undefined },
      }}
    >
      <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography fontSize="1.1rem" sx={{ textAlign: "center" }}>{`หน่วย ${p.unitNumber}`}</Typography>
          <Typography component="span" fontSize="1.15rem" sx={{ textAlign: "left", fontWeight: 500, color: color || 'inherit' }}>{p.unitName}</Typography>
        </Stack>
      </Stack>
    </Button>
  );
};

export default UnitButton;
