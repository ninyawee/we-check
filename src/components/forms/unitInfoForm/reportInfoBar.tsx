import { FC } from "react"
import { Close } from "@mui/icons-material"
import { Stack } from "@mui/material"

const ReportInfoBar: FC<{}> = () => {
  return <Stack direction="row" width={"100%"} justifyContent={"space-between"} padding={"1rem"}>
    <Stack direction="row" alignItems={"center"}>
      <Close color="error" sx={{ marginRight: '0.5rem' }} />
      <div>ยังไม่มีรายงานสถานการณ์ทั่วไปของหน่วยนี้</div>
    </Stack>
  </Stack>
}

export default ReportInfoBar
