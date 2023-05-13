import { Button, Dialog, DialogActions, DialogContent, Stack } from "@mui/material";
import { FC, useEffect, useState } from "react";
import FirstTutorial from "./first";
import SecondTutorial from "./second";
import ThirdTutorial from "./third";

const TutorialDialog: FC<{
  open: boolean,
  onClose: () => void
}> = ({ open, onClose }) => {
  const [tutorialState, setTutorialState] = useState<number>(0)

  function handlePrimaryButton() {
    if (tutorialState === 2) {
      onClose()
    } else {
      setTutorialState(tutorialState + 1)
    }
  }

  function handleSecondaryButton() {
    if (tutorialState === 0) {
      onClose()
    } else {
      setTutorialState(tutorialState - 1)
    }
  }

  useEffect(() => {
    if (open) {
      setTutorialState(0)
    }
  }, [open])

  return <Dialog
    fullWidth
    maxWidth={'md'}
    open={open}
    PaperProps={{ sx: { background: '#090909' } }}>
    <DialogContent>
      <Stack direction="column" minHeight="60vh" justifyContent={"space-between"}>
        <Stack direction="column">
          <Stack direction="row" justifyContent="center" alignItems="center">
            <div style={{
              height: '44px'
            }}>
              <img src="/assets/MainLogo.png" height="100%" width="auto" alt="WeCheck" />
            </div>
          </Stack>
          {tutorialState === 0 && <FirstTutorial />}
          {tutorialState === 1 && <SecondTutorial />}
          {tutorialState === 2 && <ThirdTutorial />}
        </Stack>


        <div style={{
          width: '100%'
        }}>
          <img src="/assets/tutorial-bg.png" width="100%" height="auto" alt="tutorial-bg" />
        </div>
      </Stack>
    </DialogContent>
    <DialogActions>
      <Stack direction="column" justifyContent="center" width={"100%"} padding="0 1rem">
        <Button fullWidth variant="contained" sx={{ color: 'white', height: '52px', fontSize: '1rem' }} onClick={handlePrimaryButton}>
          {tutorialState === 2 ? `ปิดหน้าต่าง` : 'ถัดไป'}
        </Button>
        <Button fullWidth variant="text" sx={{ color: 'white', height: '52px', fontSize: '1rem' }} onClick={handleSecondaryButton}>
          {tutorialState === 0 ? 'ปิดหน้าต่าง' : 'กลับ'}
        </Button>
      </Stack>
    </DialogActions>
  </Dialog>
}

export default TutorialDialog
