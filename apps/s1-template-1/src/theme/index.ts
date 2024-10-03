import { dark } from "./theme-dark";
import { light } from "./theme-light";
import { ThemeType } from "./theme-type";

const getTheme = (theme: string) => {
  switch (theme) {
    case ThemeType.LIGHT:
      return light;
    default:
      return dark;
  }
};

export const theme = getTheme(import.meta.env.VITE_THEME);
