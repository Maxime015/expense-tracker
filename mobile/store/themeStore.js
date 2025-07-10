// store/themeStore.js
import { create } from "zustand";
import { THEMES } from "../constants/colors";

export const useThemeStore = create((set) => ({
  isDarkMode: false, // Activation directe du dark mode
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
  getCurrentTheme: () => {
    const theme = useThemeStore.getState().isDarkMode
      ? THEMES.midnight
      : THEMES.ocean;
    return theme;
  },
}));
