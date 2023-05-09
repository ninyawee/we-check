import SvgIcon from "../components/svgIcon";

import { alpha, Box, Button, styled, useTheme } from "@mui/material";
import { SnackbarKey, SnackbarProvider } from "notistack";
import { ReactNode, useRef } from "react";
import { MaterialDesignContent } from "notistack";

const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  ({ theme }) => ({
    "&.notistack-MuiContent": {
      backgroundColor: theme.palette.background.paper,
      borderRadius: "16px",
      boxShadow: `0px 5px 40px rgba(0, 0, 0, 0.2)`,
      color: theme.palette.text.primary,
      padding: `${6}px 16px`,
    },
  })
);

type Props = {
  children: ReactNode;
};

export default function NotistackProvider({ children }: Props) {
  const notistackRef = useRef<any>(null);
  const theme = useTheme();
  const onClose = (key: SnackbarKey) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <>
      <SnackbarProvider
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
          warning: StyledMaterialDesignContent,
        }}
        ref={notistackRef}
        dense
        maxSnack={3}
        preventDuplicate
        autoHideDuration={2000}
        variant="success" // Set default variant
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        iconVariant={{
          info: <SnackbarIcon icon={"/icons/info.svg"} color="info" />,
          success: <SnackbarIcon icon={"/icons/success.svg"} color="success" />,
          warning: <SnackbarIcon icon={"/icons/warning.svg"} color="warning" />,
          error: <SnackbarIcon icon={"/icons/error.svg"} color="error" />,
        }}
        action={(key: any) => (
          <Button
            id={`close_notistack_btn`}
            size="small"
            sx={{
              borderRadius: "10px",
              bgcolor: alpha(theme.palette.info.main, 0.1),
              "&:hover": { bgcolor: alpha(theme.palette.info.dark, 0.1) },
              py: 0.5,
            }}
            onClick={onClose(key)}
          >
            ซ่อน
          </Button>
        )}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}

type SnackbarIconProps = {
  icon: any;
  color: any;
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  const theme: any = useTheme();
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 36,
        height: 36,
        display: "flex",
        borderRadius: "50%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: (theme: any) => `${alpha(theme.palette[color].main, 0.1)}`,
      }}
    >
      <SvgIcon
        icon={icon}
        size={{
          width: "20px",
          height: "20px",
        }}
        color={theme.palette[color].main}
      />
    </Box>
  );
}
