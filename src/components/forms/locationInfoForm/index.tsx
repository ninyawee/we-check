import { Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import VolunteerInfoBar from "./volunteerInfoBar";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoBar from "./irregularInfoBar";
import IrregularBar from "./irregularBar";
import FormButtons from "./formButtons";
import { useLocationStore } from "@/src/store/location.store";

const LocationInfoForm: FC = () => {
  const { selectedLocation } = useLocationStore();

  function handleNavigateClick() {
    window.open(selectedLocation?.googleMapUrl);
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
          padding={"1rem"}
          position={"relative"}
        >
          <Stack
            direction={"column"}
            justifyContent={"space-between"}
            maxWidth={"80%"}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Typography
                fontSize={"1.125rem"}
                sx={{ wordWrap: "break-word", color: "#FFFFFF" }}
              >
                {selectedLocation?.unitName}
              </Typography>
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
                  }}
                >
                  {selectedLocation?.year
                    ? `ข้อมูลเก่าปี ${selectedLocation.year}`
                    : "ข้อมูลเก่า"}
                </Typography>
              )}
            </Stack>
            <Stack direction={"row"} marginBottom={"0.875rem"}>
              <Typography fontSize={"0.8rem"} color="#A4A4A4">
                {`หน่วย ${selectedLocation?.unitNumber} ${selectedLocation?.subDistrictName} เขต ${selectedLocation?.divisionNumber} ${selectedLocation?.provinceName}`}
              </Typography>
            </Stack>
          </Stack>
          <div
            style={{
              height: "50%",
              position: "absolute",
              right: 0,
              bottom: 0,
              transform: "scaleX(-1)",
            }}
          >
          </div>
        </Stack>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="start"
        >
          <IrregularBar />
          <VolunteerInfoBar onNavigate={handleNavigateClick} />
          <HorizontalLine />
          <IrregularInfoBar />
        </Stack>

        <FormButtons />
      </Stack>
    </Fragment>
  );
};

export default LocationInfoForm;
