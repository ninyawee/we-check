import { Button, Tooltip } from "@mui/material";
import { FC } from "react";
import { useCurrentTime } from "@/src/store/time.store";
import { useUnitDataStore } from "@/src/store/UnitData.store";
import { validateUnitData } from "@/src/utils/urlBuilder";
import { useSnackbar } from "notistack";
import { targetVote62VolunteerCount } from "@/src/config/statusConfig";
import { getWebStateManager } from "@/src/utils/webState";

const Vote62Button: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const currentTime = useCurrentTime();
  const { selectedUnitData } = useUnitDataStore();
  const { enqueueSnackbar } = useSnackbar();

  const currentVote62Volunteers = selectedUnitData?.vote62VolunteerCount ?? 0;
  const remainingVote62Volunteers = Math.max(
    0,
    targetVote62VolunteerCount - currentVote62Volunteers
  );

  // Use WebState manager to check if Vote62 should be shown
  const webStateManager = getWebStateManager();
  const shouldShow = webStateManager.shouldShowVote62();
  
  if (!shouldShow) return null;
  
  const handleClick = () => {
    
    // Validate location data
    const validation = validateUnitData(selectedUnitData);
    if (!validation.valid) {
      enqueueSnackbar(validation.message || "ข้อมูลหน่วยเลือกตั้งไม่ครบถ้วน", {
        variant: "error",
      });
      return;
    }

    // Call parent onClick (will handle navigation directly for Vote62)
    onClick();
  };

  const button = (
    <Button
      variant="contained"
      color="secondary"
      fullWidth
      sx={{
      fontSize: "1.25rem",
      height: "52px",
      color: "white"
      }}
      onClick={handleClick}
    >
      <span style={{ fontWeight: 600 }}>นับคะแนน Vote62</span>
      {remainingVote62Volunteers > 0 ? (
      <span style={{ marginLeft: "0.5rem", fontWeight: 300 }}>{`(ต้องการอีก ${remainingVote62Volunteers} คน)`}</span>
      ) : null}
    </Button>
  );

  return button;
};

export default Vote62Button;
