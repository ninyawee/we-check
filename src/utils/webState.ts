/**
 * WebState - Middleware for simulating different election states during testing
 * 
 * This module provides a centralized way to manage election timing states,
 * with support for URL parameter debugging to test different scenarios.
 */

import { REPORT_DATES, START_COUNTING_TIME, VOTE62_SHOW_TIME } from "@/src/config/statusConfig";

/**
 * Enum defining the different web states for election simulation
 */
export enum WebState {
  /** Before election day - no voting or counting features visible */
  BEFORE_ELECTION = "beforeElection",
  /** Election day during voting hours (before vote62ShowTime) */
  OPEN_UNIT_TIME = "openUnitTime",
  /** Election day at vote62ShowTime (16:30) - counting status becomes visible */
  VOTE62_SHOW_TIME = "vote62ShowTime",
  /** Election day at startCountingTime (17:00) - full counting mode */
  START_COUNTING_TIME = "startCountingTime",
}

/**
 * Configuration for WebState debugging
 */
interface WebStateConfig {
  /** Whether to allow query parameter debugging */
  isAllowParamDebugging: boolean;
}

/**
 * Default configuration - debugging disabled by default for production
 */
const defaultConfig: WebStateConfig = {
  isAllowParamDebugging: false,
};

let config: WebStateConfig = { ...defaultConfig };

/**
 * Initialize WebState with configuration
 */
export function initWebState(customConfig: Partial<WebStateConfig>) {
  config = { ...defaultConfig, ...customConfig };
}

/**
 * Get the current web state from query parameters (if debugging is enabled)
 */
function getDebugStateFromUrl(): WebState | null {
  if (!config.isAllowParamDebugging) {
    return null;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const params = new URLSearchParams(window.location.search);
  const stateParam = params.get("webState");

  if (!stateParam) {
    return null;
  }

  // Validate that it's a valid WebState
  const validStates = Object.values(WebState);
  if (validStates.includes(stateParam as WebState)) {
    return stateParam as WebState;
  }

  return null;
}

/**
 * Get a simulated date based on the web state
 */
function getSimulatedDateForState(state: WebState): Date {
  const now = new Date();
  const bangkokTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" })
  );

  // Use the first report date if available, otherwise use current date
  const electionDateStr = REPORT_DATES[0] || null;
  
  let simulatedDate: Date;
  
  if (electionDateStr) {
    // Parse the election date (YYYY-MM-DD format)
    const [year, month, day] = electionDateStr.split("-").map(Number);
    simulatedDate = new Date(year, month - 1, day);
  } else {
    // Use current date if no report dates configured
    simulatedDate = new Date(bangkokTime);
  }

  switch (state) {
    case WebState.BEFORE_ELECTION:
      // Set to one day before the election date
      simulatedDate.setDate(simulatedDate.getDate() - 1);
      simulatedDate.setHours(12, 0, 0, 0);
      break;

    case WebState.OPEN_UNIT_TIME:
      // Election day at 10:00 (during voting, before vote62ShowTime)
      simulatedDate.setHours(10, 0, 0, 0);
      break;

    case WebState.VOTE62_SHOW_TIME:
      // Election day at vote62ShowTime
      simulatedDate.setHours(VOTE62_SHOW_TIME.hour, VOTE62_SHOW_TIME.minute, 0, 0);
      break;

    case WebState.START_COUNTING_TIME:
      // Election day at startCountingTime
      simulatedDate.setHours(START_COUNTING_TIME.hour, START_COUNTING_TIME.minute, 0, 0);
      break;
  }

  return simulatedDate;
}

/**
 * WebState middleware class providing easy access to state-dependent values
 */
export class WebStateManager {
  private debugState: WebState | null;

  constructor() {
    this.debugState = getDebugStateFromUrl();
  }

  /**
   * Get the current time, respecting debug state if active
   */
  getCurrentTime(): Date {
    if (this.debugState) {
      return getSimulatedDateForState(this.debugState);
    }

    // Return Bangkok time
    const now = new Date();
    return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));
  }

  /**
   * Check if today is a report day
   */
  isReportDay(): boolean {
    const currentTime = this.getCurrentTime();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const todayIso = `${currentTime.getFullYear()}-${pad(currentTime.getMonth() + 1)}-${pad(currentTime.getDate())}`;
    return REPORT_DATES.includes(todayIso);
  }

  /**
   * Check if Vote62 counting status should be shown
   * (current time is at or after VOTE62_SHOW_TIME)
   */
  shouldShowVote62(): boolean {
    const currentTime = this.getCurrentTime();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    const { hour: thresholdHour, minute: thresholdMinute } = VOTE62_SHOW_TIME;
    
    return hour > thresholdHour || (hour === thresholdHour && minute >= thresholdMinute);
  }

  /**
   * Check if we're in counting time
   * (current time is at or after START_COUNTING_TIME)
   */
  isCountingTime(): boolean {
    const currentTime = this.getCurrentTime();
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes();

    const { hour: startHour, minute: startMinute } = START_COUNTING_TIME;
    
    return hour > startHour || (hour === startHour && minute >= startMinute);
  }

  /**
   * Get the current debug state (if any)
   */
  getDebugState(): WebState | null {
    return this.debugState;
  }

  /**
   * Check if debugging is active
   */
  isDebugging(): boolean {
    return this.debugState !== null;
  }
}

/**
 * Create a singleton instance for easy use throughout the app
 */
let webStateInstance: WebStateManager | null = null;

/**
 * Get the WebState manager instance (creates one if it doesn't exist)
 */
export function getWebStateManager(): WebStateManager {
  if (typeof window === "undefined") {
    // During SSR, return a new instance each time (no state persistence)
    return new WebStateManager();
  }

  if (!webStateInstance) {
    webStateInstance = new WebStateManager();
  }

  return webStateInstance;
}

/**
 * Reset the singleton instance (useful for testing)
 */
export function resetWebStateManager() {
  webStateInstance = null;
}
