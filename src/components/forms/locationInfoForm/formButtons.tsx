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
import ProfileDialog from "../../dialogs/profileDialog";
import { useUserProfileStore } from "@/src/store/userProfile.store";
import { useLocationStore } from "@/src/store/location.store";
import { useCurrentTime } from "@/src/store/time.store";
import { buildWeWatchUrl, buildVote62Url } from "@/src/utils/urlBuilder";
import { REPORT_DATES } from "@/src/config/statusConfig";

type FormType = "wewatch" | "vote62";

const FormButtons: FC = () => {
  const { profile, hasProfile } = useUserProfileStore();
  const { selectedLocation } = useLocationStore();
  const currentTime = useCurrentTime();

  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const todayIso = `${currentTime.getFullYear()}-${pad(currentTime.getMonth() + 1)}-${pad(currentTime.getDate())}`;
  const isReportDay = REPORT_DATES.includes(todayIso);

  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
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
        {isReportDay && <WeWatchButton onClick={handleWeWatchClick} />}
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
    </>
  );
};

export default FormButtons;
