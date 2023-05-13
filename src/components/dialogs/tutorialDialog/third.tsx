import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const ThirdTutorial: FC = () => {
    return <Stack direction="column" margin="2rem 0" color={"white"} fontSize={"1rem"}>
        <Typography fontSize="1.2rem" color={"primary"}>
            ฉันไม่สะดวกไปหน่วยเลือกตั้ง <br />
            แต่อยากช่วย ทำไงดี?
        </Typography>
        <Typography>ทุกคนสามารถช่วยแชร์-พูดคุย เกี่ยวกับเว็บไซต์หรือ
            สถานการณ์บริเวณหน้าหน่วยเลือกตั้งที่รายงานบน
            เว็บไซต์ของเราได้</Typography>
    </Stack>
}

export default ThirdTutorial
