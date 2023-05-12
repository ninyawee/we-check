import { Button, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import VolunteerInfoBar from "./volunteerInfoBar";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoDialog from "../../dialogs/irregularInfoDialog";
import IrregularInfoBar from "./irregularInfoBar";
import IrregularBar from "./irregularBar";

const LocationInfoForm: FC= () => {
  const [irregularInfoOpen, setIrregularInfoOpen] = useState(false)

  function handleReportClick() {
    window.open('https://www.electionwatchth.org/public-election-report?unit=1234567890')
  }

  function handleNavigateClick() {
    window.open('https://www.google.co.th/maps/')
  }

  return <Fragment>
    <IrregularInfoDialog open={irregularInfoOpen} onClose={() => setIrregularInfoOpen(false)} />
    <Stack
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}>
      <Stack direction={"row"} justifyContent={"space-between"} padding={"1rem"} position={"relative"}>
        <Stack direction={"column"} justifyContent={"space-between"} maxWidth={"60%"}>
          <Typography fontSize={"1.1rem"} sx={{ wordWrap: 'break-word' }}>อาคารประชุมใหญ่โรงเรียน xxx</Typography>
          <Stack direction={"row"} fontSize="0.9rem" marginBottom={"1rem"}>
            <Typography color="#A4A4A4">
              อุทัยธานี เขต1 หน่วย 3
            </Typography>
          </Stack>
        </Stack>
        <div style={{
          height: '80%',
          position: 'absolute',
          right: 0,
          bottom: 0
        }}>
          <img src="/assets/location-bg.png" width="auto" height="100%" alt="location"/>
        </div>
      </Stack>
      <Stack direction="column" justifyContent="space-between" alignItems="start">
        <HorizontalLine />
        <IrregularInfoBar/>
        <HorizontalLine />
        <IrregularBar/>
        <HorizontalLine />
        <VolunteerInfoBar onNavigate={handleNavigateClick}/>
        <HorizontalLine />
      </Stack>

      <Button
        variant="contained"
        color="error"
        size="large"
        sx={{ margin: "1rem 1.5rem", padding: "1rem 0.5rem" }}
        onClick={handleReportClick}>
        รายงานสถานการณ์ทั่วไป
      </Button>
    </Stack>
  </Fragment>
}

export default LocationInfoForm
