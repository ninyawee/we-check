import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";

const HowToInfo: FC = () => {
  return (
    <Stack
      direction="column"
      margin="2rem 0 0 0"
      color={"white"}
      fontSize={"1rem"}
    >
      <Typography fontSize="32px" fontWeight="bold" color="#01c07f">
        HOW TO
      </Typography>
      <Typography fontSize="20px">
        สังเกตการณ์หน่วยเลือกตั้ง{" "}
        <Typography fontSize="20px" fontWeight="bold" component="span">
          (วันที่ 1 และ 8 กุมภา 69)
        </Typography>
      </Typography>
      <Box my={3}>sdfsdf</Box>
      <Typography fontWeight="bold">สีสถานะของหน่วยเลือกตั้ง</Typography>
      <Stack direction="column" spacing={1} mb={3} mt={1}>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "18px",
              height: "18px",
              margin: "0 0.5rem 0 0",
              borderRadius: "100%",
              background: "#10C487",
            }}
          />
          <Typography>ได้รับการรายงานแล้ว</Typography>
        </Stack>
        <Box>
          <Stack direction="row" alignItems="center">
            <div
              style={{
                width: "18px",
                height: "18px",
                margin: "0 0.5rem 0 0",
                borderRadius: "100%",
                background: "#016b05",
              }}
            />
            <Typography>ต้องการการรายงานซ้ำ</Typography>
          </Stack>
          <Typography color="#A4A4A4" fontSize={"0.875rem"}>
            เราอยากให้ทุกหน่วยถูกรายงานซ้ำ ทุก ๆ 4 ชั่วโมง
          </Typography>
        </Box>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "18px",
              height: "18px",
              margin: "0 0.5rem 0 0",
              borderRadius: "100%",
              background: "#FFF",
            }}
          ></div>
          <Typography>ขาดการรายงาน</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <div
            style={{
              width: "18px",
              height: "18px",
              margin: "0 0.5rem 0 0",
              borderRadius: "100%",
              background: "#ffcb4c",
            }}
          ></div>
          <Typography>มีอาสาฯ รอนับคะแนนแล้ว</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default HowToInfo;
