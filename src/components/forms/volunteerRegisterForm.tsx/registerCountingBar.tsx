import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const RegisterCountingBar: FC<{}> = () => {
  function handleRegister () {
    window.location.href = 'https://www.electionwatchth.org/public-election-report?unit=1234567890'
  }

  return <Stack direction="row" width={"100%"} justifyContent={"center"} padding={"0.75rem 0"} onClick={handleRegister}>
    <Stack direction="row" alignItems={"center"}>
      <Typography marginRight={"0.5rem"}>ช่วงเย็น / ช่วงนับคะแนน</Typography>
      <div style={{
        width: '32px'
      }}>
        <img src="/assets/vote62.png" width={"100%"} height={"auto"} alt="WeWatch" />
      </div>
    </Stack>
  </Stack>
}

export default RegisterCountingBar
