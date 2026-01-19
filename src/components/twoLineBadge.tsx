import { Box, Typography } from "@mui/material";
import React from "react";

type Props = {
  upperText: string;
  mainText: string;
  color?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  className?: string;
};

const TwoLineBadge: React.FC<Props> = ({
  upperText,
  mainText,
  color = "#cf9100ff",
  width = "3.5rem",
  height = "3.5rem",
  backgroundColor = "#000000",
  className,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        color: "#000",
        width,
        height,
        borderRadius: "0.5rem",
        padding: "0.25rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
        border: `1px solid ${color}`,
        marginRight: "0.75rem",
      }}
      className={className}
    >
      <Typography fontSize={"0.75rem"} fontWeight={200} sx={{ lineHeight: 1, textAlign: "center", color }}>
        {upperText}
      </Typography>
      <Typography
        fontSize={"1.25rem"}
        fontWeight={700}
        sx={{ lineHeight: 1, marginTop: "0.3rem", textAlign: "center", color }}
      >
        {mainText}
      </Typography>
    </Box>
  );
};

export default TwoLineBadge;
