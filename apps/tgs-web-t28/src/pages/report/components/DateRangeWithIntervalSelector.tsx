import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";

const DateRangContainer = styled.div`
  display: flex;
  //align-items: center;
  justify-content: center;
  gap: 13px;
  height: 47px;
`;

type DateRangSelectionTypes = {
  $isSelected: boolean;
  theme: typeof theme;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  background: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.memberSection : theme.secPopupMask;
  }};
  color: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.lightPurple : theme.gray50;
  }};
  border: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? `1px solid ${theme.lightPurple}` : `2px solid ${theme.secBTNBGC}`;
  }};
  padding: 12px 20px;
  font-size: 0.812rem;
  display: flex;
  align-items: center;
`;

export enum DateRangeEnum {
  TODAY,
  WEEKLY,
  MONTHLY,
}

type Props = {
  dateRange: DateRangeEnum;
  handleDateRangeChange: (dateRange: DateRangeEnum) => void;
  isSelectedDateRange: boolean;
};
const DateRangeWithIntervalSelector = ({
  dateRange,
  handleDateRangeChange,
  isSelectedDateRange,
}: Props) => {
  return (
    <DateRangContainer>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.TODAY)}
        $isSelected={dateRange === DateRangeEnum.TODAY && !isSelectedDateRange}
      >
        {i18n.t("report.today")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.WEEKLY)}
        $isSelected={dateRange === DateRangeEnum.WEEKLY && !isSelectedDateRange}
      >
        {i18n.t("report.oneWeek")}
      </DateRangSelection>
      <DateRangSelection
        onClick={() => handleDateRangeChange(DateRangeEnum.MONTHLY)}
        $isSelected={dateRange === DateRangeEnum.MONTHLY && !isSelectedDateRange}
      >
        {i18n.t("report.oneMonth")}
      </DateRangSelection>
    </DateRangContainer>
  );
};

export default DateRangeWithIntervalSelector;
