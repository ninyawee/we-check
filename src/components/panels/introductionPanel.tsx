import { useLayoutStore } from "@/src/store/layout.store";
import { ArrowForwardIos } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Slide,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { FC, Fragment, useState, useEffect } from "react";
import AppInfoDialog from "../dialogs/appInfoDialog";
import CoverageInfoDialog from "../dialogs/coverageInfoDialog";
import InstructionDialog from "../dialogs/instructionDialog";
import HorizontalLine from "../horizontalLine";
import OSM from "../map/credit/osm";
import STATUS_COLORS from "@/src/config/statusColors";
import StatusDot from "@/src/components/statusDot";
import StatusLegendItem from "@/src/components/statusLegendItem";
import STATUS_LEGEND from "@/src/config/statusLegend";
import { COUNTING_THRESHOLD } from "@/src/config/statusConfig";

const IntroductionPanel: FC<{
  active?: boolean;
  locationLoading: boolean;
  onMyLocationTrigger: () => void;
}> = ({ active, locationLoading, onMyLocationTrigger }) => {
  const [coverageInfoDialogOpen, setCoverageInfoDialogOpen] =
    useState<boolean>(false);
  const [appInfoDialogOpen, setAppInfoDialogOpen] = useState<boolean>(false);

  const [instructionDialogOpen, setInstructionDialogOpen] =
    useState<boolean>(false);

  // showCounting is determined client-side from local device time.
  // Initially false to avoid SSR/client hydration mismatch; will update in useEffect.
  const [showCounting, setShowCounting] = useState<boolean>(false);

  useEffect(() => {
    function checkCounting() {
      try {
        const now = new Date();
        const threshold = new Date();
        threshold.setHours(COUNTING_THRESHOLD.hour, COUNTING_THRESHOLD.minute, 0, 0);
        setShowCounting(now >= threshold);
      } catch (e) {
        setShowCounting(false);
      }
    }

    // run immediately then refresh every second
    checkCounting();
    const id = setInterval(checkCounting, 1000);
    return () => clearInterval(id);
  }, []);

  const { isDesktopConfirm } = useLayoutStore();
  const matchDesktop = useMediaQuery("(min-width:900px)");

  function reportLocationClick() {
    window.open("https://forms.gle/EpXbbrVfJdxbX6hv7");
  }

  return (
    <Fragment>
      <InstructionDialog
        open={instructionDialogOpen}
        onClose={() => setInstructionDialogOpen(false)}
      />
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
            <Typography
              fontSize={"0.8rem"}
              color="#A4A4A4"
              position="absolute"
              top={"-2.8rem"}
              left={"1rem"}
            >
              ข้อมูลจะอัปเดตทุก 5 นาที
            </Typography>
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
                <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ gap: 1 }}>
                  <div>
                    <Stack direction="column">
                      {STATUS_LEGEND.filter((s) => s.key !== "counting" || showCounting).map((s) => (
                        <div key={s.key}>
                          <StatusLegendItem color={s.color} label={s.label} small={s.small} compact />
                        </div>
                      ))}
                    </Stack>
                  </div>
                  <Stack
                    className="clickable"
                    direction="row"
                    alignItems="center"
                    onClick={() => setInstructionDialogOpen(true)}
                  >
                    <Typography
                      fontSize={"1rem"}
                      margin={"0.25rem 0 0.25rem 1rem"}
                      color="primary"
                    >
                      วิธีใช้งาน
                    </Typography>
                    <ArrowForwardIos
                      color="primary"
                      sx={{ marginRight: "0.5rem" }}
                    />
                  </Stack>
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
                <Stack className="clickable" direction="row">
                  <Typography onClick={reportLocationClick}>
                    แจ้งหน่วยผิด / ตกหล่น
                  </Typography>
                  <ArrowForwardIos sx={{ color: "#A4A4A4" }} />
                </Stack>
              </Stack>
            </Stack>
          </Box>
        </Slide>
      )}
    </Fragment>
  );
};

export default IntroductionPanel;
