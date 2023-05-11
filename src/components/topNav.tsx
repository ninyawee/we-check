import { AppBar, Box } from "@mui/material";
import { FC } from "react";

const TopNav: FC = () => {
  return <AppBar position="absolute" color="primary">
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      padding: '14px 0'
    }}>
      <img src="/assets/MainLogo.png" width="auto" height="38px" alt="WeCheckLogo"/> 
    </Box>
  </AppBar>
}

export default TopNav
