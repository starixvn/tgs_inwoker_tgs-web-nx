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
    error: string;
    darkBlue: string;
    bg: string;
    "515c": string;
    font: string;
    blue: string;
    main: string;
    dae3: string;
    border: string;
    greenBorder: string;
    green: string;
    blueGradient: string;
    greenGradient: string;
    mainBackground: string;
    mainLightBackground: string;
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
      disabledBackground: theme["515c"],
      disabled: theme.white,
    },
    text: {
      primary: theme.text,
    },
    white: theme.white,
    black: theme.black,
    error: theme.error,
    darkBlue: theme.darkBlue,
    bg: theme.bg,
    "515c": theme["515c"],
    font: theme.font,
    blue: theme.blue,
    main: theme.main,
    dae3: theme.dae3,
    border: theme.border,
    greenBorder: theme.greenBorder,
    green: theme.green,
    blueGradient: theme.blueGradient,
    greenGradient: theme.greenGradient,
    mainBackground: theme.mainBackground,
    mainLightBackground: theme.mainLightBackground,
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
