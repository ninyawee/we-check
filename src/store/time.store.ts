import { create } from "zustand";
import { useEffect, useState } from "react";

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

    // Always return Bangkok time (Asia/Bangkok, UTC+7)
    // Get current time in Bangkok timezone
    const bangkokTime = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Bangkok" }),
    );
    return bangkokTime;
  },
}));

/**
 * Hook that returns current time and updates every minute
 * Respects mock time from store for testing/Storybook
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
