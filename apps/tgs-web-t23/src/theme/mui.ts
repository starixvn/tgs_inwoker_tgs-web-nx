import { createTheme, ThemeOptions } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { breakpoints } from "@/theme/breakpoints";
import { fontFamily } from "@/theme/fontFamily";
import { theme } from "@/theme";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: string;
    black: string;
    yellow: string;
    tertiary: string;
    mainGradient: string;
    mainBackground: string;
    mainDarkBackground: string;
    mainLightBackground: string;
  }
}

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      sm: breakpoints.sm,
      md: breakpoints.md,
      lg: breakpoints.lg,
      xl: breakpoints.xl,
    },
  },
  palette: {
    primary: {
      main: theme.primary,
    },
    secondary: {
      main: theme.secondary,
    },
    tertiary: {
      main: theme.lighterGray,
    },
    action: {
      disabledBackground: theme.gray,
      disabled: theme.white,
    },
    text: {
      primary: theme.white,
      secondary: theme.gray,
    },
    white: theme.white,
    yellow: "#f4bd29",
    black: theme.black,
    mainGradient: theme.secondaryGradient,
    mainBackground: theme.mainBackground,
    mainDarkBackground: theme.mainDarkBackground,
    mainLightBackground: theme.mainLightBackground,
  },
  typography: {
    fontFamily: fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          "& .MuiButtonBase-root": {
            color: "#707070",
            "&:hover": {
              // backgroundColor: "#your_hover_color_here", // 设置鼠标悬停时的背景颜色
            },
          },
        },
      },
    },
  },
} as ThemeOptions);

export { muiTheme };
