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
    gray: string;
    lighterGray: string;
    lightGray: string;
    tertiary: string;
    mainBackground: string;
    mainDarkBackground: string;
    mainLightBackground: string;
    primaryGradient: string;
    secondaryGradient: string;
    primaryMix: string;
    secondaryMix: string;
    tagColor: string;
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
      primary: theme.text,
      secondary: theme.gray,
    },
    white: theme.white,
    black: theme.black,
    yellow: theme.yellow,
    gray: theme.gray,
    lighterGray: theme.lighterGray,
    darkGray: theme.darkGray,
    lightGray: theme.lightGray,
    mainBackground: theme.mainBackground,
    mainDarkBackground: theme.mainDarkBackground,
    primaryGradient: theme.primaryGradient,
    secondaryGradient: theme.secondaryGradient,
    primaryMix: theme.primaryMix,
    secondaryMix: theme.secondaryMix,
    tagColor: theme.tagColor,
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
