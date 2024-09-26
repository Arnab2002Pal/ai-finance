import { atom } from "recoil";

export const selectedDashboardState = atom<string | null>({
  key: "selectedDashboardState",
  default: null,
});
