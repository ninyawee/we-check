import { useLocationStore } from "@/src/store/location.store";
import { ArrowForwardIos, Check, Warning } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const VolunteerInfoBar: FC<{
  onNavigate: () => void
}> = ({ onNavigate }) => {
  const { selectedLocation } = useLocationStore()

  return <Stack direction="row" width={"100%"} justifyContent={"space-between"} padding={"1rem"}>
    {
      selectedLocation?.color === 'green' ?
        <Stack direction="row" alignItems={"center"}>
          <Check color="primary" sx={{ marginRight: '0.5rem' }} />
          <Typography fontSize={"0.9rem"}>มีคนติดตามสถานการณ์ที่หน่วยแล้ว</Typography>
        </Stack> :
        <Stack direction="row" alignItems={"center"}>
          <Warning sx={{ color: '#F3DD13', marginRight: '0.5rem' }} />
          <Typography fontSize={"0.9rem"}>ต้องการคนสังเกตการณ์ที่หน่วยนี้</Typography>
        </Stack>
    }
    <Stack direction="row" alignItems={"center"} color={"#0FAD77"} onClick={onNavigate}>
      <Typography fontSize={"0.9rem"}>พาฉันไปที่นี่</Typography>
      <ArrowForwardIos />
    </Stack>
  </Stack>
}

export default VolunteerInfoBar
