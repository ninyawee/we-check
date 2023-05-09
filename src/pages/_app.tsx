import type { AppProps } from "next/app";
import { Fragment } from "react";
import theme from "../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import "../styles/globals.css";
import dynamic from "next/dynamic";

const NotistackProvider = dynamic(
  () => import("../context/snackbarContext").then((mod) => mod.default),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotistackProvider>
          <Component {...pageProps} />
        </NotistackProvider>
      </ThemeProvider>
    </Fragment>
  );
}
