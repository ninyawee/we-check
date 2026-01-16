import {
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { FC, useState } from "react";
import WeWatchButton from "./weWatchButton";
import Vote62Button from "./vote62Button";
import RegistrationInfo from "@/src/components/dialogs/instructionDialog/registrationInfo";
import { GAME_URL } from "@/src/config/externalLinks";
import ProfileDialog from "../../dialogs/profileDialog";
import { useUserProfileStore } from "@/src/store/userProfile.store";
import { useLocationStore } from "@/src/store/location.store";
import { useCurrentTime } from "@/src/store/time.store";
import { buildWeWatchUrl, buildVote62Url } from "@/src/utils/urlBuilder";

type FormType = "wewatch" | "vote62";

const FormButtons: FC<{ isReportDay: boolean }> = ({ isReportDay }) => {
  const { hasProfile } = useUserProfileStore();
  const { selectedLocation } = useLocationStore();
  const currentTime = useCurrentTime();

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [registrationDialogOpen, setRegistrationDialogOpen] = useState(false);
  const [pendingFormType, setPendingFormType] = useState<FormType | null>(null);

  const openExternalForm = (formType: FormType, withProfile: boolean) => {
    if (!selectedLocation) return;

    // Get fresh profile from store to ensure we have the latest data
    const currentProfile = useUserProfileStore.getState().profile;

    let url: string;

    if (formType === "wewatch") {
      url = buildWeWatchUrl(
        withProfile ? currentProfile : null,
        selectedLocation,
        currentTime,
      );
    } else {
      // Vote62 doesn't use profile data
      url = buildVote62Url(selectedLocation);
    }

    window.open(url, "_blank");
  };

  const handleWeWatchClick = () => {
    if (hasProfile()) {
      // Has profile, open form directly with pre-filled data
      openExternalForm("wewatch", true);
    } else {
      // No profile, show confirmation dialog
      setPendingFormType("wewatch");
      setConfirmDialogOpen(true);
    }
  };

  const handleVote62Click = () => {
    // Vote62 doesn't use profile data, open directly
    openExternalForm("vote62", false);
  };

  const handleConfirmYes = () => {
    setConfirmDialogOpen(false);
    setProfileDialogOpen(true);
  };

  const handleConfirmNo = () => {
    setConfirmDialogOpen(false);
    if (pendingFormType) {
      openExternalForm(pendingFormType, false);
      setPendingFormType(null);
    }
  };

  const handleProfileSaved = () => {
    // After profile is saved, open the pending form with profile data
    if (pendingFormType) {
      openExternalForm(pendingFormType, true);
      setPendingFormType(null);
    }
  };

  return (
    <>
      <Stack spacing={1.5} padding="1rem 1.5rem 1.5rem 1.5rem">
        {isReportDay ? (
          <WeWatchButton onClick={handleWeWatchClick} />
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ fontSize: "1.1rem", height: "52px", color: "white" }}
              onClick={() => setRegistrationDialogOpen(true)}
            >
              <span style={{ fontWeight: 600 }}>สมัครเป็นอาสา</span>
            </Button>

            <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ fontSize: "1rem", height: "52px", mt: 1 }}
              onClick={() => window.open(GAME_URL, "_blank")}
            >
              <span style={{ fontWeight: 600 }}>เกมจับผิดหน่วยเลือกตั้ง</span>
              <span style={{ marginLeft: 8, fontWeight: 300 }}>(coming soon)</span>
            </Button>
          </>
        )}
        <Vote62Button onClick={handleVote62Click} />
      </Stack>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
      >
        <DialogTitle>
          <Stack direction="row" alignItems="center" spacing={1}>
            <PersonAdd color="primary" />
            <Typography fontSize="1.25rem" fontWeight="bold">
              บันทึกข้อมูลส่วนตัว
            </Typography>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Typography>
            คุณต้องการบันทึกข้อมูลส่วนตัวเพื่อช่วยกรอกแบบฟอร์มอัตโนมัติหรือไม่?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo}>ไม่</Button>
          <Button
            onClick={handleConfirmYes}
            variant="contained"
            color="primary"
          >
            ใช่
          </Button>
        </DialogActions>
      </Dialog>

      {/* Profile Dialog */}
      <ProfileDialog
        open={profileDialogOpen}
        onClose={() => {
          setProfileDialogOpen(false);
          setPendingFormType(null);
        }}
        onSaved={handleProfileSaved}
      />

      {/* Registration Info Dialog (match InstructionDialog styling) */}
      <Dialog
        fullWidth
        maxWidth="sm"
        open={registrationDialogOpen}
        onClose={() => setRegistrationDialogOpen(false)}
        PaperProps={{
          sx: { background: "#221e1f", m: 0, p: 0, width: "calc(100% - 1rem)" },
        }}
      >
        <DialogContent sx={{ overflowY: "visible" }}>
          <Stack direction="column" minHeight="30vh" justifyContent={"space-between"}>
            <Stack direction="column">
              <RegistrationInfo />
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
            <Button
              fullWidth
              variant="text"
              sx={{ color: "white", height: "52px", fontSize: "1rem" }}
              onClick={() => setRegistrationDialogOpen(false)}
            >
              กลับ
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FormButtons;
