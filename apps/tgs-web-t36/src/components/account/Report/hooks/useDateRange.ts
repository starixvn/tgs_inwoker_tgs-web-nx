import { useState } from "react";
import addDays from "date-fns/addDays";

export interface DateRangeInfo {
  dateFrom: Date;
  dateTo: Date;
  dateRange: number;
}

export function useDateRange() {
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);

  const [isSelectedDateRange, setIsSelectedDateRange] = useState(false);

  const [dateRangeInfo, setDateRangeInfo] = useState<DateRangeInfo>({
    dateFrom: today,
    dateTo: today,
    dateRange: -1,
  });

  const handleDateFromChange = (e?: Date) => {
    if (!e) return;
    setDateRangeInfo({ ...dateRangeInfo, dateFrom: e });
    setIsSelectedDateRange(true);
  };

  const handleDateToChange = (e?: Date) => {
    if (!e) return;
    setDateRangeInfo({ ...dateRangeInfo, dateTo: e });
    setIsSelectedDateRange(true);
  };

  const handleDateRangeChange = (dateRangeEnum: number) => {
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);

    let newDateFrom = today;

    switch (dateRangeEnum) {
      case 0:
        break;
      case 1:
        newDateFrom = addDays(today, -7);
        break;
      case 2:
        newDateFrom = addDays(today, -30);
        break;
    }
    setIsSelectedDateRange(false);

    setDateRangeInfo({
      dateFrom: newDateFrom,
      dateTo: today,
      dateRange: dateRangeEnum,
    });
  };

  return {
    dateRangeInfo,
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
    isSelectedDateRange,
  };
}
