import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { REPORT_LOCATION_URL } from "@/src/config/externalLinks";

type Props = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
};

const ReportLocationLink: FC<Props> = ({ className, children, onClick }) => {
  function handleClick() {
    if (onClick) onClick();
    else window.open(REPORT_LOCATION_URL);
  }

  return (
    <Stack
      direction="row"
      margin="0.6rem 1rem 1rem 1.5rem"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Stack direction="row"></Stack>
      <Stack className={className || "clickable"} direction="row" onClick={handleClick} sx={{ cursor: "pointer" }}>
        <Typography>
          {children || "แจ้งข้อมูลผิดพลาด"}
        </Typography>
        <ArrowForwardIos sx={{ color: "#A4A4A4" }} />
      </Stack>
    </Stack>
  );
};

export default ReportLocationLink;
