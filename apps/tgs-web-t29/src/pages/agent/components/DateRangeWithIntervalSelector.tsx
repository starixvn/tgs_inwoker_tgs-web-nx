import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const DateRangContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 50px;
  gap: 10px;

  ${media.sm} {
    max-width: 320px;
  }
`;

type DateRangSelectionTypes = {
  $isSelected: boolean;
  theme: typeof theme;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  padding: 12px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  background: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.blue40 : theme.blue20;
  }};
  color: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.white : theme.text;
  }};
  text-align: center;
  font-size: 0.812rem;
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
  isShowMonth?: boolean;

};
const DateRangeWithIntervalSelector = ({ dateRange, handleDateRangeChange, isSelectedDateRange, isShowMonth = true }: Props) => {
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
      {
        isShowMonth && (
          <DateRangSelection
            onClick={() => handleDateRangeChange(DateRangeEnum.MONTHLY)}
            $isSelected={dateRange === DateRangeEnum.MONTHLY && !isSelectedDateRange}
          >
            {i18n.t("report.oneMonth")}
          </DateRangSelection>
      )}
    </DateRangContainer>
  );
};

export default DateRangeWithIntervalSelector;
