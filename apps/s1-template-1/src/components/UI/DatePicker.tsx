import calendar from "@/assets/t28/images/profile/calendar.svg";
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
          slotProps={{
            layout: {
              sx: {
                display: "block !important",
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

  .MuiInputBase-input {
    background: ${({ theme }) => theme.formInputBackground};
    color: ${({ theme }) => theme.formInputColor};
    border: 1px solid ${({ theme }) => theme.formInputBorder}
    padding: 10px 10px;
    text-align: left;
    cursor: pointer;
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
  width: 27px;
  height: 27px;
  pointer-events: none;

  & > img {
    width: 100%;
    height: 100%;
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
        <img src={calendar} alt="calendar" />
      </Wrapper>
    </ReportDatePickerContainer>
  );
};

export default DatePicker;
