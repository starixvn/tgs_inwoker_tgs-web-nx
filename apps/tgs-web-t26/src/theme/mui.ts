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
    mainBackground: string;
    red: string;
    gradient: string;
    blueGray: string;
    darkGray: string;
    orange: string;
    brightOrange: string;
    goldenYellow: string;
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
      disabledBackground: theme.blueGray,
      disabled: theme.white,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    blueGray: theme.blueGray,
    darkGray: theme.darkGray,
    orange: theme.orange,
    brightOrange: theme.brightOrange,
    goldenYellow: theme.goldenYellow,
    gradient: theme.gradient,
    text: {
      primary: theme.text,
      // secondary: theme.gray20,
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
    // MuiTablePagination: {
    //   styleOverrides: {
    //     actions: {
    //       "& .MuiButtonBase-root": {
    //         color: "#707070",
    //         "&:hover": {
    //           // backgroundColor: "#your_hover_color_here", // 设置鼠标悬停时的背景颜色
    //         },
    //       },
    //     },
    //   },
    // },
  },
} as ThemeOptions);

export { muiTheme };
