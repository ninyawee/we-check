import { ArrowForwardIos, Close } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC } from "react";

const VolunteerInfoBar: FC<{}> = () => {
  return <Stack direction="row" width={"100%"} justifyContent={"space-between"} padding={"1rem"}>
    <Stack direction="row" alignItems={"center"}>
      <Close color="error" sx={{ marginRight: '0.5rem' }} />
      <div>ยังไม่มีอาสาสมัครประจำหน่วย</div>
    </Stack>
    <Stack direction="row" alignItems={"center"} color={"#0FAD77"}>
      <div>สมัคร</div>
      <ArrowForwardIos />
    </Stack>
  </Stack>
}

export default VolunteerInfoBar
