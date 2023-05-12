import { ArrowForwardIos } from "@mui/icons-material";
import { Box, Slide, Stack, Typography, useMediaQuery } from "@mui/material";
import { FC, Fragment, useState } from "react";
import CoverageInfoDialog from "../dialogs/coverageInfoDialog";
import AppInfoDialog from "../dialogs/appInfoDialog";

const IntroductionPanel: FC<{ active?: boolean }> = ({ active }) => {
  const [coverageInfoDialogOpen, setCoverageInfoDialogOpen] = useState<boolean>(false)
  const [appInfoDialogOpen, setAppInfoDialogOpen] = useState<boolean>(false)
  const matchDesktop = useMediaQuery('(min-width:600px)')

  function viewCoverageInfoClick() {
    setCoverageInfoDialogOpen(true)
  }

  function viewMyLocationClick () {

  }

  return <Fragment>
    <AppInfoDialog open={appInfoDialogOpen} onClose={() => setAppInfoDialogOpen(false)}/>
    <CoverageInfoDialog open={coverageInfoDialogOpen} onClose={() => setCoverageInfoDialogOpen(false)} />
    {matchDesktop ?
      <></> :
      <Slide in={active} direction="up" mountOnEnter unmountOnExit>
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
          <div className="clickable" style={{
            width: '40px',
            position: 'absolute',
            top: '-3rem',
            right: '1rem'
          }} onClick={viewMyLocationClick}>
            <img src="/assets/my-location.png" width="100%" height="auto" alt="MyLocation" />
          </div>
          <Stack direction="column" justifyContent="space-between" sx={{
            width: '100%',
            position: 'relative',
            padding: '18px 0',
            overflow: 'hidden',
            color: 'white'
          }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" margin="0.3rem 0">
              <Stack direction="row" alignItems="center">
                <div style={{ width: '18px', height: '18px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#10C487' }}></div>
                <Typography fontSize={"0.85rem"}>มีข้อมูลสถานการณ์ในหน่วย</Typography>
              </Stack>
              {/* <Stack
                className="clickable"
                direction="row"
                alignItems={"center"}
                fontSize={"1rem"}
                marginRight={"1rem"}
                fontWeight={"light"}
                color="#0FB87F"
                onClick={viewCoverageInfoClick}>
                <Typography fontSize={"1rem"}>ดูภาพรวม</Typography>
                <ArrowForwardIos sx={{ marginLeft: "0.25rem" }} />
              </Stack> */}
            </Stack>
            <Stack direction="row" alignItems="center" margin="0.3rem 0">
              <div style={{ width: '18px', height: '18px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#C10000' }}></div>
              <Typography fontSize={"0.85rem"}>ยังไม่มีข้อมูลสถานการณ์ในหน่วย</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" margin="0.3rem 0">
              <div style={{ width: '18px', height: '18px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#A4A4A4' }}></div>
              <Typography fontSize={"0.85rem"}>หน่วยเลือกตั้งปิดเสร็จสมบูรณ์แล้ว</Typography>
            </Stack>

            <Typography fontSize={"1rem"} color={"#A4A4A4"} margin={"0.25rem 0 0.5rem 1rem"} sx={{ textDecoration: 'underline' }} onClick={() => setAppInfoDialogOpen(true)}>เรียนรู้เพิ่มเติม</Typography>
            <div style={{
              position: 'absolute',
              height: '70%',
              right: 0,
              bottom: 0,
              zIndex: 2,
            }}>
              <img src="/assets/captain.png" height="100%" width="auto" alt="Captain" />
            </div>
            <Stack direction="row" margin="1rem 0.75rem 0 0.75rem">
              <div style={{
                height: '20px',
                margin: '0 0.25rem'
              }}>
                <img src="/assets/MainLogo.png" height="100%" width="auto" alt="WeCheck" />
              </div>
              <div style={{
                height: '20px',
                margin: '0 0.25rem'
              }}>
                <img src="/assets/cleverse.png" height="100%" width="auto" alt="Cleverse" />
              </div>
            </Stack>
          </Stack>
        </Box>
      </Slide>
    }
  </Fragment>

}

export default IntroductionPanel
