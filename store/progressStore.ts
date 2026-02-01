import { create } from "zustand";
import { UserProgress, defaultProgress } from "@/types/progress";
import { UserProfile } from "@/types/badge";

type ProgressStore = {
  progress: UserProgress;
  profile: UserProfile;
  setProgress: (progress: UserProgress) => void;
  setProfile: (profile: Partial<UserProfile>) => void;
};

const defaultProfile: UserProfile = {
  nickname: "Typing Star",
  avatar: "🐱",
  age: 8,
  soundEnabled: true,
  animationEnabled: true,
};

export const useProgressStore = create<ProgressStore>((set) => ({
  progress: defaultProgress,
  profile: defaultProfile,
  setProgress: (progress) => set({ progress }),
  setProfile: (profile) =>
    set((state) => ({
      profile: { ...state.profile, ...profile },
    })),
}));
