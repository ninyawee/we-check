import { create } from "zustand";

export interface UserProfile {
  fullname: string
  phone: string
  contract: boolean
  gender: string
}

interface IUserProfileStore {
  profile: UserProfile | null

  saveProfile: (profile: UserProfile) => void
  loadProfile: () => void
  clearProfile: () => void
  hasProfile: () => boolean
}

const STORAGE_KEY = "wecheck_user_profile"

export const useUserProfileStore = create<IUserProfileStore>((set, get) => ({
  profile: null,

  saveProfile(profile) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile))
      set({ profile })
    } catch (error) {
      console.error("Failed to save profile to localStorage:", error)
    }
  },

  loadProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const profile = JSON.parse(stored) as UserProfile
        set({ profile })
      }
    } catch (error) {
      console.error("Failed to load profile from localStorage:", error)
    }
  },

  clearProfile() {
    try {
      localStorage.removeItem(STORAGE_KEY)
      set({ profile: null })
    } catch (error) {
      console.error("Failed to clear profile from localStorage:", error)
    }
  },

  hasProfile() {
    const { profile } = get()
    return profile !== null &&
           profile.fullname !== "" &&
           profile.phone !== "" &&
           profile.contract &&
           profile.gender !== ""
  }
}))
