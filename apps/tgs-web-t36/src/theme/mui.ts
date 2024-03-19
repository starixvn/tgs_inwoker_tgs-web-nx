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
    text: {
      primary: theme.white,
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
