import { theme } from "@/theme";
import { createTheme, ThemeProvider, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import {
  DatePickerProps,
  LocalizationProvider,
  MobileDatePicker,
  MobileDatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { i18n } from "@tgs-web-nx/utils";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import zhLocale from "date-fns/locale/zh-CN";
import styled from "styled-components";

const localeMap: { [key in string]: Locale } = {
  zh: zhLocale,
  en: enLocale,
  th: thLocale,
};

//@ts-ignore
const muiTheme = createTheme({
  palette: {
    primary: {
      main: theme.primary,
    },
  },
  components: {
    // MuiPickersLayout: {
    //   styleOverrides: {
    //     root: {
    //       color: theme.primary,
    //       display: "block",
    //     },
    //   },
    // },
  },
});

// const StyledMobileDatePicker = muiStyled(MobileDatePicker)(({ theme }) => ({
//   background: "#1C2532",
//   "& .MuiPickersLayout-root": {
   
//   }
// }));

export const DatePicker = (props: MobileDatePickerProps<any>) => {
  const theme = useTheme();
  const onlySmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={localeMap[i18n.language.substring(0, 2)]}
    >
      <ThemeProvider theme={muiTheme}>
        <MobileDatePicker
          {...props}
          disableFuture
          format="yyyy/MM/dd"
          orientation={"portrait"}
          sx={{background: "transparent"}}
          slotProps={{
            layout: {
              sx: {
                display: "block !important",
                background: theme.palette.calendar.calendarBackground,
                boxShadow: theme.palette.calendar.calendarBoxshadow,
                fontSize: onlySmallScreen ? `${theme.palette.calendar.calendarFontSizeMobile}` : `${theme.palette.calendar.calendarFontSize}`,
                color: theme.palette.calendar.calendarTextColor,
                width: onlySmallScreen ? "32rem" : "42rem",
                height: onlySmallScreen ? "52rem" : "58rem",
                padding: "2.4rem 1.2rem",
                overflow: "hidden",
                "& .MuiDayCalendar-header .MuiDayCalendar-weekDayLabel": {
                  fontSize: "inherit",
                  color: theme.palette.calendar.calendarHeaderColor,
                  justifySelf: "center",
                  height: onlySmallScreen ? "4rem" : "5rem",
                  width: onlySmallScreen ? "4rem" : "5rem",
                },
                
                "& .MuiDayCalendar-weekContainer .MuiPickersDay-root": {
                  fontSize: "inherit",
                  color: `${theme.palette.calendar.calendarTextColor}` ,
                  justifySelf: "center",
                  height: onlySmallScreen ? "4rem" : "5rem",
                  width: onlySmallScreen ? "4rem" : "5rem",
                  "&.Mui-disabled": {
                    color: theme.palette.calendar.calendarTextDisabledColor,
                  },
                  "&.Mui-selected": {
                    background: theme.palette.calendar.calendarHighlightBackground,
                    color: theme.palette.calendar.calendarHighlight,
                  }
                },
                "& .MuiDateCalendar-root": {
                  width: "100%",
                  height: "unset",
                  overflow: "unset",
                }, 
                "& .MuiPickersToolbar-root": {
                  padding: "0",
                  marginBottom: "1.6rem",
                  "& .MuiTypography-root": {
                    fontSize: "1.6rem",
                    fontWeight: "500",
                    color: "#7A8CA8",
                    fontFamily: "inherit",
                    letterSpacing: "0.32px",
                    lineHeight: "3rem",
                  },
                  "& .MuiDatePickerToolbar-title": {
                    fontSize: "2.2rem",
                    color: theme.palette.calendar.calendarTextColor,
                    letterSpacing: "0.44px",
                  }
                },
                
                "& .MuiDialogActions-root": {
                  position: "absolute",
                  bottom: "2.4rem",
                  right: "1.2rem",
                  "& .MuiButtonBase-root": {
                    height: "4.8rem",
                    padding: "0 1rem",
                    borderRadius: "0.8rem",
                    fontSize: "1.3rem",
                    fontFamily: "var(--font-family)",
                    fontWeight: 700,
                    textTransform: "capitalize",
                    lineHeight: "3.6rem",
                    minWidth: "12rem",
                    borderBottomWidth: "0.2rem",
                    borderStyle: "solid",
                    transition: "all 0.1s ease-in-out", 
                    color: theme.palette.white,    
                    "& .MuiSvgIcon-root": {
                      fill: theme.palette.white,
                    },         
                    "&:hover": {
                      borderBottomWidth: "0.4rem",
                      transition: "all 0.2s ease-in-out",
                    },
                    "&:first-child":{
                      background: "linear-gradient(180deg, #325276 100%, #253F5C 100%)",
                      borderBottomColor: "#072341",
                    },
                    "&:last-child":{
                      background: theme.palette.header.signIn.background,
                      borderBottomColor: theme.palette.header.signIn.bottomBorderColor,
                    }
                  },
                  
                },
                "& .MuiPickersCalendarHeader-root": {
                  paddingLeft: 0,
                  "& .MuiPickersCalendarHeader-labelContainer": {
                    background: "#0A131E", 
                    padding: ".8rem 1.2rem",
                    fontSize: theme.palette.calendar.calendarFontSize,
                    fontFamily: "inherit",
                    borderRadius: ".8rem",
                    "& .MuiButtonBase-root": {
                      color: theme.palette.white,
                    }
                  }
                },

                "& .MuiDayCalendar-slideTransition": {
                  minHeight: "32rem",
                },
                "& .MuiYearCalendar-root": {
                  "& .MuiPickersYear-yearButton": {
                    fontSize: "1.6rem",
                  }
                },
                "& .MuiPickersArrowSwitcher-root": {
                  gap: ".4rem",
                  "& .MuiPickersArrowSwitcher-button": {
                    padding: ".4rem",
                    borderRadius: ".8rem",
                    background: theme.palette.calendar.nextButtonBackground,
                    color: theme.palette.calendar.nextButtonColor,
                    fontSize: "2.4rem",
                    "&.Mui-disabled": {
                      background: theme.palette.calendar.disabledNextButtonBackground,
                    }
                  }
                }
              },
            },
          }}
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};

type CustomDatepickerProps = {
  $disabled?: boolean;
};

const BirthDatePickerContainer = styled.div<CustomDatepickerProps>`
  ${({ $disabled }: CustomDatepickerProps) => {
    return $disabled && `pointer-events: none;`;
  }}
  .MuiTextField-root {
    width: 100%;
  }
  .MuiInputBase-root {
    height: 4.8rem;
    border: 1px solid ${({ theme }) => theme.formInputBorder};
    border-radius: 1rem;
    background: ${({ theme }) => theme.formInputBackground};    
  }
  .MuiInputBase-input {
    background: none;
    color: ${({ theme }) => theme.formInputColor};
    text-align: left;
    padding: 1.2rem;
    font-weight: 700;
    font-size: 1.4rem;
    font-family: inherit;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

type Props = {
  disabled?: boolean;
} & DatePickerProps<any>;

export const DatePickerForBirthDate = ({ disabled, ...others }: Props) => {
  return (
    <BirthDatePickerContainer $disabled={!!disabled}>
      <DatePicker {...others} />
    </BirthDatePickerContainer>
  );
};

const ReportDatePickerContainer = styled.div<CustomDatepickerProps>`
  ${({ $disabled }: CustomDatepickerProps) => {
    return $disabled && `pointer-events: none;`;
  }}
  position: relative;
   background: ${({ theme }) => theme.dropDownBackground};
   border-radius: 1rem;
   border: none !important;
  .MuiInputBase-root {
    font-size: 1.4rem;
    font-family: inherit;
    font-weight: 700;
  }
  .MuiInputBase-input {   
    color: ${({ theme }) => theme.formInputColor};    
    padding: 0 .8rem !important;
    text-align: left;
    cursor: pointer;
    height: 3.6rem;
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 2.4rem;
  height: 2.4rem;
  pointer-events: none;
  background: #253144;
  border-radius: .6rem;
  display: flex;
    align-items: center;
    justify-content: center;
  > img {
    
   }

`;

type DatePickerForReportProps = {
  disabled?: boolean;
} & MobileDatePickerProps<any>;

export const DatePickerForReport = ({ disabled, ...others }: DatePickerForReportProps) => {
  return (
    <ReportDatePickerContainer $disabled={!!disabled}>
      <DatePicker {...others} />
      <Wrapper>
        <img src={"/assets/images/common/icon-calendar.svg"} alt="calendar" width={"16px"} height={"16px"}/>
      </Wrapper>
    </ReportDatePickerContainer>
  );
};

export default DatePicker;
