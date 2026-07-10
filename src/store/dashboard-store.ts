import { create } from "zustand";
import { TimeRange } from "@/src/types/portfolio";

// Defines the shape of our dashboard's global state
interface DashboardState {
  // Currently selected time range filter (e.g. "1M", "1Y")
  selectedTimeRange: TimeRange;
  // Currently selected sector filter, null means "all sectors"
  selectedSector: string | null;
  // Whether dark mode is enabled
  isDarkMode: boolean;

  // Actions to update the state
  setTimeRange: (range: TimeRange) => void;
  setSector: (sector: string | null) => void;
  toggleDarkMode: () => void;
}

// Zustand store for dashboard-wide filters and UI state
export const useDashboardStore = create<DashboardState>((set) => ({
  selectedTimeRange: "1M",
  selectedSector: null,
  isDarkMode: false,

  setTimeRange: (range) => set({ selectedTimeRange: range }),
  setSector: (sector) => set({ selectedSector: sector }),
  toggleDarkMode: () =>
    set((state) => ({ isDarkMode: !state.isDarkMode })),
}));