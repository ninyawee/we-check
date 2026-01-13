import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import { FC } from "react";

const REPORTER_REGISTRATION_URL = "https://forms.gle/LNLBcaCvbK9bZtSN8";
const COUNT_VOTE_REGISTRATION_URL = "https://www.vote62.com";

const RegistrationInfo: FC = () => {
  const { palette } = useTheme();

  const handleRegisterReporter = () => {
    window.open(REPORTER_REGISTRATION_URL, "_blank");
  };

  const handleRegisterCountVote = () => {
    window.open(COUNT_VOTE_REGISTRATION_URL, "_blank");
  };

  return (
    <Stack direction="column" mt="2rem" color="white">
      <Card
        sx={{
          padding: 1,
          borderRadius: "8px",
          minWidth: "318px",
          overflow: "visible",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: palette.primary.main,
              width: "40px",
              height: "40px",
            }}
          >
            A
          </Box>
          <Typography>
            ช่วยรายงาน
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              กระบวนการเลือกตั้ง
            </Typography>
            และ
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              เหตุการณ์
            </Typography>
            <Typography
              component="span"
              sx={{ fontWeight: "bold", color: "#ff5757" }}
            >
              ผิดปกติ
            </Typography>
            ในหน่วยเลือกตั้ง
          </Typography>
        </Stack>
        <Box
          borderTop="2px dotted #cccccc"
          sx={{ my: 1.5, position: "relative" }}
        >
          <Box
            sx={{
              top: "-20px",
              right: "-16px",
              position: "absolute",
              backgroundColor: "#ffcb4c",
              width: "fit-content",
              padding: "4px 20px",
              borderRadius: "16px",
            }}
          >
            <Typography fontWeight="bold">ใช้เวลาไม่เกิน 5 นาที</Typography>
          </Box>
        </Box>
        <Box>
          <Stack direction="column">
            <Typography component="div">
              รายงาน
              <Typography component="span" fontWeight="bold">
                ครั้งเดียว
              </Typography>
              <br />
              หรือ{" "}
              <Typography component="span" fontWeight="bold">
                ปักหลัก
              </Typography>
              ที่หน่วยทั้งวันก็ได้
            </Typography>
            <Typography component="div">
              รายงานจาก
              <Typography component="span" fontWeight="bold">
                หน่วยเดียว
              </Typography>{" "}
              หรือเดินทางไป
              <Typography component="span" fontWeight="bold">
                หลายหน่วยก็ได้
              </Typography>
            </Typography>
          </Stack>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ boxShadow: "none", height: "40px", minWidth: "100px" }}
            onClick={handleRegisterReporter}
          >
            สมัคร
          </Button>
        </Box>
      </Card>
      <Typography
        sx={{
          my: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.25rem",
        }}
      >
        หรือ
      </Typography>
      <Card sx={{ padding: 1, borderRadius: "8px", minWidth: "318px" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: palette.primary.main,
              width: "40px",
              height: "40px",
            }}
          >
            B
          </Box>
          <Typography>
            ช่วยรายงาน
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              การนับคะแนน
            </Typography>
            อย่าง
            <Typography component="span" sx={{ fontWeight: "bold" }}>
              ใกล้ชิด
            </Typography>
            หลังปิดหน่วยเลือกตั้ง
          </Typography>
        </Stack>
        <Box borderTop="2px dotted #cccccc" sx={{ my: 1.5 }} />
        <Box>
          <Stack direction="column">
            <Typography component="div">
              ไปที่หน่วยเลือกตั้ง
              <Typography component="span" fontWeight="bold">
                ในช่วงเย็น
              </Typography>
              เพื่อ
              <Typography component="span" fontWeight="bold">
                จับตาการนับคะแนนอย่างใกล้ชิด
              </Typography>
            </Typography>
            <Typography component="div">
              ต้องการอาสา
              <Typography component="span" fontWeight="bold">
                3 คน / หน่วย
              </Typography>{" "}
              เพื่อ นับ
              <Typography component="span" fontWeight="bold">
                คะแนนการเลือกตั้ง
              </Typography>
              และ
              <Typography component="span" fontWeight="bold">
                ประชามติ
              </Typography>
            </Typography>
          </Stack>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{ boxShadow: "none", height: "40px", minWidth: "100px" }}
            onClick={handleRegisterCountVote}
          >
            สมัคร
          </Button>
        </Box>
      </Card>
      <Typography textAlign="center" marginTop={2}>
        ( หรือ สมัครทั้ง 2 บทบาทก็ได้ )
      </Typography>
    </Stack>
  );
};

export default RegistrationInfo;
