import { Box, Stack, Typography } from "@mui/material";
import { FC } from "react";
import StepPoint from "./stepPoint";
import STATUS_COLORS from "@/src/config/statusColors";
import StatusLegendItem from "@/src/components/statusLegendItem";
import STATUS_LEGEND from "@/src/config/statusLegend";

const HowToInfo: FC = () => {
  return (
    <Stack
      direction="column"
      margin="2rem 0 0 0"
      color={"white"}
      fontSize={"1rem"}
    >
      <Typography fontSize="32px" fontWeight="bold" color={STATUS_COLORS.accent}>
        HOW TO
      </Typography>
      <Typography fontSize="20px">
        สังเกตการณ์หน่วยเลือกตั้ง{" "}
        <Typography fontSize="20px" fontWeight="bold" component="span">
          (วันที่ 1 และ 8 กุมภา 69)
        </Typography>
      </Typography>
      <Box my={3}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 2,
            pb: 2,
            borderBottom: "1px dotted rgba(255,255,255,0.12)",
          }}
        >
          <StepPoint
            imageSrc="/assets/storyboard_icon_1.png"
            description={
              <Typography color="#c1c0c0">
                1. คุณพบว่า หน่วยเลือกตั้งที่อยู่ใกล้ๆ เป็น{" "}
                <Typography component="span" color={STATUS_COLORS.missing} fontWeight="bold">
                  สีขาว{" "}
                  <Typography component="span" fontWeight="normal">
                    ( ขาดการรายงาน )
                  </Typography>
                </Typography>
              </Typography>
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontSize={24} color="#c1c0c0" aria-hidden>
              →
            </Typography>
          </Box>

          <StepPoint
            imageWidth={70}
            imageSrc="/assets/storyboard_icon_2.png"
            description={
              <Typography color="#c1c0c0">
                2. เดินทางไปยังหน่วยนั้นเพื่อ{" "}
                <Typography fontWeight="bold" color={STATUS_COLORS.accent} component="span">
                  รายงานสถารการณ์
                </Typography>{" "}
                <Typography component="span" color="#c1c0c0">
                  หรือ{" "}
                  <Typography component="span" fontWeight="bold" color={STATUS_COLORS.counting}>
                    จับตาการนับคะแนน
                  </Typography>
                </Typography>
              </Typography>
            }
          />
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 2,
            py: 2,
            borderBottom: "1px dotted rgba(255,255,255,0.12)",
          }}
        >
          <Box sx={{ "& img": { marginTop: "18px" } }}>
            <StepPoint
              imageHeight={70}
              imageWidth={70}
              imageSrc="/assets/storyboard_icon_4.png"
              description={
          <Typography color="#c1c0c0">
            3. พบเห็น{" "}
            <Typography fontWeight="bold" color={STATUS_COLORS.abnormal} component="span">
              ความผิดปกติ
            </Typography>{" "}
            ในหน่วยเลือกตั้ง
          </Typography>
              }
            />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontSize={24} color="#c1c0c0" aria-hidden>
              →
            </Typography>
          </Box>

          <Box sx={{ "& img": { marginTop: "5px" } }}>
            <StepPoint
              imageHeight={100}
              imageWidth={90}
              imageSrc="/assets/storyboard_icon_5.png"
              description={
          <Typography color="#c1c0c0">
            4. รายงานเหตุการณ์ ผ่าน{" "}
            <Typography fontWeight="bold" color={STATUS_COLORS.accent} component="span">
              We Check
            </Typography>
          </Typography>
              }
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: 2,
            pt: 2,
          }}
        >
          <StepPoint
            imageHeight={80}
            imageWidth={130}
            imageSrc="/assets/storyboard_icon_6.png"
            description={
              <Typography color="#c1c0c0">
                5. องค์กรอิสระ / ประชาชน รับทราบ และช่วยกันเป็นหูเป็นตา
              </Typography>
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography fontSize={24} color="#c1c0c0" aria-hidden>
              →
            </Typography>
          </Box>

          <StepPoint
            imageHeight={100}
            imageWidth={70}
            imageSrc="/assets/storyboard_icon_3.png"
            description={
              <Typography color="#c1c0c0">
                6. ช่วยให้การสังเกตการณ์ มี{" "}
                <Typography fontWeight="bold" color={STATUS_COLORS.accent} component="span">
                  ความครอบคลุม
                </Typography>{" "}
                มากยิ่งขึ้น
              </Typography>
            }
          />
        </Box>
      </Box>
      <Typography fontWeight="bold">สีสถานะของหน่วยเลือกตั้ง</Typography>
        <Stack direction="column" spacing={1} mb={3} mt={1}>
          {STATUS_LEGEND.map((s) => (
            <div key={s.key}>
              <StatusLegendItem color={s.color} label={s.label} small={s.small} />
            </div>
          ))}
        </Stack>
    </Stack>
  );
};

export default HowToInfo;
