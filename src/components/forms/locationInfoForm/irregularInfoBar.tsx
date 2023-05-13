import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const IrregularInfoBar: FC = () => {
  return <Stack direction="row" fontSize={"0.5rem"} color="white" justifyContent={'center'} width={"100%"}>
    <Typography component={'span'} padding="0.5rem 1rem">
      การรายงาน
      <Typography component={'span'} color="error">&ensp;ไม่ครบถ้วน&ensp;</Typography>
      <Typography component={'span'} color="#A4A4A4">( ครั้งล่าสุด</Typography>
      <Typography component={'span'} fontWeight={"bold"} color="#A4A4A4">&ensp;10&ensp;</Typography>
      <Typography component={'span'} color="#A4A4A4">นาทีที่แล้ว )</Typography>
    </Typography>
  </Stack>
}

export default IrregularInfoBar
