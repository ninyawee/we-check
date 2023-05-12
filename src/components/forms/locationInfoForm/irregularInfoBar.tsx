import { Stack, Typography } from "@mui/material";
import { FC, useLayoutEffect, useRef, useState } from "react";

const IrregularInfoBar: FC = () => {
  const intervalRef = useRef<any>()
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  useLayoutEffect(() => {
    intervalRef.current = setInterval(onTimeTick, 1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  })

  function onTimeTick () {
    setCurrentTime(new Date())
  }

  const currentTimeStr = currentTime.toLocaleTimeString()

  return <Stack direction="row" fontSize={"0.8rem"} color="white">
    <Typography padding="0.5rem 1rem" borderRight={"2px solid #272727"} minWidth={"8rem"}>เวลา {currentTimeStr.slice(0, currentTimeStr.length - 3)}</Typography>
    <Typography padding="0.5rem 1rem">ยังไม่มีรายงานความผิดปกติ</Typography>
  </Stack>
}

export default IrregularInfoBar
