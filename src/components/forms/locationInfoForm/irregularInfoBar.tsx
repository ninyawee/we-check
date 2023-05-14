import { useLocationStore } from "@/src/store/location.store";
import { Stack, Typography } from "@mui/material";
import { FC, Fragment, useLayoutEffect, useRef, useState } from "react";

const IrregularInfoBar: FC = () => {
  const { selectedLocation } = useLocationStore()
  const timePassIntervalRef = useRef<any>()
  const [timePassText, setTimePassText] = useState<string[]>([])

  useLayoutEffect(() => {
    timePassIntervalRef.current = setInterval(updateTimePass, 1000)
    return () => {
      clearInterval(timePassIntervalRef.current)
    }

  }, [])

  function updateTimePass() {
    const currentTime = new Date()
    const lastObservedDate = selectedLocation?.lastObservedTime ? new Date(selectedLocation?.lastObservedTime) : new Date()
    const timeDiffMs = currentTime.getTime() - lastObservedDate.getTime()
    const timeDiffMinute = Math.trunc(timeDiffMs / (60 * 1000))
    if (timeDiffMinute >= 60) {
      setTimePassText([Math.trunc(timeDiffMinute / 60).toString(), "ชั่วโมงที่แล้ว"])
    } else {
      const m = timeDiffMinute >= 1 ? timeDiffMinute : 1
      setTimePassText([m.toString(), 'นาทีที่แล้ว'])
    }
  }

  return <Stack direction="row" fontSize={"0.5rem"} color="white" justifyContent={'center'} width={"100%"}>
    <Typography component={'span'} padding="0.5rem 1rem">
      การรายงาน
      {selectedLocation?.isObservationValid ? <Typography component={'span'} color="primary">&ensp;ครบถ้วน&ensp;</Typography>
        : <Typography component={'span'} color="error">&ensp;ไม่ครบถ้วน&ensp;</Typography>}
      {timePassText?.length === 0 ?
        <Typography component={'span'} color="#A4A4A4">( กำลังโหลดข้อมูล ... )</Typography> :
        <Fragment>
          {selectedLocation?.lastObservedTime ? <>
            <Typography component={'span'} color="#A4A4A4">( ครั้งล่าสุด</Typography>
            <Typography component={'span'} fontWeight={"bold"} color="#A4A4A4">&ensp;{timePassText?.[0]}&ensp;</Typography>
            <Typography component={'span'} color="#A4A4A4">{timePassText?.[1]} )</Typography>
          </> : <Typography component={'span'} color="#A4A4A4">( ยังไม่มีการรายงาน )</Typography>
          }
        </Fragment>
      }
    </Typography>
  </Stack>
}

export default IrregularInfoBar
