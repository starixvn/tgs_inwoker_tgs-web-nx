import { theme } from "@/theme";
import { breakpoints } from "@/theme/breakpoints";
import { createTheme, ThemeOptions } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: string;
    black: string;
    red: string;
    green: string;
    orange: string;
    yellow: string;
    darkPurple: string;
    middlePurple: string;
    lightPurple: string;
    mainBackground: string;
    memberSection: string;
    NavBGC: string;
    secBTNBGC: string;
    gray: string;
    gray20: string;
    gray50: string;
    gray60: string;
    supplierMask: string;
    inputBGC: string;
    popupMask: string;
    secPopupMask: string;

    // New template
    playNowButtonBackground: string;
    tabColor: string;
    tabActiveColor: string;
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
      disabledBackground: theme.gray20,
      disabled: theme.gray50,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    green: theme.green,
    orange: theme.orange,
    yellow: theme.yellow,
    darkPurple: theme.darkPurple,
    middlePurple: theme.middlePurple,
    lightPurple: theme.lightPurple,
    memberSection: theme.memberSection,
    NavBGC: theme.NavBGC,
    secBTNBGC: theme.secBTNBGC,
    gray: theme.gray,
    gray20: theme.gray20,
    gray50: theme.gray50,
    gray60: theme.gray60,
    supplierMask: theme.supplierMask,
    inputBGC: theme.inputBGC,
    popupMask: theme.popupMask,
    secPopupMask: theme.secPopupMask,
    text: {
      primary: theme.white,
      secondary: theme.gray50,
    },
    // New template
    playNowButtonBackground: theme.playNowButtonBackground,
    tabColor: theme.tabColor,
    tabActiveColor: theme.tabActiveColor,
  },
  typography: {
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
