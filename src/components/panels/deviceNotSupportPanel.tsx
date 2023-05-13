import { useLayoutStore } from "@/src/store/layout.store";
import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

const DeviceNotSupportPanel: FC = () => {
  const { setIsDesktopConfirm } = useLayoutStore()
  return <Stack direction={"column"} width={"100%"} height="100vh" justifyContent={"center"} position={"fixed"} top={0} left={0} zIndex={10} sx={{ background: '#090909' }}>
    <Stack direction="row" justifyContent={"center"}>
      <div style={{
        height: '64px'
      }}>
        <img src="/assets/MainLogo.png" height="100%" width="auto" alt="WeCheck" />
      </div>
    </Stack>

    <Stack direction="column" alignItems={"center"} marginTop={"6rem"}>
      <Typography fontSize={"2rem"} fontWeight={"bold"} color={"white"}>We Check 66</Typography>
      <Typography fontSize={"2rem"} fontWeight={"bold"} color={"primary"}>สามารถใช้งานได้บนบราวเซอร์ของโทรศัพท์</Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{
          fontSize: '1.5rem',
          marginTop: '1.5rem'
        }} onClick={() => setIsDesktopConfirm(true)}>เข้าใช้งานในเวอร์ชั่นโทรศัพท์</Button>
    </Stack>

    <Stack direction="column" alignItems={"center"} position="fixed" bottom={"1rem"} left={"50%"} sx={{ transform: 'translate(-50%, -50%)' }}>
      <Typography color={"#A4A4A4"} marginBottom={"1rem"}>สนับสนุนโดย</Typography>
      <div style={{
        height: '44px'
      }}>
        <img src="/assets/cleverse.png" height="100%" width="auto" alt="Cleverse" />
      </div>
    </Stack>
    
    <div style={{
      height: '10rem',
      position: 'fixed',
      bottom: 0,
      left: 0,
    }}>
      <img src="/assets/location-bg.png" height="100%" width="auto" alt="Leftdecoration"/>
    </div>
    <div style={{
      height: '10rem',
      position: 'fixed',
      bottom: 0,
      right: 0,
    }}>
      <img src="/assets/captain.png" height="100%" width="auto" alt="Rightdecoration"/>
    </div>
  </Stack>
}

export default DeviceNotSupportPanel
