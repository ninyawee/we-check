import { ArrowForwardIos, Close } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import { FC } from "react";
import ReportInfoBar from "./reportInfoBar";
import VolunteerInfoBar from "./volunteerInfoBar";
import IrregularPanel from "../../panels/irregularPanel";
import HorizontalLine from "../../horizontalLine";

const LocationInfoForm: FC<{}> = () => {
  return <Stack
    width={"100%"}
    direction={"column"}
    justifyContent={"space-between"}>
    <Stack direction={"row"} justifyContent={"space-between"} padding={"1rem"}>
      <Stack direction={"column"} justifyContent={"space-between"}>
        <div style={{ fontSize: "1.1rem" }}>
          อาคารประชุมใหญ่โรงเรียน xxxx
        </div>
        <Stack direction={"row"} fontSize="0.9rem">
        <div style={{ color: "#A4A4A4" }}>
            อุทัยธานี เขต1 หน่วย 3
          </div>
          <div style={{ color: "#0FAD77", marginLeft: '1rem' }}>
            เปิดอยู่
          </div>
        </Stack>

        <Stack direction="row" alignItems={"center"} fontSize={"1rem"} fontWeight={"light"}>
          <div>ดูบน Google map</div>
          <ArrowForwardIos sx={{ marginLeft: "0.25rem" }} />
        </Stack>
      </Stack>
      <IrregularPanel />
    </Stack>
    <Stack direction="column" justifyContent="space-between" alignItems="start">
      <HorizontalLine />
      <VolunteerInfoBar/>
      <HorizontalLine />
      <ReportInfoBar/>
      <HorizontalLine />
    </Stack>

    <Button variant="contained" color="error" size="large" sx={{ margin: "1rem 1.5rem", padding: "1rem 0.5rem" }}>
      รายงานสถานการณ์ทั่วไป
    </Button>
  </Stack>
}

export default LocationInfoForm
