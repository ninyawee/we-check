import { Box, Stack } from "@mui/material";
import { FC } from "react";

const IrregularPanel: FC<{}> = () => {
  return <Box sx={{
    border: 'red 1px solid',
    borderRadius: '12px',
    padding: '12px',
    margin: '0 0 0 2rem'
  }}>
    <Stack direction={"column"} justifyContent="center" alignItems="center" textAlign={"center"}>
      <div>1</div>
      <div>ความผิดปกติ</div>
    </Stack>
  </Box>
}

export default IrregularPanel
