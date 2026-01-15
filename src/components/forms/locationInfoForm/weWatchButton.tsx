import { Button } from "@mui/material";
import { FC } from "react";
import { useCurrentTime } from "@/src/store/time.store";
import { useLocationStore } from "@/src/store/location.store";
import { useUserProfileStore } from "@/src/store/userProfile.store";
import { buildWeWatchUrl, validateLocationData } from "@/src/utils/urlBuilder";
import { useSnackbar } from "notistack";

const WeWatchButton: FC<{
  onClick: () => void
}> = ({ onClick }) => {
  const currentTime = useCurrentTime()
  const { selectedLocation } = useLocationStore()
  const { profile } = useUserProfileStore()
  const { enqueueSnackbar } = useSnackbar()

  // Determine button text based on time
  const hour = currentTime.getHours()
  const isCountingTime = hour >= 17
  const buttonText = isCountingTime
    ? "รายงานสถานการณ์ (ช่วงนับคะแนน)"
    : "รายงานสถานการณ์ (ช่วงลงคะแนน)"

  const handleClick = () => {
    // Validate location data
    const validation = validateLocationData(selectedLocation)
    if (!validation.valid) {
      enqueueSnackbar(validation.message || "ข้อมูลหน่วยเลือกตั้งไม่ครบถ้วน", { variant: "error" })
      return
    }

    // Call parent onClick (will handle profile check and dialog)
    onClick()
  }

  return (
    <Button
      variant="contained"
      color="primary"
      fullWidth
      sx={{
        fontSize: "1.25rem",
        height: "52px",
        color: "white",
        background: "url('/assets/dot.png') #10C487",
        backgroundSize: "cover",
      }}
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  )
}

export default WeWatchButton
