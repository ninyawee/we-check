import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

const IrregularPanel: FC<{ onClick: () => void }> = ({ onClick }) => {
  return <Stack
    direction="column"
    justifyContent={"center"}
    alignItems={"center"}
    onClick={onClick}>
    <Box sx={{
      border: 'red 1px solid',
      borderRadius: '12px',
      padding: '12px',
      fontSize: '0.8rem',
      margin: '0 0 0 1rem'
    }}>
      <Stack direction={"column"} justifyContent="center" alignItems="center" textAlign={"center"}>
        <Typography fontSize="1.5rem">1</Typography>
        <div>ความผิดปกติ</div>
      </Stack>
    </Box>
  </Stack>
}

export default IrregularPanel
