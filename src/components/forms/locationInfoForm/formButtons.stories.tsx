import type { Meta, StoryObj } from "@storybook/react";
import FormButtons from "./formButtons";
import { useTimeStore } from "@/src/store/time.store";
import { useLocationStore } from "@/src/store/location.store";
import { useUserProfileStore } from "@/src/store/userProfile.store";
import { useEffect } from "react";
import { ILocation } from "@/src/interfaces/location.interface";

const meta: Meta<typeof FormButtons> = {
  title: "Forms/FormButtons",
  component: FormButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormButtons>;

const mockLocation: ILocation = {
  unitId: 12345,
  unitName: "โรงเรียนทีปังกรวิทยาพัฒน์ (วัดโบสถ์) ถนนสามเสน",
  provinceName: "กรุงเทพมหานคร",
  divisionNumber: 1,
  districtName: "เขตดุสิต",
  subDistrictName: "ดุสิต",
  unitNumber: 1,
  color: "green",
  isObservationValid: true,
  latitude: 13.7563,
  longitude: 100.5018,
  lastObservedTime: "2024-01-20T10:30:00",
  incidentCount: 0,
  incidentJson: "",
  incidentStr: "",
  googleMapUrl: "https://maps.google.com/?q=13.7563,100.5018",
};

// Decorator to setup stores - sets state synchronously before render
const withStoreSetup = (
  time: Date,
  hasProfile: boolean = false
) => {
  return (Story: any) => {
    // Set state synchronously BEFORE render (not in useEffect)
    useTimeStore.getState().setMockTime(time);
    useLocationStore.getState().setSelectedLocation(mockLocation);

    if (hasProfile) {
      useUserProfileStore.getState().saveProfile({
        fullname: "สมชาย ใจดี",
        phone: "0812345678",
        contract: true,
        gender: "ชาย",
      });
    } else {
      useUserProfileStore.getState().clearProfile();
    }

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        useTimeStore.getState().setMockTime(null);
      };
    }, []);

    return <Story />;
  };
};

// Morning time - Before Vote62 enabled (10:00 AM)
export const MorningTime: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 10, 0))],
  parameters: {
    docs: {
      description: {
        story:
          "Before 16:30 - Vote62 button is disabled. WeWatch shows voting period form.",
      },
    },
  },
};

// Exactly at Vote62 enable time (16:30)
export const Vote62EnableTime: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 16, 30))],
  parameters: {
    docs: {
      description: {
        story:
          "At 16:30 - Vote62 button becomes enabled. WeWatch still shows voting period form.",
      },
    },
  },
};

// After Vote62 enabled but before counting (16:35)
export const Vote62Enabled: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 16, 35))],
  parameters: {
    docs: {
      description: {
        story:
          "After 16:30 - Vote62 button is enabled. WeWatch still shows voting period form.",
      },
    },
  },
};

// Exactly at counting time (17:00)
export const CountingTimeExact: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 17, 0))],
  parameters: {
    docs: {
      description: {
        story:
          "At 17:00 - WeWatch switches to counting period form. Vote62 is enabled.",
      },
    },
  },
};

// Evening counting time (18:00)
export const CountingTime: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 18, 0))],
  parameters: {
    docs: {
      description: {
        story:
          "After 17:00 - Both buttons active. WeWatch shows counting period form.",
      },
    },
  },
};

// With saved profile
export const WithProfile: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 14, 0), true)],
  parameters: {
    docs: {
      description: {
        story:
          "User has saved profile - Clicking WeWatch opens form directly with pre-filled data.",
      },
    },
  },
};

// Without profile
export const WithoutProfile: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 14, 0), false)],
  parameters: {
    docs: {
      description: {
        story:
          "User has no saved profile - Clicking WeWatch shows confirmation dialog to save profile.",
      },
    },
  },
};

// Late night (after all voting)
export const LateNight: Story = {
  decorators: [withStoreSetup(new Date(2024, 0, 20, 22, 0))],
  parameters: {
    docs: {
      description: {
        story:
          "Late at night - Both buttons active, showing counting period form.",
      },
    },
  },
};
