import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

type StepPointProps = {
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  description: ReactNode;
};

const StepPoint: FC<StepPointProps> = ({
  imageSrc,
  description,
  imageWidth = 150,
  imageHeight = 80,
}) => {
  return (
    <Box sx={{ maxWidth: "160px", margin: "0 auto" }}>
      <Box sx={{ textAlign: "center", minHeight: "106px" }}>
        <img
          width={imageWidth}
          height={imageHeight}
          src={imageSrc}
          alt="checkbox"
        />
      </Box>
      <Box sx={{ fontSize: "12px", textAlign: "center" }}>{description}</Box>
    </Box>
  );
};

export default StepPoint;
