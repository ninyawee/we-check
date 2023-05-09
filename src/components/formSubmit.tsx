import { Close, Image } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, Fragment, useMemo, useState } from "react";
import { backgroundDark } from "../config/color";
import Scrollbar from "./scrollbar";
import { fileUpload } from "../apis/other";
import { postFeature } from "../apis/features";
import { enqueueSnackbar } from "notistack";

const FormSubmit: FC<{ featureSelected: any; onClose: () => void }> = ({
  featureSelected,
  onClose,
}) => {
  const theme = useTheme();

  const [state, setState] = useState<{
    name: string;
    status: "ปรกติ" | "ผิดปรกติ";
    images: any[];
    unusualDetail?: string;
  }>({ name: "", status: "ปรกติ", images: [] });

  const [files, setFiles] = useState<any>(null);

  useMemo(() => {
    setState((s) => ({ ...s, name: featureSelected?.name ?? "" }));
  }, [featureSelected]);

  const onSubmit = async () => {
    let inputState = { ...state };

    if (files) {
      var formData = new FormData();
      formData.append("files", files, files.name);

      const resultUpload: any = await fileUpload(formData);
      console.log(resultUpload);

      if (resultUpload.status === 200) {
        inputState.images = resultUpload.data?.files ?? [];
      }
    }

    const inputFeatureCollection = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [
              Number(featureSelected.longitude) ?? 0,
              Number(featureSelected.latitude) ?? 0,
            ],
          },
          properties: {
            ...inputState,
            vectorTilesId: featureSelected._id,
            unusualDetail: inputState.unusualDetail ?? "",
          },
        },
      ],
    };

    const addFeatures: any = await postFeature(inputFeatureCollection);

    if (addFeatures.status === 201) {
      enqueueSnackbar("ขอบคุณสำหรับการรายงานของท่าน", { variant: "success" });
      onClose();
    } else {
      enqueueSnackbar("โปรดลองอีกครั้งในภายหลัง", { variant: "warning" });
    }
  };

  return (
    <Fragment>
      <Stack
        direction={"column"}
        justifyContent={"space-between"}
        sx={{
          height: "100%",
          bgcolor: "background.default",
          borderTopRightRadius: "20px",
          borderTopLeftRadius: "20px",
          boxShadow: "unset",
        }}
      >
        <Box component={"div"}>
          <Stack p={2.5} pb={0}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              mb={1.5}
            >
              <Typography variant="subtitle1" fontWeight={800}>
                รายงานสถานะหน่วยเลือกตั้ง
              </Typography>
              <IconButton
                size="small"
                sx={{ bgcolor: "action.selected" }}
                onClick={onClose}
              >
                <Close style={{ fontSize: 14 }} />
              </IconButton>
            </Stack>
            <Scrollbar
              sx={{
                maxHeight: "calc(100vh - 468px)",
              }}
            >
              <Grid container spacing={1.5}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="หน่วยเลือกตั้ง"
                    value={state.name}
                    onChange={(e) =>
                      setState((s) => ({ ...s, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      สถานะ
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      value={state.status}
                      onChange={(e) => {
                        if (e.target.value === "ปรกติ") {
                          setState((s) => ({
                            ...s,
                            status: e.target.value as any,
                            unusualDetail: "",
                          }));
                        } else {
                          setState((s) => ({
                            ...s,
                            status: e.target.value as any,
                          }));
                        }
                      }}
                    >
                      <FormControlLabel
                        value="ปรกติ"
                        control={<Radio />}
                        label="ปรกติ"
                      />
                      <FormControlLabel
                        value="ผิดปรกติ"
                        control={<Radio />}
                        label="ผิดปรกติ"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>

                {state.status === "ผิดปรกติ" ? (
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="คำอธิบายเพิ่มเติม"
                      multiline
                      minRows={2}
                      maxRows={4}
                      value={state.unusualDetail}
                      onChange={(e) =>
                        setState((s) => ({
                          ...s,
                          unusualDetail: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                ) : null}

                <Grid item xs={12}>
                  <Stack
                    direction={"row"}
                    alignItems={"cente"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="subtitle1" fontWeight={800}>
                      อัปโหลดรูปภาพ
                    </Typography>
                    {files ? (
                      <Typography
                        variant="subtitle1"
                        fontWeight={800}
                        color="info.main"
                        onClick={() => {
                          setFiles(null);
                        }}
                      >
                        ยกเลิก
                      </Typography>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  {files ? (
                    <Box
                      sx={{
                        height: "8rem",
                        backgroundImage: `url(${URL.createObjectURL(files)})`,
                        borderRadius: "20px",
                        width: "100%",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        border: `2px solid ${backgroundDark(
                          theme.palette.primary.main
                        )}`,
                      }}
                    ></Box>
                  ) : (
                    <Box
                      component="label"
                      sx={{
                        borderRadius: "20px",
                        bgcolor: backgroundDark(
                          theme.palette.background.default
                        ),
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "8rem",
                      }}
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={(e) => {
                          if (e.target.files) {
                            setFiles(e.target.files[0]);
                          }
                        }}
                      />
                      <Stack
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Image style={{ fontSize: 32 }} />
                        <Typography variant="subtitle2">
                          เรื่องรูปภาพของคุณที่จะอัปโหลด
                        </Typography>
                      </Stack>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Scrollbar>
          </Stack>
        </Box>

        <Box p={2.5} pt={0}>
          <Stack spacing={1.5} direction={"row"} alignItems={"center"}>
            <Button
              fullWidth
              sx={{
                borderRadius: "20px",
                width: "30%",
                bgcolor: "primary.main",
                color: "white",
              }}
              onClick={onClose}
            >
              ยกเลิก
            </Button>
            <Button
              fullWidth
              sx={{
                bgcolor: "secondary.main",
                borderRadius: "20px",
                width: "70%",
                "&.Mui-disabled": {
                  bgcolor: "action.selected",
                },
              }}
              disabled={!state.name}
              onClick={onSubmit}
            >
              รายงาน
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Fragment>
  );
};

export default FormSubmit;
