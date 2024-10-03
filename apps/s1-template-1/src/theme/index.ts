import { dark } from "./theme-dark";
import { light } from "./theme-light";

const getTheme = (themeNumber: string) => {
  switch (themeNumber) {
    case "light":
      return light;
    default:
      return dark;
  }
};

export const theme = getTheme(import.meta.env.VITE_THEME);
