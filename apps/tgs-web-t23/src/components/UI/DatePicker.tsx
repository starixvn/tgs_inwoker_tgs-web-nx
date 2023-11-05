import React from "react";
import {
  DatePickerProps,
  LocalizationProvider,
  MobileDatePicker,
  MobileDatePickerProps,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import i18n from "@/utils/i18n";
import { theme } from "@/theme";
import zhLocale from "date-fns/locale/zh-CN";
import enLocale from "date-fns/locale/en-US";
import thLocale from "date-fns/locale/th";
import styled from "styled-components";
import { createTheme, ThemeProvider } from "@mui/material";

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
          sx={{
            "& fieldset": { border: "none" },
            "& input": {
              textAlign: "center",
              fontSize: "0.937rem",
              padding: "14px 14px",
              lineHeight: 1,
            },
          }}
          slotProps={{
            layout: {
              sx: {
                [`.MuiPickersLayout-root`]: {
                  gridColumn: 1,
                  gridRow: 2,
                  background: "gold",
                },
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
  background: ${({ theme }) => theme.mainLightBackground};
  border-radius: 30px;
  //margin-top: 10px;

  .MuiInputBase-input {
    background: none;
    color: ${({ theme }) => theme.lightGray};
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
  border-radius: 30px;
  //margin-top: 10px;
  border: 1px solid white;

  .MuiInputBase-input {
    background: none;
    color: ${({ theme }) => theme.lightGray};
  }

  .MuiInput-underline:before,
  .MuiInput-underline:after {
    border-bottom: 0px;
  }
`;

type DatePickerForReportProps = {
  disabled?: boolean;
} & MobileDatePickerProps<any>;

export const DatePickerForReport = ({ disabled, ...others }: DatePickerForReportProps) => {
  return (
    <ReportDatePickerContainer $disabled={!!disabled}>
      <DatePicker {...others} />
    </ReportDatePickerContainer>
  );
};

export default DatePicker;
