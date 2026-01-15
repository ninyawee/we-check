import { FC, useState, useEffect } from "react";
import { IconButton, Badge } from "@mui/material";
import { PersonAdd } from "@mui/icons-material";
import { Avatar } from "@avatune/react";
// @ts-ignore - avatune theme import
import pacovqzz from "@avatune/pacovqzz-theme/react";
import ProfileDialog from "./dialogs/profileDialog";
import { useUserProfileStore } from "@/src/store/userProfile.store";

const AvatarButton: FC = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { profile, loadProfile } = useUserProfileStore();

  // Load profile on mount
  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  // Check profile completeness reactively based on profile state
  const isProfileIncomplete =
    !profile ||
    !profile.fullname ||
    !profile.phone ||
    !profile.contract ||
    !profile.gender;

  // Use phone number as seed if available, otherwise use a generic seed
  const seed = profile?.phone || "guest-user";

  return (
    <>
      <IconButton
        onClick={() => setDialogOpen(true)}
        sx={{
          padding: 0,
          "&:hover": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Badge
          badgeContent={
            isProfileIncomplete ? <PersonAdd sx={{ fontSize: 14 }} /> : 0
          }
          color="secondary"
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Avatar theme={pacovqzz} seed={seed} size={40} />
        </Badge>
      </IconButton>

      <ProfileDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default AvatarButton;
