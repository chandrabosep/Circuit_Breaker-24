import { create } from "zustand";

interface Store {
  Reviewer: boolean;
  updateReviewer: (e: boolean) => void;
  Freelancer: boolean;
  updateFreelancer: (e: boolean) => void;
  Employer: boolean;
  updateEmployer: (e: boolean) => void;
}

export const useStore = create<Store>((set) => ({
  Reviewer: false,
  updateReviewer: (e: boolean) => set({ Reviewer: e }),
  Freelancer: false,
  updateFreelancer: (e: boolean) => set({ Freelancer: e }),
  Employer: false,
  updateEmployer: (e: boolean) => set({ Employer: e }),
}));
