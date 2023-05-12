import { ArrowForwardIos, Close } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import ReportInfoBar from "./reportInfoBar";
import VolunteerInfoBar from "./volunteerInfoBar";
import IrregularPanel from "../../panels/irregularPanel";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoDialog from "../../dialogs/irregularInfoDialog";

const LocationInfoForm: FC<{
  onRegister: () => void
}> = ({ onRegister }) => {
  const [irregularInfoOpen, setIrregularInfoOpen] = useState(false)

  function handleReportClick() {
    window.location.href = 'https://www.electionwatchth.org/public-election-report?unit=1234567890'
  }

  function handleIrregularPanelClick () {
    setIrregularInfoOpen(true)
  }

  return <Fragment>
    <IrregularInfoDialog open={irregularInfoOpen} onClose={() => setIrregularInfoOpen(false)}/>
    <Stack
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}>
      <Stack direction={"row"} justifyContent={"space-between"} padding={"1rem"}>
        <Stack direction={"column"} justifyContent={"space-between"} maxWidth={"60%"}>
          <Typography fontSize={"1.1rem"} sx={{ wordWrap: 'break-word' }}>อาคารประชุมใหญ่โรงเรียน xxx</Typography>
          <Stack direction={"row"} fontSize="0.9rem">
            <Typography color="#A4A4A4">
              อุทัยธานี เขต1 หน่วย 3
            </Typography>
            <Typography color="#0FAD77" marginLeft="1rem">
              เปิดอยู่
            </Typography>
          </Stack>

          <Stack direction="row" alignItems={"center"} fontSize={"1rem"} fontWeight={"light"}>
            <Typography>ดูบน Google map</Typography>
            <ArrowForwardIos sx={{ marginLeft: "0.25rem" }} />
          </Stack>
        </Stack>
        <IrregularPanel onClick={handleIrregularPanelClick}/>
      </Stack>
      <Stack direction="column" justifyContent="space-between" alignItems="start">
        <HorizontalLine />
        <VolunteerInfoBar onRegister={onRegister} />
        <HorizontalLine />
        <ReportInfoBar />
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
