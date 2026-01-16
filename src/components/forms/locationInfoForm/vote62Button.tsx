import { Button, Tooltip } from "@mui/material";
import { FC } from "react";
import { useCurrentTime } from "@/src/store/time.store";
import { useLocationStore } from "@/src/store/location.store";
import { buildVote62Url, validateLocationData } from "@/src/utils/urlBuilder";
import { useSnackbar } from "notistack";
import { targetVote62VolunteerCount, VOTE62_SHOW_TIME } from "@/src/config/statusConfig";

const Vote62Button: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const currentTime = useCurrentTime();
  const { selectedLocation } = useLocationStore();
  const { enqueueSnackbar } = useSnackbar();

  const currentVote62Volunteers = selectedLocation?.vote62VolunteerCount ?? 0;
  const remainingVote62Volunteers = Math.max(
    0,
    targetVote62VolunteerCount - currentVote62Volunteers
  );

  // Check if Vote62 is enabled (configured threshold)
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();

  // Hide the button if current time is before the counting threshold
  const { hour: thresholdHour, minute: thresholdMinute } = VOTE62_SHOW_TIME;
  const isBeforeThreshold =
    hour < thresholdHour || (hour === thresholdHour && minute < thresholdMinute);
  if (isBeforeThreshold) return null;
  
  const handleClick = () => {
    
    // Validate location data
    const validation = validateLocationData(selectedLocation);
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
      <span style={{ marginLeft: "0.5rem" }}>{" "}</span>
      {remainingVote62Volunteers > 0 && (
        <span style={{ fontWeight: 300 }}>{`(ต้องการอีก ${remainingVote62Volunteers} คน)`}</span>
      )}
    </Button>
  );

  return button;
};

export default Vote62Button;
