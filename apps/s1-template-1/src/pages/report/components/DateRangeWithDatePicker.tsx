import { useMemo } from "react";

import { DatePickerForReport } from "@/components/UI/DatePicker";
import addDays from "date-fns/addDays";
import styled from "styled-components";

const DateContainer = styled.div`
`;

const FlatStraightLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateSpliter = styled.div`
  width: 1.2rem;
`;
const DateInner = styled.div`
  width: 159px;
  height: 100%;
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
