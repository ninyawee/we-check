import { useUnitDataStore } from "@/src/store/UnitData.store";
import { useLocationStore } from "@/src/store/location.store";
import { ArrowForwardIos, Check, Warning } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { buildGoogleMapUrl } from "@/src/utils/urlBuilder";

const VolunteerInfoBar: FC = () => {
  const { selectedUnitData } = useUnitDataStore();
  const { selectedLocation } = useLocationStore();

  function handleNavigate() {
    if (selectedLocation) window.open(buildGoogleMapUrl(selectedLocation));
  }

  return (
    <Stack direction="row" width={"100%"} justifyContent={"space-between"} padding={"1rem"}>
      {selectedUnitData?.status === "reported" || selectedUnitData?.status === "counting" ? (
        <Stack direction="row" alignItems={"center"}>
          <Check color="primary" sx={{ marginRight: "0.5rem" }} />
          <Typography fontSize={"1rem"}>มีคนติดตามสถานการณ์ที่หน่วยแล้ว</Typography>
        </Stack>
      ) : (
        <Stack direction="row" alignItems={"center"}>
          <Warning sx={{ color: "#f35e13ff", marginRight: "0.5rem" }} />
          <Typography fontSize={"1rem"}>ต้องการคนสังเกตการณ์ที่นี่</Typography>
        </Stack>
      )}
      <Stack className="clickable" direction="row" alignItems={"center"} color={"#0FAD77"} onClick={handleNavigate}>
        <Typography fontSize={"1rem"}>พาฉันไปที่นี่</Typography>
        <ArrowForwardIos />
      </Stack>
    </Stack>
  );
};

export default VolunteerInfoBar;
