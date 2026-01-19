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
import { ArrowBackIosNew } from "@mui/icons-material";
import ReportLocationLink from "@/src/components/reportLocationLink";
import LocationHeader from "@/src/components/locationHeader";

const UnitInfoForm: FC = () => {
  const { selectedUnitData, setSelectedUnitData, setOpenUnitInfoForm } = useUnitDataStore();
  const { selectedLocation } = useLocationStore();

  // Use WebState manager to check if it's a report day
  const webStateManager = getWebStateManager();
  const isReportDay = webStateManager.isReportDay();


 

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
          <Stack direction="row" alignItems="center" flex={2}>
            <IconButton
              size="small"
              onClick={() => {
                // close unit form and clear selection to go back to unit list
                setOpenUnitInfoForm(false);
                setSelectedUnitData(null as any);
              }}
              sx={{ color: "#A4A4A4", marginRight: "0.25rem", marginLeft: "-0.25rem" }}
            >
              <ArrowBackIosNew />
            </IconButton>
            {selectedUnitData && <LocationHeader data={selectedUnitData} />}
          </Stack>
        </Stack>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="start"
        >
          {!isReportDay ? <HorizontalLine /> : <IrregularBar />}
          {<VolunteerInfoBar />}
          {<HorizontalLine />}
          {isReportDay && <IrregularInfoBar isReportDay={isReportDay} />}
        </Stack>

        <FormButtons isReportDay={isReportDay} />
        <HorizontalLine />
        <ReportLocationLink />
      </Stack>
    </Fragment>
  );
};

export default UnitInfoForm;
