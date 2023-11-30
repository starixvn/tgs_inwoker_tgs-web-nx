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
    green: string;
    red: string;
    yellow: string;
    mask: string;
    grey00: string;
    grey01: string;
    grey02: string;
    grey03: string;
    maskPopupBG: string;
    maskBlack50: string;
    maskBlack20: string;
    maskWhite50: string;
    maskWhite20: string;
    mainBackground: string;
  }
}

const muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: breakpoints.xs,
      tiny: breakpoints.tiny,
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
      disabledBackground: theme.maskBlack50,
      disabled: theme.white,
    },
    text: {
      primary: theme.text,
      secondary: theme.grey01,
    },
    white: theme.white,
    black: theme.black,
    green: theme.green,
    red: theme.red,
    yellow: theme.yellow,
    mask: theme.mask,
    grey00: theme.grey00,
    grey01: theme.grey01,
    grey02: theme.grey02,
    grey03: theme.grey03,
    maskPopupBG: theme.maskPopupBG,
    maskBlack50: theme.maskBlack50,
    maskBlack20: theme.maskBlack20,
    maskWhite50: theme.maskWhite50,
    maskWhite20: theme.maskWhite20,
    mainBackground: theme.mainBackground,
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
