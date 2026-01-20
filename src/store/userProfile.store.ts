import { create } from "zustand";

export interface UserProfile {
  fullname?: string
  phone?: string
  // อีเมล์: optional contact email used instead of the previous boolean contract
  email?: string
  gender?: string
  otherGender?: string
}

interface IUserProfileStore {
  profile: UserProfile | null

  saveProfile: (profile: UserProfile) => void
  loadProfile: () => void
  clearProfile: () => void
  hasProfile: () => boolean
  hasAnyProfile: () => boolean
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
    if (!profile) return false
    // Ensure required fields are present and non-empty
    if (
      !profile.fullname || profile.fullname.trim() === "" ||
      !profile.phone || profile.phone.trim() === "" ||
      !profile.email || profile.email.trim() === "" ||
      !profile.gender || profile.gender.trim() === ""
    ) {
      return false
    }

    if (profile.gender === "Other") {
      return !!profile.otherGender && profile.otherGender.trim() !== ""
    }

    return true
  },

  hasAnyProfile() {
    const { profile } = get()
    if (!profile) return false

    const anyField = !!(
      (profile.fullname && profile.fullname.trim() !== "") ||
      (profile.phone && profile.phone.trim() !== "") ||
      (profile.email && profile.email.trim() !== "")
    )

    return anyField
  }
}))
