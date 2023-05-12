import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const IrregularEvent: FC<{}> = () => {
  return <Stack direction="column" padding={"1rem"}>
    <Typography color="error" fontWeight={"bold"}>การคุกคาม (09:40)</Typography>
    <Typography color="white" fontSize={"0.8rem"}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</Typography>
  </Stack>
}

export default IrregularEvent
