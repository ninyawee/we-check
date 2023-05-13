import { FC } from "react";

const HorizontalLine: FC<{ color?: string }> = ({ color }) => {
  return <div style={{
    width: '100%',
    height: '0.1rem',
    background: color ? color : '#272727'
  }} />
}

export default HorizontalLine
