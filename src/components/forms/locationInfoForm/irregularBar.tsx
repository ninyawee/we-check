import { ArrowForwardIos, Warning } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const IrregularBar: FC = () => {
  return <Stack direction="row" fontSize={"0.8rem"} width="100%" color="white" justifyContent={"space-between"} padding={"1rem"}>
    <Stack direction="row">
      <Warning sx={{ color: '#F3DD13', marginRight: '0.5rem' }} />
      <Typography>ความผิดปกติ: 0</Typography>
    </Stack>
    <Stack direction="row">
      <Typography>ดูเพิ่มเติม</Typography>
      <ArrowForwardIos />
    </Stack>
  </Stack>
}

export default IrregularBar
