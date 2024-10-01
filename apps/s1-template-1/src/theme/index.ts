import { theme1 } from "./theme1";
import { theme2 } from "./theme2";

const getTheme = (themeNumber: number) => {
  switch (themeNumber) {
    case 2:
      return theme2;
    default:
      return theme1;
  }
};

export const theme = getTheme(1);
