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
    mainBackground: string;
    red: string;
    yellow: string;
    focus: string;
    gray80: string;
    gray50: string;
    gray30: string;
    gray20: string;
    gray10: string;
    gray5: string;
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
    action: {
      disabledBackground: theme.gray30,
      disabled: theme.white,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    yellow: theme.yellow,
    focus: theme.focus,
    gray80: theme.gray80,
    gray50: theme.gray50,
    gray30: theme.gray30,
    gray20: theme.gray20,
    gray10: theme.gray10,
    gray5: theme.gray5,
    text: {
      primary: theme.text,
      secondary: theme.gray30,
    },
  },
  typography: {
    fontFamily: fontFamily,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    button: {
      textTransform: "none",
      color: theme.white,
    },
  },
  components: {
    MuiButton: {
      color: theme.white,
    },
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
