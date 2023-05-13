import {
  Box,
  CircularProgress,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, Fragment, useState } from "react";
import CoverageInfoDialog from "../dialogs/coverageInfoDialog";
import AppInfoDialog from "../dialogs/appInfoDialog";
import { useLayoutStore } from "@/src/store/layout.store";
import { ArrowForwardIos } from "@mui/icons-material";
import HorizontalLine from "../horizontalLine";
import OSM from "../map/credit/osm";

const IntroductionPanel: FC<{
  active?: boolean;
  locationLoading: boolean;
  onMyLocationTrigger: () => void;
}> = ({ active, locationLoading, onMyLocationTrigger }) => {
  const [coverageInfoDialogOpen, setCoverageInfoDialogOpen] =
    useState<boolean>(false);
  const [appInfoDialogOpen, setAppInfoDialogOpen] = useState<boolean>(false);
  const { isDesktopConfirm } = useLayoutStore();
  const matchDesktop = useMediaQuery("(min-width:900px)");

  function reportLocationClick() {
    window.open("https://forms.gle/EpXbbrVfJdxbX6hv7");
  }

  return (
    <Fragment>
      <AppInfoDialog
        open={appInfoDialogOpen}
        onClose={() => setAppInfoDialogOpen(false)}
      />
      <CoverageInfoDialog
        open={coverageInfoDialogOpen}
        onClose={() => setCoverageInfoDialogOpen(false)}
      />
      {matchDesktop && !isDesktopConfirm ? (
        <></>
      ) : (
        <Slide in={active} direction="up" mountOnEnter unmountOnExit>
          <Box
            sx={{
              borderRadius: "5% 5% 0 0",
              display: "flex",
              justifyContent: "center",
              position: "fixed",
              bottom: 0,
              zIndex: 2,
              width: "100%",
              background: "#090909",
            }}
          >
            <OSM />
            <Typography fontSize={"0.8rem"} color="#A4A4A4" position="absolute" top={"-2.8rem"} left={"1rem"}>ข้อมูลจะอัปเดตทุก 1นาที</Typography>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <div
                className="clickable"
                style={{
                  width: "40px",
                  position: "absolute",
                  top: "-3rem",
                  right: "1rem",
                }}
                onClick={onMyLocationTrigger}
              >
                {locationLoading ? (
                  <CircularProgress size={40} />
                ) : (
                  <img
                    src="/assets/my-location.png"
                    width="100%"
                    height="auto"
                    alt="MyLocation"
                  />
                )}
              </div>
            </Stack>

            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{
                width: "100%",
                position: "relative",
                padding: "18px 0",
                overflow: "hidden",
                color: "white",
              }}
            >
              <Stack
                direction="column"
                justifyContent={"space-between"}
                sx={{ position: "relative" }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  height="2rem"
                >
                  <Stack direction="row" alignItems="center">
                    <div
                      style={{
                        width: "18px",
                        height: "18px",
                        margin: "0 0.5rem 0 1rem",
                        borderRadius: "100%",
                        background: "#10C487",
                      }}
                    ></div>
                    <Typography fontSize={"1rem"}>
                      มีการรายงานสถานการณ์ในหน่วย
                    </Typography>
                  </Stack>
                  <Stack
                    className="clickable"
                    direction="row"
                    alignItems="center"
                    onClick={() => setAppInfoDialogOpen(true)}
                  >
                    <Typography
                      fontSize={"1rem"}
                      margin={"0.25rem 0 0.5rem 1rem"}
                      color="primary"
                    >
                      เรียนรู้เพิ่มเติม
                    </Typography>
                    <ArrowForwardIos color="primary" />
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" height="2rem">
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      margin: "0 0.5rem 0 1rem",
                      borderRadius: "100%",
                      background: "#C10000",
                    }}
                  ></div>
                  <Typography fontSize={"1rem"}>ขาดการรายงาน</Typography>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  height="2rem"
                  marginBottom={"1rem"}
                >
                  <div
                    style={{
                      width: "18px",
                      height: "18px",
                      margin: "0 0.5rem 0 1rem",
                      borderRadius: "100%",
                      background: "#A4A4A4",
                    }}
                  ></div>
                  <Typography fontSize={"1rem"}>
                    รายงาน และนับคะแนนเสร็จสิ้น
                  </Typography>
                </Stack>
                <div
                  style={{
                    position: "absolute",
                    height: "80%",
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                  }}
                >
                  <img
                    src="/assets/captain.png"
                    height="100%"
                    width="auto"
                    alt="Captain"
                  />
                </div>
              </Stack>
              <HorizontalLine />
              <Stack
                direction="row"
                margin="1rem 0.75rem 0 0.75rem"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction="row">
                  <div
                    style={{
                      height: "20px",
                      margin: "0 0.25rem",
                    }}
                  >
                    <img
                      src="/assets/MainLogo.png"
                      height="100%"
                      width="auto"
                      alt="WeCheck"
                    />
                  </div>
                  <div
                    style={{
                      height: "20px",
                      margin: "0 0.25rem",
                    }}
                  >
                    <img
                      src="/assets/cleverse.png"
                      height="100%"
                      width="auto"
                      alt="Cleverse"
                    />
                  </div>
                </Stack>
                <Typography onClick={reportLocationClick}>
                  แจ้งหน่วยผิด / ตกหล่น
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Slide>
      )}
    </Fragment>
  );
};

export default IntroductionPanel;
