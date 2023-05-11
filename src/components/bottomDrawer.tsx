import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton } from "@mui/material";
import { FC, ReactNode } from "react";

const BottomDrawer: FC<{
  children: ReactNode,
  open: boolean,
  onClose?: () => void
}> = ({ children, open, onClose }) => {
  return <Drawer
    hideBackdrop
    open={open}
    anchor="bottom"
    PaperProps={{
      elevation: 0,
      sx: {
        background: 'transparent',
      }
    }}
    onClose={onClose}>
    <Box sx={{
      display: 'flex',
      justifyContent: 'end',
    }}>
      <IconButton onClick={onClose}>
        <Close />
      </IconButton>
    </Box>
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      background: '#090909',
      color: 'white',
      borderTopLeftRadius: '5%',
      borderTopRightRadius: '5%',
    }}>
      {children}
    </Box>
  </Drawer>
}

export default BottomDrawer
