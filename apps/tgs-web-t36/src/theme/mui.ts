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
    green: string;
    red: string;
    mainBackground: string;
    primaryGradient: string;
    BTN01: string;
    BTN02: string;
    grey01: string;
    grey02: string;
    grey03: string;
    grey04: string;
    grey05: string;
    grey10: string;
    supplierMask: string;
    popupBG: string;
    black70: string;
    black50: string;
    black20: string;
    white50: string;
    white20: string;
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
    action: {
      disabledBackground: theme.grey01,
      disabled: theme.white,
    },
    white: theme.white,
    yellow: theme.yellow,
    green: theme.green,
    red: theme.red,
    primaryGradient: theme.primaryGradient,
    mainBackground: theme.mainBackground,
    BTN01: theme.BTN01,
    BTN02: theme.BTN02,
    grey01: theme.grey01,
    grey02: theme.grey02,
    grey03: theme.grey03,
    grey04: theme.grey04,
    grey05: theme.grey05,
    grey10: theme.grey10,
    supplierMask: theme.supplierMask,
    popupBG: theme.popupBG,
    black70: theme.black70,
    black50: theme.black50,
    black20: theme.black20,
    white50: theme.white50,
    white20: theme.white20,
    text: {
      primary: theme.text,
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
