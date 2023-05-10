import { Close } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { FC } from "react";
import IrregularPanel from "../panels/irregularPanel";

const LocationInfoForm: FC<{}> = () => {
  return <Stack
    direction={"column"}
    justifyContent={"space-between"}>
    <Stack direction={"row"} justifyContent={"space-between"}>
      <Stack direction={"column"} justifyContent={"space-between"}>
        <div>
          อาคารประชุมใหญ่โรงเรียน xxxx
        </div>
        <Stack direction={"row"}>
          <div>
            อุทัยธานี เขต1 หน่วย 3
          </div>
          <div>
            เปิดอยู่
          </div>
        </Stack>

        <Stack>
          <div>ดูบน Google map</div>
        </Stack>
      </Stack>
      <IrregularPanel />
    </Stack>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Close color="error" />
    </Stack>
  </Stack>
}

export default LocationInfoForm
