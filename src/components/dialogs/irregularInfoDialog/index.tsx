import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import IrregularEvent from "./irregularEvent";
import HorizontalLine from "../../horizontalLine";
import { NearMe } from "@mui/icons-material";
import { useLocationStore } from "@/src/store/location.store";

const IrregularInfoDialog: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  const { selectedLocation } = useLocationStore()

  function handleNavigateClick() {
    window.open(selectedLocation?.googleMapUrl)
  }

  const incidentList = selectedLocation?.incidentJson?.split(',') ?? []

  return <Dialog
    fullWidth
    maxWidth={'md'}
    open={open}
    PaperProps={{ sx: { background: '#090909' } }}>
    <DialogContent sx={{ padding: 0, minHeight: '60vh' }}>
      <Stack direction="column" justifyContent={"space-between"}>
        <Stack direction="row" position={"relative"} padding="1rem" width={"100%"}>
          <Stack direction="column" position={"relative"} padding="1rem" maxWidth={"70%"}>
            <Typography color="error" fontSize={"1.6rem"} fontWeight={"bold"}>ความผิดปกติ</Typography>
            <Typography color="white" fontSize={"0.9rem"}>
              {`${selectedLocation?.provinceName} เขต ${selectedLocation?.divisionNumber} หน่วย ${selectedLocation?.unitNumber}`}</Typography>
          </Stack>
          <div style={{
            width: '8rem',
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)'
          }}>
            <img src="/assets/irregular-bg.png" height={"auto"} width={"100%"} alt="Irregular" />
          </div>
        </Stack>
        {incidentList.length === 0 ? <Fragment>
          <HorizontalLine />
          <Stack direction="column" padding={"1rem"} alignItems={"center"} justifyContent={"center"} height="40vh">
            <Typography color="white" fontSize={"1.2rem"}>ยังไม่มีรายงานความผิดปกติ</Typography>
          </Stack>
        </Fragment> : incidentList.map((incident, index) => <Fragment key={index}>
          <HorizontalLine />
          <IrregularEvent info={incident} />
        </Fragment>)}
      </Stack>
    </DialogContent>
    <DialogActions>
      <Stack direction="column" justifyContent="center" width={"100%"} padding="0rem 1rem">
        <Button
          variant="contained"
          color="error"
          sx={{ color: 'white', height: '52px', fontSize: '1rem' }}
          onClick={handleNavigateClick}>
          <NearMe sx={{ transform: 'scaleX(-1)', marginRight: '0.5rem' }} />
          พาฉันไปที่หน่วยเลือกตั้งนี้
        </Button>
        <Button
          variant="text"
          sx={{ color: 'white', height: '52px', fontSize: '1rem' }}
          onClick={onClose}>
          ปิดหน้าต่าง
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
}

export default IrregularInfoDialog
