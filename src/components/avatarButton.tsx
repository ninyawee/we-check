import { FC, useState, useEffect } from "react";
import { IconButton, Badge, Avatar } from "@mui/material";
import { PersonAdd, Person as PersonIcon } from "@mui/icons-material";
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
          <Avatar sx={{ width: 40, height: 40, bgcolor: "primary.main" }}>
            <PersonIcon sx={{ fontSize: 20, color: "common.white" }} />
          </Avatar>
        </Badge>
      </IconButton>

      <ProfileDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default AvatarButton;
