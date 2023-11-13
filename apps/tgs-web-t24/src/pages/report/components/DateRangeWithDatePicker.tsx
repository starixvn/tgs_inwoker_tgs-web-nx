import React, { useMemo } from "react";

import styled from "styled-components";
import addDays from "date-fns/addDays";
import { DatePickerForReport } from "@/components/UI/DatePicker";
import { media } from "@/theme/breakpoints";

const DateContainer = styled.div`
  width: 100%;

  ${media.sm} {
    width: auto;
  }
`;

const FlatStraightLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateSpliter = styled.div`
  font-size: 20px;
  font-weight: 400;
  color: white;
  width: 48px;
  text-align: center;
`;
const DateInner = styled.div`
  max-width: 168px;
`;

type Props = {
  dateFrom: Date;
  handleDateFromChange: (newDate?: Date) => void;
  dateTo: Date;
  handleDateToChange: (newDate?: Date) => void;
  selectedType: number;
};

const DateRangeWithDatePicker = ({
  dateFrom,
  handleDateFromChange,
  dateTo,
  handleDateToChange,
  selectedType,
  ...others
}: Props) => {
  const minDateFrom = useMemo(() => {
    switch (selectedType) {
      case 8:
        return addDays(new Date(dateTo), -44);
      default:
        return undefined;
    }
  }, [selectedType, dateTo]);

  const maxDateTo = useMemo(() => {
    switch (selectedType) {
      case 8:
        return addDays(new Date(dateTo), 44) > new Date()
          ? new Date()
          : addDays(new Date(dateTo), 44);
      default:
        return new Date();
    }
  }, [selectedType, dateTo]);
  return (
    //@ts-ignore
    <DateContainer {...others}>
      <FlatStraightLine>
        <DateInner>
          {/*<DateLabel>{i18n.t("report.startDate")}</DateLabel>*/}

          <DatePickerForReport
            disableFuture
            minDate={minDateFrom}
            maxDate={dateTo}
            format="yyyy/MM/dd"
            value={dateFrom}
            onChange={handleDateFromChange}
            sx={{
              background: "gold",
            }}
          />
        </DateInner>

        <DateSpliter>-</DateSpliter>

        <DateInner>
          {/*<DateLabel>{i18n.t("report.endDate")}</DateLabel>*/}

          <DatePickerForReport
            disableFuture
            minDate={dateFrom}
            maxDate={maxDateTo}
            format="yyyy/MM/dd"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </DateInner>
      </FlatStraightLine>
      {/*<div className="clear"></div>*/}
    </DateContainer>
  );
};

export default DateRangeWithDatePicker;
