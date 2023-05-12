import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const FirstAppInfo: FC = () => {
  return <Stack direction="column" margin="2rem 0" color={"white"} fontSize={"1rem"}>
    <Typography textAlign={"center"} fontSize="1.25rem" marginBottom={"1rem"}>
      ความหมายของสีหน่วยเลือกตั้ง
    </Typography>
    <Stack direction="row" alignItems="center" margin={"1rem 0"}>
      <div style={{ width: '18px', height: '18px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#10C487' }}></div>
      <Typography fontSize={"1rem"}>มีข้อมูลสถานการณ์ในหน่วย</Typography>
    </Stack>
    <Stack direction="row" alignItems="center" margin={"1rem 0 0 0"}>
      <div style={{ width: '18px', height: '18px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#C10000' }}></div>
      <Typography fontSize={"1rem"}>หน่วยที่ขาดการรายงาน</Typography>
    </Stack>
    <Typography color="#A4A4A4">
      ซึ่งทุกคนสามารถเข้าไปที่หน่วย และช่วยส่งรายงานได้ หน่วยสีแดงจะเปลี่ยนเป็นสีเขียวหลังจากที่การรายงาน
      ของท่านได้รับการยืนยันจากทีมงานแล้ว และจะถูกรีเช็ตกลับเป็นสีแดงอีกครั้งในทุกๆ 2-3 ชม.
    </Typography>
    <Stack direction="row" alignItems="center" margin={"1rem 0"}>
      <div style={{ width: '18px', height: '18px', margin: '0 0.5rem 0 1rem', borderRadius: '100%', background: '#A4A4A4' }}></div>
      <Typography fontSize={"1rem"}>หน่วยเลือกตั้งปิดเสร็จสมบูรณ์แล้ว</Typography>
    </Stack>
  </Stack>
}

export default FirstAppInfo
