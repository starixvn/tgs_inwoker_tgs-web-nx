import { createTheme } from "@mui/material/styles";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme/index";
import { fontFamily } from "@/theme/fontFamily";
import { breakpoints } from "@/theme/breakpoints";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: string;
    black: string;
    primaryDark: string;
    primaryLight: string;
    tertiary: {
      main: string;
      dark: string;
      light: string;
    };
    tertiaryMiddle: string;
    tertiaryLight: string;
    tertiaryDark: string;
    yellow: string;
    green: string;
    primaryGradient: string;
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
    // @ts-ignore
    tertiary: {
      main: theme.tertiary,
      dark: theme.tertiaryDark,
      light: theme.tertiaryLight,
    },
    type: "light",
    white: theme.white,
    primaryDark: theme.primaryDark,
    primaryLight: theme.primaryLight,
    yellow: "#f4bd29",
    primaryGradient: theme.primaryGradient,
    text: {
      primary: theme.white,
      secondary: theme.tertiaryLight,
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
  overrides: {
    MuiSelect: {
      color: theme.white,
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
});

export { muiTheme };
