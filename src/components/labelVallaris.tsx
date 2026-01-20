import { Stack, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React, { Fragment } from "react";

interface ILabel {
  iconSize: string | number;
  titleSize: Variant;
  descSize: Variant | number;
  contain: any;
  color?: string;
  hideLogo?: boolean;
}
const LabelVallaris = ({
  iconSize = "3rem",
  titleSize = "h5",
  descSize = "caption",
  contain,
  color,
  hideLogo,
}: ILabel) => {
  return (
    <Fragment>
      <Stack
        direction={"column"}
        alignItems={"center"}
        spacing={1.5}
        sx={{
          position: "absolute",
          zIndex: 1,
          left: 0,
          top: 0,
        }}
      >
        {/* <a
          href="https://www.vote62.com/volunteer/"
          target="_blank"
          rel="noreferrer"
        >
          <div
            style={{
              backgroundImage: `url(${"https://www.vote62.com/img/vote62-logo.svg"})`,
              backgroundSize: `contain`,
              width: 72,
              height: 72,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        </a> */}

        {hideLogo ? null : (
          <a href="https://vallarismaps.com/" target="_blank" rel="noreferrer">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  backgroundImage: `url("/logo-white.svg")`,
                  backgroundSize: `contain`,
                  width: iconSize,
                  height: iconSize,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  margin: 8,
                }}
              ></div>
            </div>
          </a>
        )}
      </Stack>

      <Stack
        sx={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          left: 8,
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

export default LabelVallaris;
