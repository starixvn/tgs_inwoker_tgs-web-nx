import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";

const DateRangContainer = styled.div`
  display: flex;
  //align-items: center;
  justify-content: center;
  gap: 13px;
`;

type DateRangSelectionTypes = {
  $isSelected: boolean;
  theme: typeof theme;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  text-align: center;
  cursor: pointer;
  height: 40px;
  white-space: nowrap;
  background: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.black : "none";
  }};
  color: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? "white" : theme.maskBlack50;
  }};
  padding: 11px 20px;
  border: 1px solid
    ${({ $isSelected, theme }: DateRangSelectionTypes) => {
      return $isSelected ? "transparent" : theme.maskBlack50;
    }};
  border-radius: 2px;
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
