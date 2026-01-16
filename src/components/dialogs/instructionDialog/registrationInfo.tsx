import { Box, Button, Card, Stack, Typography, useTheme } from "@mui/material";
import STATUS_COLORS from "@/src/config/statusColors";
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
      <Typography fontSize="32px" fontWeight="bold" color={STATUS_COLORS.accent} sx={{ mb: 1 }}>
        สมัครเป็นอาสา
      </Typography>
      <Card
        sx={{
          padding: 1,
          borderRadius: "8px",
          overflow: "visible",
        }}
      >
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: palette.primary.main,
              width: "45px",
              height: "45px",
              color: "white",
            }}
          >
            <Typography fontWeight="bold">A</Typography>
          </Box>
          <Typography fontSize="22px">
            ช่วยรายงาน
            <Typography
              fontSize="22px"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              กระบวนการเลือกตั้ง
            </Typography>
            และ
            <Typography
              fontSize="22px"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              เหตุการณ์
            </Typography>
            <Typography
              fontSize="22px"
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
              top: "-23px",
              right: "-16px",
              position: "absolute",
              backgroundColor: "#ffcb4c",
              width: "fit-content",
              padding: "4px 20px",
              borderRadius: "16px",
            }}
          >
            <Typography fontSize="16px" fontWeight="bold">
              ใช้เวลาไม่เกิน 5 นาที
            </Typography>
          </Box>
        </Box>
        <Box>
          <Stack direction="row" spacing={1}>
            <Box sx={{ marginTop: "-14px" }}>
              <img
                width={100}
                src="/assets/wewatch_icon_large.png"
                alt="weWatch"
              />
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                <img
                  width={40}
                  height={30}
                  src="/assets/checkbox_icon.png"
                  alt="checkbox"
                />
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
              </Stack>
              <Stack direction="row" spacing={1}>
                <img
                  width={40}
                  height={30}
                  src="/assets/checkbox_icon.png"
                  alt="checkbox"
                />
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
          </Stack>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              height: "40px",
              minWidth: "100px",
              color: "white",
            }}
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
          fontSize: "28px",
        }}
      >
        หรือ
      </Typography>
      <Card sx={{ padding: 1, borderRadius: "8px" }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Box
            sx={{
              flexShrink: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "8px",
              backgroundColor: palette.primary.main,
              width: "45px",
              height: "45px",
              color: "white",
            }}
          >
            <Typography fontWeight="bold">B</Typography>
          </Box>
          <Typography fontSize="22px">
            ช่วยรายงาน
            <Typography
              fontSize="22px"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              การนับคะแนน
            </Typography>
            อย่าง
            <Typography
              fontSize="22px"
              component="span"
              sx={{ fontWeight: "bold" }}
            >
              ใกล้ชิด
            </Typography>
            หลังปิดหน่วยเลือกตั้ง
          </Typography>
        </Stack>
        <Box borderTop="2px dotted #cccccc" sx={{ my: 1.5 }} />
        <Box>
          <Stack direction="row" spacing={1}>
            <Box sx={{ marginTop: "-14px" }}>
              <img
                width={120}
                height={100}
                src="/assets/vote62_icon_large.png"
                alt="weWatch"
              />
            </Box>
            <Box>
              <Stack direction="row" spacing={1}>
                <img
                  width={40}
                  height={30}
                  src="/assets/checkbox_icon.png"
                  alt="checkbox"
                />
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
              </Stack>
              <Stack direction="row" spacing={1}>
                <img
                  width={40}
                  height={30}
                  src="/assets/checkbox_icon.png"
                  alt="checkbox"
                />
                <Typography component="div">
                  ต้องการอาสา{" "}
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
          </Stack>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button
            variant="contained"
            sx={{
              boxShadow: "none",
              height: "40px",
              minWidth: "100px",
              color: "white",
            }}
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
