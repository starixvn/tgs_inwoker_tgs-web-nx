import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const DateRangContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  align-items: flex-end;  
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 1.2rem;
  ${media.sm} {
    margin-right: 1.2rem;
    width: unset;
  }
  
`;

type DateRangSelectionTypes = {
  $isSelected: boolean;
  theme: typeof theme;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  cursor: pointer;
  white-space: nowrap;
  background: ${({ $isSelected, theme }) => $isSelected ? theme.buttonRangeTimeSelectedBgColor : theme.buttonRangeTimeBgColor};
  color: ${({ $isSelected, theme }) => $isSelected ? theme.buttonRangeTimeSelectedColor : theme.buttonRangeTimeColor};;
  padding: .8rem;
  display: flex;
  align-items: center;
  font-weight: 700;
  height: 3.6rem;
  border-radius: 1rem;  
  justify-content: center;
  flex-grow: 1;
  flex-basic: 0;
  max-width: 100%;
  font-size: 1.4rem;
  ${media.sm} {
   flex-grow: 0;
   width: 13.8rem; 
  }
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
