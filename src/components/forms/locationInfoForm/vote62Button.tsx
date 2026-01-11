import { Button, Tooltip } from "@mui/material";
import { FC } from "react";
import { useCurrentTime } from "@/src/store/time.store";
import { useLocationStore } from "@/src/store/location.store";
import { buildVote62Url, validateLocationData } from "@/src/utils/urlBuilder";
import { useSnackbar } from "notistack";

const Vote62Button: FC<{
  onClick: () => void;
}> = ({ onClick }) => {
  const currentTime = useCurrentTime();
  const { selectedLocation } = useLocationStore();
  const { enqueueSnackbar } = useSnackbar();

  // Check if Vote62 is enabled (16:30 onwards)
  const hour = currentTime.getHours();
  const minute = currentTime.getMinutes();
  const isEnabled = hour > 16 || (hour === 16 && minute >= 30);

  const handleClick = () => {
    if (!isEnabled) return;

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
      disabled={!isEnabled}
      sx={{
        fontSize: "1.25rem",
        height: "52px",
        color: "white",
        "&.Mui-disabled": {
          bgcolor: "rgba(164, 164, 164, 0.3)",
          color: "rgba(255, 255, 255, 0.5)",
        },
      }}
      onClick={handleClick}
    >
      นับคะแนน Vote62
    </Button>
  );

  // Wrap with tooltip when disabled
  if (!isEnabled) {
    return (
      <Tooltip title="เปิดใช้งานตั้งแต่ 16:30 น." placement="top">
        <span style={{ width: "100%" }}>{button}</span>
      </Tooltip>
    );
  }

  return button;
};

export default Vote62Button;
