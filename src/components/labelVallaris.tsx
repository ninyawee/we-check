import { Stack, Typography } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import React, { Fragment } from "react";
import { useResizeDetector } from "react-resize-detector";

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
  const textSize = useResizeDetector();
  return (
    <Fragment>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1.5}
        sx={{
          position: "absolute",
          zIndex: 1,
          right: 8,
          bottom: -8,
        }}
      >
        <a
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
        </a>

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
                  backgroundImage: `url(${
                    color ? "/logoBlack.svg" : "/logo-white.svg"
                  })`,
                  backgroundSize: `contain`,
                  width: iconSize,
                  height: iconSize,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  marginRight: 4,
                }}
              ></div>
              {contain.width && contain.width < 500 ? null : (
                <div ref={textSize.ref}>
                  <Typography
                    variant={titleSize}
                    style={{
                      fontFamily: "K2D-Bold",
                      lineHeight: "unset",
                      marginBottom: -6,
                      color: color ? color : "white",
                    }}
                  >
                    Vallaris Maps
                  </Typography>
                  <Typography
                    variant={"caption"}
                    style={{
                      fontFamily: "K2D-Light",
                      color: color ? color : "white",
                      fontSize: "8px",
                    }}
                  >
                    Geographic solution on cloud
                  </Typography>
                </div>
              )}
            </div>
          </a>
        )}
      </Stack>

      <a
        href="https://www.openstreetmap.org/copyright"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "absolute",
          zIndex: 1,
          bottom: 0,
          left: 8,
          fontSize: 10,
        }}
      >
        © <span style={{ fontWeight: "bold" }}>OpenStreetMap</span> contributors
      </a>
    </Fragment>
  );
};

export default LabelVallaris;
