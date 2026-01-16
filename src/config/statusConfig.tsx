export const COUNTING_THRESHOLD = {
  // local device hour and minute when 'counting' status becomes visible in the intro panel
  hour: 16,
  minute: 30,
};

// Target number of volunteers desired for Vote62 at a location
export const targetVote62VolunteerCount = 3;

// List of dates (local device) when locations should accept situation reports.
// Use ISO date strings `YYYY-MM-DD`. Example: ['2026-01-17', '2026-01-18']
export const REPORT_DATES: string[] = ['2026-02-01' , '2026-02-08'];

export default COUNTING_THRESHOLD;
