import { Roboto, Kanit } from "next/font/google";
import { alpha, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { backgroundDark } from "../config/color";

export const roboto = Kanit({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900, //900
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#10C487",
    },
    secondary: {
      main: "#e2a138ff",
    },
    error: {
      main: '#C10000',
    },
    background: {
      default: "#f1f5f4",
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiTextField: {
      variants: [
        {
          props: { variant: "outlined" },
          style: ({ theme }) => ({
            "& .MuiInputAdornment-root": {
              marginRight: "0px",
              marginLeft: "12px",
            },
            margin: `0px 0px`,
            "& .MuiAutocomplete-inputRoot": {
              padding: "0px",
              background: backgroundDark(theme.palette.background.default),
            },
            "& .MuiOutlinedInput-multiline": {
              padding: `0.5px 0.5px`,
            },
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              background: backgroundDark(theme.palette.background.default),
              backdropFilter: `blur(4px)`,
              color: theme.palette.text.primary,
              padding: 0,
              paddingRight: 4,
              "& fieldset": {
                border: "unset",
              },

              "&.Mui-focused fieldset": {
                border: `1px solid ${alpha(theme.palette.primary.main, 1)}`,
              },
            },
            "& .MuiOutlinedInput-input": {
              fontSize: 14,
              padding: "10px 12px",
              color: theme.palette.text.primary,
              "&.Mui-disabled": {
                fontSize: 14,
                color: theme.palette.text.secondary,
                WebkitTextFillColor: theme.palette.text.secondary,
              },
              "&:-webkit-autofill": {
                WebkitTextFillColor: theme.palette.text.primary,
              },
              "&::placeholder": {
                fontSize: 14,
                color: theme.palette.text.primary,
              },
            },
            "& .MuiSelect-icon": {
              color: theme.palette.text.primary,
            },
            "& .MuiInputLabel-outlined": {
              fontSize: 14,
              color: theme.palette.text.secondary,
              transform: `translate(14px, 10px) scale(1)`,
            },
            "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
              transform: `translate(14px, -8px) scale(0.75)`,
            },
            "& .MuiFormHelperText-root": {
              margin: 0,
              marginTop: "4px",
            },
          }),
        },
      ],
    },
  },
});

export default theme;
