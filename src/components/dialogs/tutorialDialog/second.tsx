import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const SecondTutorial: FC = () => {
  return <Stack direction="column" margin="2rem 0" color={"white"} fontSize={"1rem"}>
    <Typography fontSize="1.2rem" color={"primary"}>
      ฉันอยากไปสังเกตการณ์ <br />
      หน้าหน่วยเลือกตั้ง
    </Typography>
    <Typography>1. เลือกหน่วยเลือกตั้งที่คุณต้องการ</Typography>
    <Typography component={'span'}>2. คลิก <Typography component={'span'} color={"primary"}>“พาฉันไปที่นี่”</Typography>เพื่อนำทางไปยังหน่วยเลือกตั้ง</Typography>
    <Typography component={'span'}>3. เมื่อถึงหน่วยเลือกตั้ง เข้าเว็บนี้อีกครั้งและคลิก <Typography component={'span'} color={"primary"}>“รายงานสถานการณ์”</Typography></Typography>
  </Stack>
}

export default SecondTutorial
