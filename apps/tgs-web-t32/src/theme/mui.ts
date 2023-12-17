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
    mainBackground: string;
    btnPri: string;
    btnSec: string;
    maskPopup: string;
    maskBlack50: string;
    maskBlack20: string;
    maskAccent: string;
    maskWhite50: string;
    maskWhite20: string;
    footerBGC: string;
    supplierMask: string;
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
      disabledBackground: theme.maskBlack20,
      disabled: theme.white,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    yellow: theme.yellow,
    btnPri: theme.btnPri,
    btnSec: theme.btnSec,
    maskPopup: theme.maskPopup,
    maskBlack50: theme.maskBlack50,
    maskBlack20: theme.maskBlack20,
    maskAccent: theme.maskAccent,
    maskWhite50: theme.maskWhite50,
    maskWhite20: theme.maskWhite20,
    footerBGC: theme.footerBGC,
    supplierMask: theme.supplierMask,
    text: {
      primary: theme.text,
      secondary: theme.maskBlack20,
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
