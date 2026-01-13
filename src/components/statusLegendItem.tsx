import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import StatusDot from "@/src/components/statusDot";

const StatusLegendItem: FC<{
  color: string;
  label: string;
  small?: string;
  size?: number;
}> = ({ color, label, small, size }) => {
  return (
    <Stack direction="row" alignItems="center">
      <StatusDot color={color} size={size ?? 18} style={{ margin: "0 0.5rem 0 1rem" }} />
      <div>
        <Typography fontSize={"1rem"}>{label}</Typography>
        {small && (
          <Typography color="#A4A4A4" fontSize={"0.875rem"}>
            {small}
          </Typography>
        )}
      </div>
    </Stack>
  );
};

export default StatusLegendItem;
