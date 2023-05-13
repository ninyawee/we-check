import { create } from "zustand";

interface ILayoutStore {
  isDesktopConfirm: boolean,

  setIsDesktopConfirm: (isDesktopConfirm: boolean) => void
}

export const useLayoutStore = create<ILayoutStore>((set, get) => ({
  isDesktopConfirm: false,

  setIsDesktopConfirm(isDesktopConfirm: boolean) {
    set({ isDesktopConfirm })
  }
}))
