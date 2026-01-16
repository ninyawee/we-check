import { ILocation } from "../interfaces/location.interface";
import { UserProfile } from "../store/userProfile.store";
import { START_COUNTING_TIME } from "../config/statusConfig";

// Maximum length for free-text URL params to limit abuse/XSS surface
const MAX_OTHER_GENDER_LENGTH = 100;

/**
 * Basic sanitization for free-text URL parameters.
 * - trims whitespace
 * - strips < and > and script tags
 * - collapses repeated whitespace
 * - enforces a max length
 */
function sanitizeParam(value: string | undefined | null, maxLength = MAX_OTHER_GENDER_LENGTH): string {
  if (!value) return "";
  let v = String(value).trim();
  // Remove any script tags just in case
  v = v.replace(/<\/?script[^>]*>/gi, "");
  // Remove angle brackets and backticks to reduce HTML injection risk
  v = v.replace(/[<>`]/g, "");
  // Collapse multiple whitespace into single spaces
  v = v.replace(/\s+/g, " ");
  // Enforce max length
  if (v.length > maxLength) {
    v = v.slice(0, maxLength);
  }
  return v;
}

/**
 * Builds WeWatch Google Form URL with pre-filled parameters
 * Switches between openUnitForm and closeUnitForm based on time
 */
export function buildWeWatchUrl(
  profile: UserProfile | null,
  location: ILocation,
  currentTime: Date,
): string {
  // Determine which form based on time (17:00 is the cutoff)
  // currentTime should already be in Bangkok timezone from time.store
  const hour = currentTime.getHours();
  const minutes = currentTime.getMinutes();

  // Use configured start counting time from statusConfig
  const startHour = START_COUNTING_TIME.hour;
  const startMinute = START_COUNTING_TIME.minute;
  const isCountingTime =
    hour > startHour || (hour === startHour && minutes >= startMinute);

  // Format current time as HH:MM
  const timeString = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  if (isCountingTime) {
    // closeUnitForm - for counting period (17:00+)
    const baseUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSc6fqn-QCNl1fJbpS9-F0IjIWLQRrZVCtiR2GKkdv_v6j7OaQ/viewform";

    const params = new URLSearchParams({
      usp: "pp_url",
    });

    // Add profile data if available
    if (profile) {
      params.append("entry.914367438", sanitizeParam(profile.fullname));
      params.append("entry.1339837169", sanitizeParam(profile.phone));
      params.append("entry.1063152687", sanitizeParam(profile.contract ? "ยอมรับ" : ""));
      params.append(
        "entry.1442150213",
        profile.gender === "Other" ? "__other_option__" : sanitizeParam(profile.gender)
      );
      // If user provided an 'Other' gender text, include it as the other_option_response
      if (profile.otherGender && profile.otherGender.trim() !== "") {
        params.append(
          "entry.1442150213.other_option_response",
          sanitizeParam(profile.otherGender)
        );
      }
    }

    // Add location data
    params.append("entry.1289712015", location.provinceName);
    params.append("entry.1335460006", location.districtName);
    params.append("entry.531368750", location.subDistrictName);
    params.append("entry.552451457", String(location.divisionNumber));
    params.append("entry.1977709354", String(location.unitNumber));
    params.append("entry.1537099240", location.unitName);
    params.append("entry.523403712", timeString);

    return `${baseUrl}?${params.toString()}`;
  } else {
    // openUnitForm - for voting period (before 17:00)
    const baseUrl =
      "https://docs.google.com/forms/d/e/1FAIpQLSfunOjsEf545OOE3IpBRw2wen94iAQ9F2NJ4lZgpQFtnUOH_A/viewform";

    const params = new URLSearchParams({
      usp: "pp_url",
    });

    // Add profile data if available
    if (profile) {
      params.append("entry.2021355207", sanitizeParam(profile.fullname));
      params.append("entry.952897360", sanitizeParam(profile.phone));
      params.append("entry.1360317965", sanitizeParam(profile.contract ? "ยอมรับ" : ""));
      params.append(
        "entry.894194842",
        profile.gender === "Other" ? "__other_option__" : sanitizeParam(profile.gender)
      );
      // If user provided an 'Other' gender text, include it as the other_option_response
      if (profile.otherGender && profile.otherGender.trim() !== "") {
        params.append(
          "entry.894194842.other_option_response",
          sanitizeParam(profile.otherGender)
        );
      }
    }

    // Add location data
    params.append("entry.1727758919", location.provinceName);
    params.append("entry.685831041", location.districtName);
    params.append("entry.857868804", location.subDistrictName);
    params.append("entry.1838097284", String(location.divisionNumber));
    params.append("entry.1378064658", String(location.unitNumber));
    params.append("entry.510655996", String(location.unitId));
    params.append("entry.1684477210", timeString);

    return `${baseUrl}?${params.toString()}`;
  }
}

/**
 * Builds Vote62 custom form URL with proper encoding
 * Format: provinceName--districtName--subDistrictName--provinceName.divisionNumber--unitNumberunitName--
 */
export function buildVote62Url(location: ILocation): string {
  const baseUrl = "https://www.vote62.com/66/check-in/polling-station/?id=";

  // Zero-pad divisionNumber to 2 digits
  const paddedDivision = String(location.divisionNumber).padStart(2, "0");

  // Replace spaces with %20 in unitName
  const encodedUnitName = location.unitName.replace(/ /g, "%20");

  // unitNumber does NOT need zero-padding
  const unitNumber = location.unitNumber;

  // Build the id parameter
  const id = [
    location.provinceName,
    `--${location.districtName}`,
    `--${location.subDistrictName}`,
    `--${location.provinceName}.${paddedDivision}`,
    `--${unitNumber}${encodedUnitName}`,
    `--`, // Empty code for now
  ].join("");

  return `${baseUrl}${id}`;
}

/**
 * Validates if location has all required data for URL building
 */
export function validateLocationData(location: ILocation | null): {
  valid: boolean;
  message?: string;
} {
  if (!location) {
    return { valid: false, message: "ไม่พบข้อมูลหน่วยเลือกตั้ง" };
  }

  if (
    !location.provinceName ||
    !location.districtName ||
    !location.subDistrictName
  ) {
    return { valid: false, message: "ข้อมูลสถานที่ไม่ครบถ้วน" };
  }

  if (!location.unitName || location.unitNumber === undefined) {
    return { valid: false, message: "ข้อมูลหน่วยเลือกตั้งไม่ครบถ้วน" };
  }

  return { valid: true };
}
