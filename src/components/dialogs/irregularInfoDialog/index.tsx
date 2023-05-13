import { Button, Dialog, DialogActions, DialogContent, Stack, Typography } from "@mui/material";
import { FC } from "react";
import IrregularEvent from "./irregularEvent";
import HorizontalLine from "../../horizontalLine";
import { NearMe } from "@mui/icons-material";

const IrregularInfoDialog: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  function handleNavigateClick() {
    window.open('https://www.google.co.th/maps/')
  }

  return <Dialog
    fullWidth
    maxWidth={'md'}
    open={open}
    PaperProps={{ sx: { background: '#090909' } }}>
    <DialogContent sx={{ padding: 0 }}>
      <Stack direction="column" justifyContent={"space-between"} maxHeight={"80%"}>
        <Stack direction="column" position={"relative"} padding="1rem">
          <Typography color="error" fontSize={"1.6rem"} fontWeight={"bold"}>ความผิดปกติ</Typography>
          <Typography color="white" fontSize={"0.9rem"} marginBottom={"2rem"}>อุทัยธานี เขต 1 หน่วย 3</Typography>
          <div style={{
            height: '80%',
            position: 'absolute',
            right: 0,
            top: 0
          }}>
            <img src="/assets/irregular-bg.png" height={"100%"} width={"auto"} alt="Irregular" />
          </div>
        </Stack>
        <HorizontalLine />
        <IrregularEvent />
      </Stack>
    </DialogContent>
    <DialogActions>
      <Stack direction="column" justifyContent="center" width={"100%"}>
        <Button
          variant="contained"
          color="error"
          size="large"
          sx={{ margin: "0 1.5rem", padding: "1rem 0.5rem" }}
          onClick={handleNavigateClick}>
          <NearMe sx={{ transform: 'scaleX(-1)', marginRight: '0.5rem' }} />
          พาฉันไปที่หน่วยเลือกตั้งนี้
        </Button>
        <Button
          variant="text"
          size="large"
          sx={{ margin: "0 1.5rem", padding: "1rem 0.5rem", color: 'white' }}
          onClick={onClose}>
          ปิดหน้าต่าง
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
}

export default IrregularInfoDialog
