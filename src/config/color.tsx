import Color from "color";

export const backgroundDark = (color: string) => {
  return Color(color).darken(0.08).hex();
};
