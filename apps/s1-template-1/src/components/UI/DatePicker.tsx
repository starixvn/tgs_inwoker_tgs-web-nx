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
