import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";

const DateRangContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 13px;
`;

type DateRangSelectionTypes = {
  $isSelected: boolean;
  theme: typeof theme;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  flex-grow:1;
  text-align: center;
  cursor: pointer;
  height: 40px;
  white-space: nowrap;
  background: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.priBTNOutline : "none";
  }};
  color: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.white : theme.white50;
  }};
  padding: 11px 20px;
  border: ${({ $isSelected }: DateRangSelectionTypes) => {
    return $isSelected ? "none" : `1px solid ${theme.white50}`;
  }};
  border-radius: 4px;
  font-size: 0.937rem;
  line-height: 1;
`;

export enum DateRangeEnum {
  TODAY,
  WEEKLY,
  MONTHLY,
}

type Props = {
  dateRange: DateRangeEnum;
  handleDateRangeChange: (dateRange: DateRangeEnum) => void;
};
const DateRangeWithIntervalSelector = ({ dateRange, handleDateRangeChange }: Props) => {
  return (
    <DateRangContainer>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.TODAY)}
        $isSelected={dateRange === DateRangeEnum.TODAY}
      >
        {i18n.t("report.today")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.WEEKLY)}
        $isSelected={dateRange === DateRangeEnum.WEEKLY}
      >
        {i18n.t("report.oneWeek")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.MONTHLY)}
        $isSelected={dateRange === DateRangeEnum.MONTHLY}
      >
        {i18n.t("report.oneMonth")}
      </DateRangSelection>
    </DateRangContainer>
  );
};

export default DateRangeWithIntervalSelector;
