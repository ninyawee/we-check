import { Box, Slide, Stack, Typography } from "@mui/material";
import { FC } from "react";

const IntroductionPanel: FC<{ active?: boolean }> = ({ active }) => {
  return <Slide in={active} direction="up" mountOnEnter unmountOnExit>
    <Box sx={{
      borderRadius: "5% 5% 0 0",
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      bottom: 0,
      zIndex: 2,
      width: '100%',
      background: '#090909',
    }}>
      <Stack direction="column" justifyContent="space-between" sx={{
        width: '100%',
        position: 'relative',
        padding: '18px 0',
        overflow: 'hidden',
        color: 'white'
      }}>
        <Stack direction="row" alignItems="center" margin="0.3rem 0">
          <div style={{ width: '24px', height: '24px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#10C487' }}></div>
          <Typography fontSize={"0.8rem"}>มีข้อมูลสถานการณ์ในหน่วย</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" margin="0.3rem 0">
          <div style={{ width: '24px', height: '24px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#C10000' }}></div>
          <Typography fontSize={"0.8rem"}>ยังไม่มีข้อมูลสถานการณ์ในหน่วย</Typography>
        </Stack>

        <Typography fontSize={"0.8rem"} color={"#A4A4A4"} margin={"0.5rem 1rem 0 1rem"}>คลิกหน่วยเลือกตั้งเพื่อดูรายละเอียด</Typography>
        <div style={{
          position: 'absolute',
          height: '80%',
          right: 0,
          bottom: 0,
          zIndex: 2,
        }}>
          <img src="/assets/captain.png" height="100%" width="auto" alt="Captain" />
        </div>
        <div style={{
          position: 'absolute',
          height: '80%',
          right: 0,
          bottom: 0,
          zIndex: 1,
        }}>
          <img src="/assets/captain-bg.png" height="100%" width="auto" alt="Captain" />
        </div>
      </Stack>
    </Box>
  </Slide>

}

export default IntroductionPanel
