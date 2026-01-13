import { FC, CSSProperties } from "react";

const StatusDot: FC<{
  color: string;
  size?: number;
  style?: CSSProperties;
}> = ({ color, size = 18, style }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        margin: "0 0.5rem 0 1rem",
        borderRadius: "100%",
        background: color,
        flex: "0 0 auto",
        ...style,
      }}
    />
  );
};

export default StatusDot;
