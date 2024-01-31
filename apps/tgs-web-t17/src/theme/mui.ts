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
    mainBackground: string;
    primaryGradient: string;
    gray: string;
    lightGray: string;
    darkGray: string;
    black: string;
    disabledGray: string;
    btnHover: string;
    picMask: string;
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
      disabledBackground: theme.gray,
      disabled: theme.white,
    },
    white: theme.white,
    mainBackground: theme.mainBackground,
    primaryGradient: theme.primaryGradient,
    gray: theme.gray,
    lightGray: theme.lightGray,
    darkGray: theme.darkGray,
    black: theme.black,
    btnHover: theme.btnHover,
    picMask: theme.picMask,
    text: {
      primary: theme.white,
      disabled: theme.disabledGray,
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
