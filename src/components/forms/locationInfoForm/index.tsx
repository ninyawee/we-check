import { Button, Stack, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import VolunteerInfoBar from "./volunteerInfoBar";
import HorizontalLine from "../../horizontalLine";
import IrregularInfoBar from "./irregularInfoBar";
import IrregularBar from "./irregularBar";
import { useLocationStore } from "@/src/store/location.store";

const LocationInfoForm: FC = () => {
  const { selectedLocation } = useLocationStore()

  function handleReportClick() {
    window.open('https://www.electionwatchth.org/public-election-report?unit=1234567890')
  }

  function handleNavigateClick() {
    window.open(selectedLocation?.googleMapUrl)
  }

  return <Fragment>
    <Stack
      width={"100%"}
      direction={"column"}
      justifyContent={"space-between"}>
      <Stack direction={"row"} justifyContent={"space-between"} padding={"1rem"} position={"relative"}>
        <Stack direction={"column"} justifyContent={"space-between"} maxWidth={"80%"}>
          <Typography fontSize={"1.125rem"} sx={{ wordWrap: 'break-word' }}>{selectedLocation?.unitName}</Typography>
          <Stack direction={"row"} marginBottom={"0.875rem"}>
            <Typography fontSize={"0.8rem"} color="#A4A4A4">
              {`หน่วย ${selectedLocation?.unitNumber} ${selectedLocation?.subDistrictName} เขต ${selectedLocation?.divisionNumber} ${selectedLocation?.provinceName}`}
            </Typography>
          </Stack>
        </Stack>
        <div style={{
          height: '50%',
          position: 'absolute',
          right: 0,
          bottom: 0,
          transform: 'scaleX(-1)'
        }}>
          <img src="/assets/location-bg.png" width="auto" height="100%" alt="location" />
        </div>
      </Stack>
      <Stack direction="column" justifyContent="space-between" alignItems="start">
        <IrregularBar />
        <VolunteerInfoBar onNavigate={handleNavigateClick} />
        <HorizontalLine />
        <IrregularInfoBar />
        <HorizontalLine />
      </Stack>

      <Button
        variant="contained"
        color="primary"
        sx={{ fontSize: '1.25rem', height: '52px', margin: "1rem 1.5rem", color: 'white' }}
        onClick={handleReportClick}>
        รายงานสถานการณ์
      </Button>
    </Stack>
  </Fragment>
}

export default LocationInfoForm
