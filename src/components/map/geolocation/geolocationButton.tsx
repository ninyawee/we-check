import { GpsFixed, GpsOff } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Stack } from "@mui/material";
import React, { FC, Fragment } from "react";

const GeolocationButton: FC<{
  geolocate: boolean;
  toggleGeolocate: () => void;
  load: boolean;
}> = ({ geolocate, toggleGeolocate, load }) => {
  return (
    <Fragment>
      <Box sx={{ position: "absolute", zIndex: 1, bottom: 8, right: 8 }}>
        <Box
          component={"div"}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "0px 8px 8px",
          }}
        >
          <Stack
            bgcolor={"white"}
            sx={{
              borderRadius: "50%",
              py: 0.5,
              px: 0.5,
              boxShadow: "1px 1px 10px rgba(0, 0, 0, 0.1)",
            }}
            spacing={0.5}
          >
            <IconButton
              onClick={() => {
                toggleGeolocate();
              }}
              disabled={load}
              id="openGeolocation-button"
              size="small"
            >
              {geolocate ? (
                <GpsOff sx={{ fontSize: "24px", color: "text.primary" }} />
              ) : load ? (
                <CircularProgress color="secondary" size={24} />
              ) : (
                <GpsFixed sx={{ fontSize: "24px", color: "text.primary" }} />
              )}
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Fragment>
  );
};

export default GeolocationButton;
