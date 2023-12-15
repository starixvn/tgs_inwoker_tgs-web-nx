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
    yellow: string;
    tertiary: string;
    mainGradient: string;
    mainBackground: string;
    mainDarkBackground: string;
    mainLightBackground: string;
    black: string;
    red: string;
    secondBackground: string;
    iconLable: string;
    accountLableText: string;
    priBTNOutline: string;
    toggleDefault: string;
    activeNav: string;
    secBTNOutline: string;
    tabText: string;
    navbar: string;
    header: string;
    sideMenu: string;
    accountBGC: string;
    black60: string;
    black30: string;
    neutralBlack: string;
    supplierMask: string;
    white30: string;
    white50: string;
    white60: string;
    primaryGradient: string;
    secondaryGradient: string;
    tertiaryGradient: string;
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
      disabledBackground: theme.white30,
      disabled: theme.white60,
    },
    text: {
      primary: theme.text,
    },
    white: theme.white,
    black: theme.black,
    green: theme.green,
    red: theme.red,
    yellow: theme.yellow,
    primaryGradient: theme.primaryGradient,
    secondaryGradient: theme.secondaryGradient,
    tertiaryGradient: theme.tertiaryGradient,
    mainBackground: theme.mainBackground,
    secondBackground: theme.secondBackground,
    iconLable: theme.iconLable,
    accountLableText: theme.accountLableText,
    priBTNOutline: theme.priBTNOutline,
    toggleDefault: theme.toggleDefault,
    activeNav: theme.activeNav,
    secBTNOutline: theme.secBTNOutline,
    tabText: theme.tabText,
    navbar: theme.navbar,
    header: theme.header,
    sideMenu: theme.sideMenu,
    accountBGC: theme.accountBGC,
    black60: theme.black60,
    black30: theme.black30,
    supplierMask: theme.supplierMask,
    white30: theme.white30,
    white50: theme.white50,
    white60: theme.white60,
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
            color: theme.text,
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
