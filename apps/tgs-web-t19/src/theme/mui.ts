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
    pureBlack: string;
    mainBackground: string;
    btnGradient: string;
    red: string;
    silverGradient: string;
    primaryGradient: string;
    goldGradient: string;
    gray: string;
    btnHover: string;
    // 下面慢慢修樣式拿掉
    blue10: string;
    blue20: string;
    blue30: string;
    blue40: string;
    blue50: string;
    blue60: string;
    gray10: string;
    gray20: string;
    gray30: string;
    gray40: string;
    gray50: string;
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
    pureBlack: theme.pureBlack,
    mainBackground: theme.mainBackground,
    btnGradient: theme.btnGradient,
    red: theme.red,
    primaryGradient: theme.primaryGradient,
    silverGradient: theme.silverGradient,
    goldGradient: theme.goldGradient,
    btnHover: theme.btnHover,
    blue10: theme.blue10,
    blue20: theme.blue20,
    blue30: theme.blue30,
    blue40: theme.blue40,
    blue50: theme.blue50,
    blue60: theme.blue60,
    gray10: theme.gray10,
    gray20: theme.gray20,
    gray30: theme.gray30,
    gray40: theme.gray40,
    gray50: theme.gray50,
    text: {
      primary: theme.text,
      secondary: theme.gray20,
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
