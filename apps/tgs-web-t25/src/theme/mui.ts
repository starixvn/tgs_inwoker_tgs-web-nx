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
    red: string;
    yellow: string;
    green: string;
    mainBackground: string;
    memberBGC: string;
    inputBGC: string;
    grey02: string;
    grey03: string;
    grey04: string;
    grey05: string;
    grey06: string;
    grey07: string;
    black01: string;
    black02: string;
    black03: string;
    black04: string;
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
      disabledBackground: theme.grey06,
      disabled: theme.grey04,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    yellow: theme.red,
    green: theme.green,
    memberBGC: theme.memberBGC,
    inputBGC: theme.inputBGC,
    grey02: theme.grey02,
    grey03: theme.grey03,
    grey04: theme.grey04,
    grey05: theme.grey05,
    grey06: theme.grey06,
    grey07: theme.grey07,
    black01: theme.black01,
    black02: theme.black02,
    black03: theme.black03,
    black04: theme.black04,
    text: {
      primary: theme.grey02,
      secondary: theme.white,
      disabled: theme.textDisable,
    },
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
