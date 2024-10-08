import config from "@tgs-web-nx/config";

import { ThemeType } from "./constants";
import { dark } from "./theme-dark";
import { light } from "./theme-light";

const getTheme = (theme: string) => {
  switch (theme) {
    case ThemeType.LIGHT:
      return light;
    default:
      return dark;
  }
};

export const theme = getTheme(config.theme);
