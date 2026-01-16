export const VOTE62_SHOW_TIME = {
  // local device hour and minute when 'counting' status becomes visible in the intro panel
  hour: 16,
  minute: 30,
};

// Backwards compatibility: older code referenced `COUNTING_THRESHOLD`.
// Keep an alias so renaming doesn't break other modules.
export const COUNTING_THRESHOLD = VOTE62_SHOW_TIME;

// Local device hour and minute when we consider the app to be in 'counting' time
// Used by URL builders and other logic that needs a strict start time.
export const START_COUNTING_TIME = {
  hour: 17,
  minute: 0,
};

// Target number of volunteers desired for Vote62 at a location
export const targetVote62VolunteerCount = 3;

// List of dates (local device) when locations should accept situation reports.
// Use ISO date strings `YYYY-MM-DD`. Example: ['2026-01-17', '2026-01-18']
export const REPORT_DATES: string[] = ['2026-02-01' , '2026-02-08'];
