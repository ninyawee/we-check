import { ArrowBackIos } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import RegisterDuringDayBar from "./registerDuringDayBar";
import RegisterCountingBar from "./registerCountingBar";
import HorizontalLine from "../../horizontalLine";

const VolunteerRegisterForm: FC<{
  onBackToLocation: () => void
}> = ({ onBackToLocation }) => {
  function handleRegisterDuringDayClick() {

  }

  function handleRegisterCountingTimeClick() {

  }

  return <Stack
    width={"100%"}
    direction={"column"}
    justifyContent={"space-between"}>
    <Stack direction="row" justifyContent={"space-between"} margin={"1rem"} onClick={onBackToLocation}>
      <Stack direction="row" alignItems={"center"}>
        <ArrowBackIos sx={{ fontSize: '1.2rem' }} />
        <Typography fontSize={"1.1rem"} sx={{ wordWrap: 'break-word' }}>อาคารประชุมใหญ่โรงเรียน xxx</Typography>
      </Stack>
    </Stack>

    <Stack direction="column" position="relative" margin="1rem 0 0 0" padding="0 1rem 1rem 1rem">
      <Typography fontSize="1.8rem" color="#0FAD77" fontWeight={"bold"}>เลือกช่วงเวลา</Typography>
      <Typography fontSize="1rem" fontWeight="bold">ที่ต้องการสมัครเป็นอาสา</Typography>
      <div style={{
        position: 'absolute',
        height: '100%',
        right: 0,
        bottom: 0,
        zIndex: 2,
      }}>
        <img src="/assets/captain.png" height="100%" width="auto" alt="Captain" />
      </div>
    </Stack>
    <HorizontalLine />
    <RegisterDuringDayBar/>
    <HorizontalLine />
    <RegisterCountingBar/>
    <HorizontalLine />
  </Stack>
}

export default VolunteerRegisterForm

