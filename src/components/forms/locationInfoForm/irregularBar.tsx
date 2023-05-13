import { ArrowForwardIos, Check, Warning } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment, useState } from "react";
import IrregularInfoDialog from "../../dialogs/irregularInfoDialog";
import { useLocationStore } from "@/src/store/location.store";
import HorizontalLine from "../../horizontalLine";

const IrregularBar: FC = () => {
  const { selectedLocation } = useLocationStore()
  const [showIrregularInfoDialog, setIrregularInfoDialog] = useState<boolean>(false)

  return <Fragment>
    <IrregularInfoDialog open={showIrregularInfoDialog} onClose={() => setIrregularInfoDialog(false)} />
    <HorizontalLine color={(selectedLocation?.incidentCount ?? 0) ? '#C10000' : undefined} />
    <Stack direction="row" width="100%" color="white" justifyContent={"space-between"} padding={"1rem"}>
      {(selectedLocation?.incidentCount ?? 0) > 0 ?
        < Stack direction="row">
          <Warning sx={{ color: '#F3DD13', marginRight: '0.5rem' }} />
          <Typography fontSize={"1rem"}>ความผิดปกติ: {(selectedLocation?.incidentCount ?? 0)}</Typography>
        </Stack>
        :
        <Stack direction="row">
          <Check color="primary" sx={{ marginRight: '0.5rem' }} />
          <Typography fontSize={"1rem"}>ความผิดปกติ: 0</Typography>
        </Stack>}
      <Stack direction="row" onClick={() => setIrregularInfoDialog(true)}>
        <Typography fontSize={"0.9rem"}>ดูเพิ่มเติม</Typography>
        <ArrowForwardIos />
      </Stack>
    </Stack>
    <HorizontalLine color={(selectedLocation?.incidentCount ?? 0) ? '#C10000' : undefined} />
  </Fragment >
}

export default IrregularBar
