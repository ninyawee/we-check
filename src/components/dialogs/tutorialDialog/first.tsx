import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const FirstTutorial: FC = () => {
    return <Stack direction="column" margin="2rem 0" color={"white"} fontSize={"1rem"}>
        <Typography component={'span'}>
            รายงานสถานการณ์ของหน่วยตั้งกว่า <Typography component={'span'} fontSize="1.2rem" color={"primary"}>95,000</Typography> จุด
            ทั่วประเทศ และ <Typography component={'span'} fontSize="1.2rem" color={"primary"}>ทุกคนสามารถมีส่วนร่วมได้</Typography>
        </Typography>
        <Typography fontSize="1.2rem" color={"primary"} marginTop={"2rem"}>เว็บไซต์นี้ทำอะไรได้บ้าง?</Typography>
        <Typography>• ดูภาพรวมสถานการณ์หน่วยเลือกตั้งทั่วประเทศ</Typography>
        <Typography>• ตรวจเช็คความผิดปกติของหน่วยเลือกตั้งแต่ละจุด</Typography>
        <Typography>• นำทางคุณไปยังหน่วยเลือกตั้งที่คุณสนใจสังเกตการณ์และรายงานสถานการณ์</Typography>
    </Stack>
}

export default FirstTutorial
