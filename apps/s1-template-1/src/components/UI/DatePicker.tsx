import { theme } from "@/theme";
import { createTheme, ThemeProvider } from "@mui/material";
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
                background: theme.calendarBackground,
                boxShadow: theme.calendarBoxshadow,
                fontSize: theme.calendarFontSize,
                color: theme.calendarTextColor,
                width: "42rem",
                height: "57.5rem",
                padding: "2.4rem 1.2rem",
                "& .MuiDayCalendar-header .MuiDayCalendar-weekDayLabel": {
                  fontSize: "inherit",
                  color: theme.calendarHeaderColor,
                  justifySelf: "center",
                  height: "3.6rem",
                }, 
                "& .MuiDayCalendar-header": {
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.6rem",
                },
                "& .MuiDayCalendar-weekContainer": {
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.6rem",
                },
                "& .MuiDayCalendar-weekContainer .MuiButtonBase-root": {
                  fontSize: "inherit",
                  color: `${theme.calendarTextColor}` ,
                  justifySelf: "center",
                  "&.Mui-disabled": {
                    color: theme.calendarTextDisabledColor,
                  },
                  "&.Mui-selected": {
                    background: theme.calendarHighlightBackground,
                    color: theme.calendarHighlight,
                    width: "4rem", 
                    height: "4rem",
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
                    color: theme.calendarTextColor,
                    letterSpacing: "0.44px",
                  }
                },
                "& .MuiPickersSlideTransition-root": {
                  minHeight: "unset",
                  overflow: "hidden",
                },
                "& .MuiDayCalendar-monthContainer": {
                  overflow: "unset",
                  position: "relative",
                  top: "unset",
                  left: "unset",
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
                    color: theme.white,                  
                    "&:hover": {
                      borderBottomWidth: "0.4rem",
                      transition: "all 0.2s ease-in-out",
                    },
                    "&:first-child":{
                      background: "linear-gradient(180deg, #325276 100%, #253F5C 100%)",
                      borderBottomColor: "#072341",
                    },
                    "&:last-child":{
                      background: theme.signInButtonBackground,
                      borderBottomColor: theme.signInButtonBottomBorderColor,
                    }
                  },
                  
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
