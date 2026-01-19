import { FC } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useLocationStore } from "@/src/store/location.store";
import { useUnitDataStore } from "@/src/store/UnitData.store";
import LocationHeader from "@/src/components/locationHeader";
import HorizontalLine from "./horizontalLine";
import ReportLocationLink from "@/src/components/reportLocationLink";
import STATUS_COLORS from "@/src/config/statusColors";
import VolunteerInfoBar from "./forms/unitInfoForm/volunteerInfoBar";
import { buildGoogleMapUrl } from "../utils/urlBuilder";

const LocationUnitsList: FC = () => {
  const { selectedLocation } = useLocationStore();
  const { mockUnitKeys } = useLocationStore();
  const { setSelectedUnitData } = useUnitDataStore();
  const { setOpenUnitInfoForm } = useUnitDataStore();

  if (!selectedLocation) return null;

  const keys = (selectedLocation.unitKeyList || "").split(",").map((k) => k.trim()).filter(Boolean);
  const statuses = (selectedLocation.unitStatusList || "").split(",").map((s) => s.trim()).filter(Boolean);
  const missingCount = statuses.filter((s) => s === "missing").length;
  
  // Parse a unit key of the form:
  // province_divisionNumber_district_subDistrict_unitNumber_unitName
  // unitName may contain additional underscores, so join the rest.
  function parseUnitKey(key: string) {
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

    // Fallback: try to extract trailing number and name
    const maybeNumber = parts.length >= 2 ? Number(parts[parts.length - 2]) : NaN;
    const unitNumber = Number.isFinite(maybeNumber) ? maybeNumber : 0;
    const unitName = parts.length ? parts[parts.length - 1] : key;
    return { provinceName: parts[0] || "", divisionNumber: 0, districtName: "", subDistrictName: "", unitNumber, unitName };
  }

  function handleSelectUnit(key: string) {
    if (!selectedLocation) return null;

    const parsed = parseUnitKey(key);

    const unitData = {
      unitName: parsed.unitName || `หน่วย ${key}`,
      provinceName: parsed.provinceName || selectedLocation.provinceName || "",
      divisionNumber: parsed.divisionNumber || 0,
      districtName: parsed.districtName || selectedLocation.districtName || "",
      subDistrictName: parsed.subDistrictName || selectedLocation.subDistrictName || "",
      unitNumber: parsed.unitNumber || 0,

      status: "",
      isObservationValid: false,
      lastObservedTime: null,
      incidentCount: 0,
      incidentStr: "",
      vote62VolunteerCount: 0,
      year: undefined,
    } as any;

    setSelectedUnitData(unitData);
    setOpenUnitInfoForm(true);
  }

    function handleNavigateClick(): void {
        if (selectedLocation)
                window.open(buildGoogleMapUrl(selectedLocation));
    }

  return (
    <>
      <Stack width={"100%"} direction={"column"} justifyContent={"space-between"}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          padding={"1rem"}
          position={"relative"}
        >
          <LocationHeader data={selectedLocation} locationGrade={selectedLocation.locationGrade} />
        </Stack>
        <HorizontalLine />
          {<VolunteerInfoBar onNavigate={handleNavigateClick} />}
        <HorizontalLine />

        <Stack direction="column" spacing={1} padding="1rem">
          {process.env.NODE_ENV !== "production" && (
            <Button
              variant="text"
              size="small"
              onClick={() => mockUnitKeys()}
              sx={{ justifyContent: "flex-start", paddingLeft: 0 }}
            >
              Mock units for testing
            </Button>
          )}
          <Stack direction="column" spacing={1} alignItems="stretch">
            {keys.map((k, idx) => {
              const p = parseUnitKey(k);
              const rightLabel = `เขตเลือกตั้ง ${p.divisionNumber}`;
              const statusKey = statuses[idx] || "";
              const color = statusKey ? (STATUS_COLORS as any)[statusKey] : STATUS_COLORS.missing;
              return (
                <Button
                  key={k}
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={() => handleSelectUnit(k)}
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
                    <Typography fontSize="0.95rem" sx={{ color: "#8c8fa1ff" }}>{rightLabel}</Typography>
                  </Stack>
                </Button>
              );
            })}
          </Stack>
          <HorizontalLine />
          <ReportLocationLink />
        </Stack>
      </Stack>
    </>
  );
};

export default LocationUnitsList;
