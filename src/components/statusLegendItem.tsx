import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import StatusDot from "@/src/components/statusDot";

const StatusLegendItem: FC<{
  color: string;
  label: string;
  small?: string;
  size?: number;
  compact?: boolean;
}> = ({ color, label, small, size, compact = false }) => {
  const dotSize = compact ? size ?? 14 : size ?? 18;
  const labelSize = compact ? "0.95rem" : "1rem";

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <StatusDot color={color} size={dotSize} style={{ margin: compact ? "0 0.5rem 0 0.5rem" : "0 0.5rem 0 1rem" }} />
      <div>
        <Typography fontSize={labelSize}>{label}</Typography>
        {!compact && small && (
          <Typography color="#A4A4A4" fontSize={"0.875rem"}>
            {small}
          </Typography>
        )}
      </div>
    </Stack>
  );
};

export default StatusLegendItem;
