import { theme } from "@/theme";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const DateRangContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  align-items: flex-end;
  margin-right: 1.2rem;
`;

type DateRangSelectionTypes = {
  $isSelected: boolean;
  theme: typeof theme;
};
const DateRangSelection = styled.div<DateRangSelectionTypes>`
  cursor: pointer;
  white-space: nowrap;
  background: ${({ theme }) => theme.buttonReportBackgroundColor};
  color: ${({ theme }) => theme.buttonReportColor};
  padding: .8rem;
  display: flex;
  align-items: center;
  font-weight: 700;
  height: 3.6rem;
  border-radius: 1rem;
  min-width: 13.8rem;
  justify-content: center;
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
