import { create } from "zustand";
import { useEffect, useState } from "react";
import { getWebStateManager } from "../utils/webState";

interface ITimeStore {
  mockTime: Date | null;
  setMockTime: (time: Date | null) => void;
  getCurrentTime: () => Date;
}

export const useTimeStore = create<ITimeStore>((set, get) => ({
  mockTime: null,

  setMockTime(time) {
    set({ mockTime: time });
  },

  getCurrentTime() {
    const { mockTime } = get();
    if (mockTime) return mockTime;

    // Use WebState manager to get current time (respects debug state)
    const webStateManager = getWebStateManager();
    return webStateManager.getCurrentTime();
  },
}));

/**
 * Hook that returns current time and updates every minute
 * Respects mock time from store for testing/Storybook
 * Also respects WebState debug parameters if enabled
 */
export const useCurrentTime = (): Date => {
  const { getCurrentTime } = useTimeStore();
  const [currentTime, setCurrentTime] = useState<Date>(getCurrentTime());

  useEffect(() => {
    // Update immediately on mount
    setCurrentTime(getCurrentTime());

    // Update every minute
    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000); // 60 seconds

    return () => clearInterval(interval);
  }, [getCurrentTime]);

  return currentTime;
};
