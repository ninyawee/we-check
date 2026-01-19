import { FC } from "react";
import { Stack, Button, Typography } from "@mui/material";
import { useLocationStore } from "@/src/store/location.store";
import { useUnitDataStore } from "@/src/store/UnitData.store";
import LocationHeader from "@/src/components/locationHeader";

const LocationUnitsList: FC = () => {
  const { selectedLocation } = useLocationStore();
  const { mockUnitKeys } = useLocationStore();
  const { setSelectedUnitData } = useUnitDataStore();

  if (!selectedLocation) return null;

  const keys = (selectedLocation.unitKeyList || "").split(",").map((k) => k.trim()).filter(Boolean);

  function handleSelectUnit(key: string) {
    if (!selectedLocation) return null;
    
    // Compose a minimal IUnitData object based on key and selectedLocation
    const unitNumber = Number(key) || 0;
    const unitData = {
      unitName: `หน่วย ${key}`,
      provinceName: selectedLocation.provinceName || "",
      divisionNumber: 0,
      districtName: selectedLocation.districtName || "",
      subDistrictName: selectedLocation.subDistrictName || "",
      unitNumber: unitNumber,

      status: "",
      isObservationValid: false,
      lastObservedTime: null,
      incidentCount: 0,
      incidentStr: "",
      vote62VolunteerCount: 0,
      year: undefined,
    } as any;

    setSelectedUnitData(unitData);
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

        <Stack direction="column" spacing={1} padding="1rem">
          <Typography fontSize="0.9rem" sx={{ color: "#A4A4A4" }}>
            หน่วยในตำแหน่งนี้
          </Typography>
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
          {keys.length === 0 && (
            <Typography fontSize="0.9rem" color="#777">
              ไม่มีข้อมูลหน่วย
            </Typography>
          )}
          <Stack direction="column" spacing={1} alignItems="stretch">
            {keys.map((k) => (
              <Button
                key={k}
                variant="outlined"
                size="small"
                fullWidth
                onClick={() => handleSelectUnit(k)}
                sx={{ justifyContent: "flex-start" }}
              >
                {k}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default LocationUnitsList;
