import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const DateRangContainer = styled.div`
  display: inline-flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: start;
  ${media.sm} {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
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
    return $isSelected ? theme.subNavSec : "#D0DAE3";
  }};
  color: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? theme.white : theme.subNavSec;
  }};
  border: ${({ $isSelected, theme }: DateRangSelectionTypes) => {
    return $isSelected ? "transparent" : `1px solid ${theme.subNavSec}`;
  }};
  border-radius: 3px;
  padding: 12px 20px;
  font-size: 0.875rem;
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
  selectedType: number;
};
const DateRangeWithIntervalSelector = ({
  dateRange,
  handleDateRangeChange,
  isSelectedDateRange,
  selectedType,
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
