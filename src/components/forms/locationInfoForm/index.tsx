import { Stack, Typography, Box } from "@mui/material";
import { FC, Fragment } from "react";
import VolunteerInfoBar from "./volunteerInfoBar";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoBar from "./irregularInfoBar";
import IrregularBar from "./irregularBar";
import FormButtons from "./formButtons";
import { useLocationStore } from "@/src/store/location.store";
import { getWebStateManager } from "@/src/utils/webState";
import { ArrowForwardIos } from "@mui/icons-material";
import { REPORT_LOCATION_URL } from "@/src/config/externalLinks";

const LocationInfoForm: FC = () => {
  const { selectedLocation } = useLocationStore();

  // Use WebState manager to check if it's a report day
  const webStateManager = getWebStateManager();
  const isReportDay = webStateManager.isReportDay();

  // Map locationGrade (which may contain letters) to a short Thai label and colors
  const rawGrade = (selectedLocation?.locationGrade || "D").toString();
  let gradeLabel = "ต่ำ"; 
  let gradeColor = "#cf9100ff"; 
  if (rawGrade.includes("A")) {
    gradeLabel = "สูง"; // short Thai for excellent
    gradeColor = "#30a766ff"; // green
  }

  function handleNavigateClick() {
    window.open(selectedLocation?.googleMapUrl);
  }

  function reportLocationClick(): void {
    window.open(REPORT_LOCATION_URL);
  }

  return (
    <Fragment>
      <Stack
        width={"100%"}
        direction={"column"}
        justifyContent={"space-between"}
      >
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          padding={"1rem"}
          position={"relative"}
        >
          <Stack direction={"row"} alignItems={"flex-start"} maxWidth={"80%"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000000",
                color: "#000",
                width: "3.5rem",
                height: "3.5rem",
                borderRadius: "0.5rem",
                padding: "0.25rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                border: `1px solid ${gradeColor}`,
                marginRight: "0.75rem",
              }}
            >
              <Typography
                fontSize={"0.75rem"}
                fontWeight={200}
                sx={{ lineHeight: 1, textAlign: "center", color: gradeColor }}
              >
                แม่นยำ
              </Typography>
              <Typography
                fontSize={"1.25rem"}
                fontWeight={700}
                sx={{ lineHeight: 1, marginTop: "0.3rem", textAlign: "center", color: gradeColor }}
              >
                {gradeLabel}
              </Typography>
            </Box>

            <Stack direction={"column"} justifyContent={"space-between"} flex={1}>
              <Stack direction={"row"} alignItems={"center"}>
                <Typography
                  fontSize={"1.125rem"}
                  sx={{ wordWrap: "break-word", color: "#FFFFFF" }}
                >
                  {selectedLocation?.unitName}
                  {((selectedLocation?.year &&
                    Number(selectedLocation.year) !== new Date().getFullYear()) ||
                    !selectedLocation?.year) && (
                    <Typography
                      component="span"
                      fontSize={"0.7rem"}
                      sx={{
                        backgroundColor: "#424242",
                        color: "#FFF",
                        padding: "0.125rem 0.5rem",
                        borderRadius: "0.5rem",
                        marginLeft: "0.5rem",
                        display: "inline-block",
                        verticalAlign: 'middle'
                      }}
                    >
                      {selectedLocation?.year
                        ? `ข้อมูลเก่าปี ${selectedLocation.year}`
                        : "ข้อมูลเก่า"}
                    </Typography>
                  )}
                </Typography>
              </Stack>
              <Stack direction={"row"} marginBottom={"0.875rem"}>
                <Typography fontSize={"0.8rem"} color="#A4A4A4">
                  {`หน่วย ${selectedLocation?.unitNumber} ${selectedLocation?.subDistrictName} เขต ${selectedLocation?.divisionNumber} ${selectedLocation?.provinceName}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          {/* badge moved into the left header (before unit name) */}
        </Stack>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="start"
        >
          {isReportDay && <IrregularBar />}
          {<VolunteerInfoBar onNavigate={handleNavigateClick} />}
          {<HorizontalLine />}
          {isReportDay && <IrregularInfoBar isReportDay={isReportDay} />}
        </Stack>

        <FormButtons isReportDay={isReportDay} />
        <HorizontalLine />
              <Stack
                direction="row"
                margin="0.6rem 1rem 1rem 1.5rem"
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Stack direction="row"></Stack>
                <Stack className="clickable" direction="row">
                  <Typography onClick={reportLocationClick}>
                    แจ้งตำแหน่งหน่วยผิด
                  </Typography>
                  <ArrowForwardIos sx={{ color: "#A4A4A4" }} />
                </Stack>
              </Stack>
      </Stack>
    </Fragment>
  );
};

export default LocationInfoForm;
