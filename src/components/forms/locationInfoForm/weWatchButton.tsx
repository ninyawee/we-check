import { Button } from "@mui/material";
import { FC } from "react";
import { useCurrentTime } from "@/src/store/time.store";
import { useUnitDataStore } from "@/src/store/UnitData.store";
import { useUserProfileStore } from "@/src/store/userProfile.store";
import { buildWeWatchUrl, validateUnitData as validateUnitData } from "@/src/utils/urlBuilder";
import { useSnackbar } from "notistack";

const WeWatchButton: FC<{
  onClick: () => void
}> = ({ onClick }) => {
  const currentTime = useCurrentTime()
  const { selectedUnitData } = useUnitDataStore()
  const { profile } = useUserProfileStore()
  const { enqueueSnackbar } = useSnackbar()

  // Determine button state based on time
  const hour = currentTime.getHours()
  const isCountingTime = hour >= 17

  const handleClick = () => {
    // Validate location data
    const validation = validateUnitData(selectedUnitData)
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
      <span style={{ fontWeight: 600 }}>รายงานสถานการณ์</span>{' '}
    </Button>
  )
}

export default WeWatchButton
