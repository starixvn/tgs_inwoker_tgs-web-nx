import { dark } from "./theme-dark";
import { light } from "./theme-light";

const getTheme = (theme: string) => {
  switch (theme) {
    case "light":
      return light;
    default:
      return dark;
  }
};

export const theme = getTheme(import.meta.env.VITE_THEME);
