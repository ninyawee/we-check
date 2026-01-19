import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { IUnitData } from "@/src/interfaces/UnitData.interface";
import { ILocation } from "@/src/interfaces/location.interface";
import TwoLineBadge from "./twoLineBadge";
import STATUS_COLORS from "../config/statusColors";
import HorizontalLine from "./horizontalLine";

type Props = {
  data?: IUnitData | ILocation;
  locationGrade?: string;
};

const LocationHeader: FC<Props> = ({ data, locationGrade }) => {
  if (!data) return null;

  const isUnitData = locationGrade === undefined;
  
  let gradeLabel = "ต่ำ";
  let gradeColor = "#cf9100ff";
  if (locationGrade?.includes("A")) {
    gradeLabel = "สูง";
    gradeColor = "#30a766ff";
  }

  const name = isUnitData ? (data as IUnitData).unitName : (data as ILocation).locationName;
  const year = isUnitData ? (data as IUnitData).year : undefined;
  const showOldBadge = isUnitData && ((year && Number(year) !== new Date().getFullYear()) || !year);

  const address = isUnitData
    ? `เขตเลือกตั้งที่ ${(data as IUnitData).divisionNumber} ${(data as IUnitData).subDistrictName} ${(data as IUnitData).districtName} ${(data as IUnitData).provinceName}`
    : `${(data as ILocation).subDistrictName} ${(data as ILocation).districtName} ${(data as ILocation).provinceName}`;

  const statusColor: string = isUnitData
    ? (STATUS_COLORS[(data as IUnitData).status as keyof typeof STATUS_COLORS] ?? STATUS_COLORS.missing)
    : "#000000";

  return (
    <Stack direction={"row"} alignItems={"flex-start"} maxWidth={"80%"}>
      {isUnitData === true ? <TwoLineBadge upperText={"หน่วยที่"} mainText={(data as IUnitData).unitNumber.toString()} color={statusColor} /> : (
        <TwoLineBadge upperText={"แม่นยำ"} mainText={gradeLabel} color={gradeColor} />
      )}

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
