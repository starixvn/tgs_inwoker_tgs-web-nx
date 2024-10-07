import { theme } from "@/theme";
import { breakpoints } from "@/theme/breakpoints";
import { createTheme, ThemeOptions } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";

//@ts-ignore
theme.lang = i18n.language;

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    white: string;
    black: string;
    red: string;
    green: string;
    orange: string;
    yellow: string;
    darkPurple: string;
    middlePurple: string;
    lightPurple: string;
    mainBackground: string;
    memberSection: string;
    NavBGC: string;
    secBTNBGC: string;
    gray: string;
    gray20: string;
    gray50: string;
    gray60: string;
    supplierMask: string;
    inputBGC: string;
    popupMask: string;
    secPopupMask: string;

    // New template
    playNowButtonBackground: string;
    tabColor: string;
    tabActiveColor: string;
    submitButton: {
      background: string;
      color: string;
      shadow: string;
    };
    authForm: {
      tabsBackground: string;
      tabsShadow: string;
      activeTabBackground: string;
      activeTabColor: string;
      tabColor: string;
    };
    header: {
      signIn: {
        background: string;
        bottomBorderColor: string;
        color: string;
        activeShadow: string;
        disabledColor: string;
        disabledBackground: string;
        disabledBorder: string;
      };
      signUp: {
        background: string;
        bottomBorderColor: string;
        color: string;
        activeShadow: string;
        disabledColor: string;
        disabledBackground: string;
        disabledBorder: string;
      };
    };

    form: {
      borderColor: string;
      backgroundColor: string;
      textColor: string;
      optionHoverBgColor: string;
      placeHolderTextColor: string;
      inputFocusColor: string;
    };

    table: {
      tableBorderColor: string;
      tableBackground: string;
      tableHeaderBackground: string;
      tableHeaderColor: string;
      tableHeaderBorderColor: string;
      tableColor: string;
      tableFontSize: string;
      tableHeaderFontSize: string;
      tableBorderRadius: string;
    };

    calendar: {
      calendarBackground: string;
      calendarBorderRadius: string;
      calendarTextColor: string;
      calendarTextDisabledColor: string;
      calendarHeaderColor: string;
      calendarHighlight: string;
      calendarHighlightBackground: string;
      calendarFontSize: string;
      calendarBoxshadow: string;
      nextButtonBackground: string;
      nextButtonColor: string;
      disabledNextButtonBackground: string;
      calendarFontSizeMobile: string;
    };

    uploadButton: {
      backgroundColor: string;
      borderColor: string;
    };
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
      disabledBackground: theme.gray20,
      disabled: theme.gray50,
    },
    white: theme.white,
    black: theme.black,
    mainBackground: theme.mainBackground,
    red: theme.red,
    green: theme.green,
    orange: theme.orange,
    yellow: theme.yellow,
    darkPurple: theme.darkPurple,
    middlePurple: theme.middlePurple,
    lightPurple: theme.lightPurple,
    memberSection: theme.memberSection,
    NavBGC: theme.headerBackground,
    secBTNBGC: theme.secBTNBGC,
    gray: theme.gray,
    gray20: theme.gray20,
    gray50: theme.gray50,
    gray60: theme.gray60,
    supplierMask: theme.supplierMask,
    inputBGC: theme.inputBGC,
    popupMask: theme.popupMask,
    secPopupMask: theme.secPopupMask,
    text: {
      primary: theme.white,
      secondary: theme.gray50,
    },
    // New template
    playNowButtonBackground: theme.playNowButtonBackground,
    tabColor: theme.tabColor,
    tabActiveColor: theme.tabActiveColor,
    submitButton: {
      background: theme.submitButtonBackground,
      color: theme.submitButtonColor,
      shadow: theme.submitButtonShadow,
    },
    authForm: {
      tabsBackground: theme.authTabsBackground,
      tabsShadow: theme.authTabsShadow,
      activeTabBackground: theme.authActiveTabBackground,
      activeTabColor: theme.authActiveTabColor,
      tabColor: theme.authTabColor,
    },
    header: {
      signIn: {
        background: theme.signInButtonBackground,
        bottomBorderColor: theme.signInButtonBottomBorderColor,
        color: theme.signInButtonColor,
        activeShadow: theme.signInButtonActiveShadow,
        disabledColor: theme.signInButtonDisabledColor,
        disabledBorder: theme.signInButtonDisabledBorderColor,
        disabledBackground: theme.signInButtonDisabledBg,
      },
      signUp: {
        background: theme.signUpButtonBackground,
        bottomBorderColor: theme.signUpButtonBottomBorderColor,
        color: theme.signUpButtonColor,
        activeShadow: theme.signUpButtonActiveShadow,
        disabledColor: theme.signUpButtonDisabledColor,
        disabledBorder: theme.signUpButtonDisabledBorderColor,
        disabledBackground: theme.signUpButtonDisabledBg,
      },
    },

    form: {
      borderColor: theme.formInputBorder,
      textColor: theme.formInputColor,
      backgroundColor: theme.formInputBackground,
      optionHoverBgColor: theme.optionHoverBgColor,
      placeHolderTextColor: theme.formInputPlaceHolderColor,
      inputFocusColor: theme.formInputFocusColor,
    },

    table: {
      tableBorderColor: theme.tableBorderColor,
      tableBackground: theme.tableBackground,
      tableHeaderBackground: theme.tableHeaderBackground,
      tableHeaderColor: theme.tableHeaderColor,
      tableHeaderBorderColor: theme.tableHeaderBorderColor,
      tableColor: theme.tableColor,
      tableFontSize: theme.tableFontSize,
      tableHeaderFontSize: theme.tableHeaderFontSize,
      tableBorderRadius: theme.tableBorderRadius,
    },

    calendar: {
      calendarBackground: theme.calendarBackground,
      calendarBorderRadius: theme.calendarBorderRadius,
      calendarTextColor: theme.calendarTextColor,
      calendarTextDisabledColor: theme.calendarTextDisabledColor,
      calendarHeaderColor: theme.calendarHeaderColor,
      calendarHighlight: theme.calendarHighlight,
      calendarHighlightBackground: theme.calendarHighlightBackground,
      calendarFontSize: theme.calendarFontSize,
      calendarBoxshadow: theme.calendarBoxshadow,
      nextButtonBackground: theme.slideNextButtonBackground,
      nextButtonColor: theme.slideNextButtonColor,
      disabledNextButtonBackground: theme.disabledSlideNextButtonBackground,
      calendarFontSizeMobile: theme.calendarFontSizeMobile,
    },

    uploadButton: {
      backgroundColor: theme.uploadButtonBgColor,
      borderColor: theme.uploadButtonBorderColor,
    },
  },
  typography: {
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
    //   "& .MuiTablePagination-displayedRows": {
    //     fontSize: "1.6rem",
    //   }
    // },
  },
} as ThemeOptions);

export { muiTheme };
