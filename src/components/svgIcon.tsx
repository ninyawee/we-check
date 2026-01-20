import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

interface SvgProps {
  icon: any;
  color?: string;
  size?: { width: number | string; height: number | string };
  sx?: SxProps<Theme> | undefined;
  noBasePath?: boolean;
}

const SvgIcon = ({ icon, color, size, noBasePath, sx }: SvgProps) => {
  return (
    <Box
      component="div"
      sx={{
        ...(size ? size : { width: "60px", height: "60px" }),
        mask: `url(${icon}) no-repeat`,
        maskSize: "contain",
        background: color ? color : "white",
        ...sx,
      }}
    ></Box>
  );
};

export default SvgIcon;
