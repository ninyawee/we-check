import { Stack } from "@mui/material";
import React, { Fragment } from "react";

const OSM = () => {
  return (
    <Fragment>
      <Stack
        sx={{
          position: "absolute",
          top: "-1.5rem",
          left: "1rem",
          fontSize: 10,
          color: "white",
        }}
      >
        <a
          href="https://www.openstreetmap.org/copyright"
          target="_blank"
          rel="noreferrer"
        >
          © <span style={{ fontWeight: "bold" }}>OpenStreetMap</span>{" "}
          contributors
        </a>
      </Stack>
    </Fragment>
  );
};

export default OSM;
