import { create } from "zustand";

interface UserIdStore {
  userId: string | null;
  setUserId: (userId: string | null) => void;
}

export const useUserIdStore = create<UserIdStore>()((set) => ({
  userId: null,
  setUserId: (userId: string | null) => set({ userId }),
}));
