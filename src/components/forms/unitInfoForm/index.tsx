import { Stack, Typography, Box } from "@mui/material";
import { FC, Fragment } from "react";
import VolunteerInfoBar from "./volunteerInfoBar";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoBar from "./irregularInfoBar";
import IrregularBar from "./irregularBar";
import FormButtons from "./formButtons";
import { useLocationStore } from "@/src/store/location.store";
import { useUnitDataStore } from "@/src/store/UnitData.store";
import { getWebStateManager } from "@/src/utils/webState";
import { ArrowForwardIos } from "@mui/icons-material";
import { REPORT_LOCATION_URL } from "@/src/config/externalLinks";
import { buildGoogleMapUrl } from "@/src/utils/urlBuilder";
import LocationHeader from "@/src/components/locationHeader";

const UnitInfoForm: FC = () => {
  const { selectedUnitData } = useUnitDataStore();
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
    if (selectedLocation)
        window.open(buildGoogleMapUrl(selectedLocation));
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
          {selectedUnitData && (
            <LocationHeader data={selectedUnitData} locationGrade={selectedLocation?.locationGrade} />
          )}
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

export default UnitInfoForm;
