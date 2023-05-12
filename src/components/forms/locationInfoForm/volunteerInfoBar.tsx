import { ArrowForwardIos, Close } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const VolunteerInfoBar: FC<{
  onRegister: () => void
}> = ({ onRegister }) => {
  return <Stack direction="row" width={"100%"} justifyContent={"space-between"} padding={"1rem"}>
    <Stack direction="row" alignItems={"center"}>
      <Close color="error" sx={{ marginRight: '0.5rem' }} />
      <Typography>ยังไม่มีอาสาสมัครประจำหน่วย</Typography>
    </Stack>
    <Stack direction="row" alignItems={"center"} color={"#0FAD77"} onClick={onRegister}>
      <Typography>สมัคร</Typography>
      <ArrowForwardIos />
    </Stack>
  </Stack>
}

export default VolunteerInfoBar
