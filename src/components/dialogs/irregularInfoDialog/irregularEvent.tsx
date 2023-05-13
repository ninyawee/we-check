import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const IrregularEvent: FC<{ info: string }> = ({ info }) => {
  return <Stack direction="column" padding={"1rem"}>
    <Typography color="white" fontSize={"0.8rem"}>{ info }</Typography>
  </Stack>
}

export default IrregularEvent
