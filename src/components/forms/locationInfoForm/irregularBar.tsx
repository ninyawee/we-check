import { ArrowForwardIos, Warning } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import IrregularInfoDialog from "../../dialogs/irregularInfoDialog";

const IrregularBar: FC = () => {
  const [showIrregularInfoDialog, setIrregularInfoDialog] = useState<boolean>(false)
  return <Fragment>
    <IrregularInfoDialog open={showIrregularInfoDialog} onClose={() => setIrregularInfoDialog(false)} />
    <Stack direction="row" width="100%" color="white" justifyContent={"space-between"} padding={"1rem"}>
      <Stack direction="row">
        <Warning sx={{ color: '#F3DD13', marginRight: '0.5rem' }} />
        <Typography fontSize={"0.9rem"}>ความผิดปกติ: 0</Typography>
      </Stack>
      <Stack direction="row" onClick={() => setIrregularInfoDialog(true)}>
        <Typography fontSize={"0.9rem"}>ดูเพิ่มเติม</Typography>
        <ArrowForwardIos />
      </Stack>
    </Stack>
  </Fragment>
}

export default IrregularBar
