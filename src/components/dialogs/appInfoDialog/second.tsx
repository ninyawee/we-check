import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const SecondAppInfo: FC = () => {
  return <Stack direction="column" margin="2rem 0" color={"white"} fontSize={"1rem"}>
    <Typography fontSize="1.5rem" fontWeight={"bold"}>
      เราต้องการส่งเสริมให้แต่ละหน่วย
      มีการรายงานที่ครอบคลุม
    </Typography>
    <Typography fontSize="1.5rem" fontWeight={"bold"} color={"primary"}>
      อย่างน้อย 3 เวลา
    </Typography>
    <Typography fontSize="1.5rem" fontWeight={"bold"} color={"primary"}>
      (เช้า กลางวัน เย็น)
    </Typography>
    <Typography fontSize={"1rem"}>
      อย่างไรก็ตาม เราสนับสนุนให้ทุกคนเดินทางไปช่วย
      รายงานในหน่วยอื่น ๆ ให้ได้จํานวนมากที่สุด
      เพราะจะสามารถช่วยให้เราทุกคนมีข้อมูลที่ครอบคลุม
      หน่วยเลือกตั้งได้มากที่สุด
    </Typography>
  </Stack>
}

export default SecondAppInfo
