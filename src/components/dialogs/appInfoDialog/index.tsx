import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import FirstAppInfo from "./first";
import SecondAppInfo from "./second";

const AppInfoDialog: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  const [infoState, setInfoState] = useState<number>(0)

  function handlePrimaryButton() {
    if (infoState === 1) {
      onClose()
    } else {
      setInfoState(infoState + 1)
    }
  }

  function handleSecondaryButton() {
    if (infoState === 0) {
      onClose()
    } else {
      setInfoState(infoState - 1)
    }
  }

  useEffect(() => {
    if (open) {
      setInfoState(0)
    }
  }, [open])

  return <Dialog
    fullWidth
    maxWidth={'md'}
    open={open}
    PaperProps={{ sx: { background: '#090909' } }}>
    <DialogContent sx={{ paddingBottom: 0 }}>
      <Stack direction="column" minHeight="60vh" justifyContent={"space-between"}>
        <Stack direction="column">
          <Stack direction="row" justifyContent="center" alignItems="center">
            <div style={{
              height: '44px'
            }}>
              <img src="/assets/MainLogo.png" height="100%" width="auto" alt="WeCheck" />
            </div>
          </Stack>
          {infoState === 0 && <FirstAppInfo />}
          {infoState === 1 && <SecondAppInfo />}
        </Stack>


        <div style={{
          width: '100%'
        }}>
          <img src="/assets/tutorial-bg.png" width="100%" height="auto" alt="tutorial-bg" />
        </div>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Stack direction="column" justifyContent="center" width={"100%"}>
        {infoState === 0 && <Button fullWidth variant="text" sx={{ color: 'white' }} onClick={handleSecondaryButton}>
          ปิดหน้าต่าง
        </Button>}
        <Button fullWidth variant="contained" sx={{ color: 'white' }} onClick={handlePrimaryButton}>
          {infoState === 1 ? `ปิดหน้าต่าง` : 'ถัดไป'}
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
}

export default AppInfoDialog
