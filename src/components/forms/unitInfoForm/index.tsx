import { Stack, Typography, Box, IconButton } from "@mui/material";
import { FC, Fragment } from "react";
import VolunteerInfoBar from "./volunteerInfoBar";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoBar from "./irregularInfoBar";
import IrregularBar from "./irregularBar";
import FormButtons from "./formButtons";
import { useLocationStore } from "@/src/store/location.store";
import { useUnitDataStore } from "@/src/store/UnitData.store";
import { getWebStateManager } from "@/src/utils/webState";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import { REPORT_LOCATION_URL } from "@/src/config/externalLinks";
import { buildGoogleMapUrl } from "@/src/utils/urlBuilder";
import LocationHeader from "@/src/components/locationHeader";

const UnitInfoForm: FC = () => {
  const { selectedUnitData, setSelectedUnitData, setOpenUnitInfoForm } = useUnitDataStore();
  const { selectedLocation } = useLocationStore();

  // Use WebState manager to check if it's a report day
  const webStateManager = getWebStateManager();
  const isReportDay = webStateManager.isReportDay();

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
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => {
                // close unit form and clear selection to go back to unit list
                setOpenUnitInfoForm(false);
                setSelectedUnitData(null as any);
              }}
              sx={{ color: "#A4A4A4", marginRight: "0.5rem" }}
            >
              <ArrowBackIosNew />
            </IconButton>
            {selectedUnitData && <LocationHeader data={selectedUnitData} />}
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

export default UnitInfoForm;
