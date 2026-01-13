import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import HowToInfo from "./howToInfo";
import RegistrationInfo from "./registrationInfo";

const OBSERVATION_URL =
  "https://drive.google.com/file/d/1Q9FcV6yUWNX7UA_4bZKnoTCAQPCgUImL/view?usp=sharing";

const InstructionDialog: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose }) => {
  const [infoState, setInfoState] = useState<number>(0);

  function handleObserverButton() {
    window.open(OBSERVATION_URL, "_blank");
  }

  function handlePrimaryButton() {
    if (infoState === 1) {
      onClose();
    } else {
      setInfoState(infoState + 1);
    }
  }

  function handleSecondaryButton() {
    if (infoState === 0) {
      onClose();
    } else {
      setInfoState(infoState - 1);
    }
  }

  useEffect(() => {
    if (open) {
      setInfoState(0);
    }
  }, [open]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      PaperProps={{
        sx: { background: "#090909", m: 0, p: 0, width: "calc(100% - 2rem)" },
      }}
    >
      <DialogContent sx={{ paddingBottom: 0 }}>
        <Stack
          direction="column"
          minHeight="30vh"
          justifyContent={"space-between"}
        >
          <Stack direction="column">
            {infoState === 0 && <HowToInfo />}
            {infoState === 1 && <RegistrationInfo />}
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Stack
          direction="column"
          justifyContent="center"
          width={"100%"}
          padding="0 1rem"
          spacing={2}
        >
          {infoState === 0 && (
            <Stack
              direction="row"
              justifyContent="space-between"
              width="100%"
              spacing={2}
            >
              <Button
                fullWidth
                variant="contained"
                sx={{ backgroundColor: "white" }}
                onClick={handleObserverButton}
              >
                คู่มือสังเกตการณ์
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  color: "white",
                  height: "52px",
                  fontSize: "1rem",
                  background: "url('/assets/dot.png') #10C487",
                  backgroundSize: "cover",
                }}
                onClick={handlePrimaryButton}
              >
                สมัครเป็นอาสา
              </Button>
            </Stack>
          )}
          <Button
            fullWidth
            variant="text"
            sx={{ color: "white", height: "52px", fontSize: "1rem" }}
            onClick={handleSecondaryButton}
          >
            {infoState === 0 ? "ปิดหน้าต่าง" : "กลับ"}
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export default InstructionDialog;
