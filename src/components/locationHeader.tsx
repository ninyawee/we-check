import { Stack, Typography, Box } from "@mui/material";
import { FC } from "react";
import { IUnitData } from "@/src/interfaces/UnitData.interface";
import { ILocation } from "@/src/interfaces/location.interface";

type Props = {
  data?: IUnitData | ILocation;
  locationGrade?: string;
};

const LocationHeader: FC<Props> = ({ data, locationGrade }) => {
  if (!data) return null;

  const isUnitData = (d: any): d is IUnitData => d && typeof d.unitName === "string";

  const rawGrade = (
    (isUnitData(data) ? locationGrade : (data as ILocation).locationGrade) || "D"
  ).toString();

  let gradeLabel = "ต่ำ";
  let gradeColor = "#cf9100ff";
  if (rawGrade.includes("A")) {
    gradeLabel = "สูง";
    gradeColor = "#30a766ff";
  }

  const name = isUnitData(data) ? data.unitName : (data as ILocation).locationName;
  const year = isUnitData(data) ? (data as IUnitData).year : undefined;
  const showOldBadge = isUnitData(data) && ((year && Number(year) !== new Date().getFullYear()) || !year);

  const address = isUnitData(data)
    ? `หน่วย ${data.unitNumber} ${data.subDistrictName} เขต ${data.divisionNumber} ${data.provinceName}`
    : `${(data as ILocation).subDistrictName} ${(data as ILocation).provinceName}`;

  return (
    <Stack direction={"row"} alignItems={"flex-start"} maxWidth={"80%"}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          color: "#000",
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "0.5rem",
          padding: "0.25rem",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          border: `1px solid ${gradeColor}`,
          marginRight: "0.75rem",
        }}
      >
        <Typography
          fontSize={"0.75rem"}
          fontWeight={200}
          sx={{ lineHeight: 1, textAlign: "center", color: gradeColor }}
        >
          แม่นยำ
        </Typography>
        <Typography
          fontSize={"1.25rem"}
          fontWeight={700}
          sx={{ lineHeight: 1, marginTop: "0.3rem", textAlign: "center", color: gradeColor }}
        >
          {gradeLabel}
        </Typography>
      </Box>

      <Stack direction={"column"} justifyContent={"space-between"} flex={1}>
        <Stack direction={"row"} alignItems={"center"}>
          <Typography fontSize={"1.125rem"} sx={{ wordWrap: "break-word", color: "#FFFFFF" }}>
            {name}
            {showOldBadge && (
              <Typography
                component="span"
                fontSize={"0.7rem"}
                sx={{
                  backgroundColor: "#424242",
                  color: "#FFF",
                  padding: "0.125rem 0.5rem",
                  borderRadius: "0.5rem",
                  marginLeft: "0.5rem",
                  display: "inline-block",
                  verticalAlign: "middle",
                }}
              >
                {year ? `ข้อมูลเก่าปี ${year}` : "ข้อมูลเก่า"}
              </Typography>
            )}
          </Typography>
        </Stack>
        <Stack direction={"row"} marginBottom={"0.875rem"}>
          <Typography fontSize={"0.8rem"} color="#A4A4A4">
            {address}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LocationHeader;
