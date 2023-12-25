import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import Loading from "@/components/UI/Loading";
import ReportTypeTabs from "@/pages/report/components/ReportTypeTabs";
import DateRangeWithDatePicker from "@/pages/report/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/pages/report/components/DateRangeWithIntervalSelector";
import ReportBetting from "@/pages/report/components/reports/ReportBetting";
import ReportWithdraw from "@/pages/report/components/reports/ReportWithdraw";
import ReportDeposit from "@/pages/report/components/reports/ReportDeposit";
import Index from "@/pages/report/components/reports/ReportTransfer";
import ReportJoinPromotion from "@/pages/report/components/reports/JoinPromotion";
import ReportBalanceChange from "@/pages/report/components/reports/ReportBalanceChange";
import { useDateRange } from "@/components/account/Report/hooks/useDateRange";
import { DateRangeSelector, ReportMainContainer } from "@/components/styled-component/Report";
import { media } from "@/theme/breakpoints";

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 1.25rem;
  font-weight: 700;

  ${media.sm} {
    color: ${({ theme }) => theme.text};
  }
`;

const Report = () => {
  // TODO: tab function
  const { tab } = useParams<{ tab: string }>();
  const [selectedType, setSelectedType] = useState(
    tab && parseInt(tab) > 0 && parseInt(tab) <= 8 ? parseInt(tab) : 2,
  );

  const {
    dateRangeInfo,
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
    isSelectedDateRange,
  } = useDateRange();

  const changeDateRange = (dateRangeEnum: number) => {
    handleDateRangeChange(dateRangeEnum);
  };

  const handleChangeTab = (e: React.ChangeEvent<{}>, newValue: number) => {
    if (selectedType !== newValue) {
      window.scrollTo({ top: 0 });
      setSelectedType(newValue);
    }
  };

  return (
    <ReportMainContainer>
      <ReportTypeTabs
        selectedType={selectedType}
        handleChangeTab={handleChangeTab}
        style={{ marginBottom: "20px" }}
      />

      <DateRangeSelector>
        <Title>{i18n.t("report.date")}</Title>
        <DateRangeWithDatePicker
          dateFrom={dateRangeInfo.dateFrom}
          dateTo={dateRangeInfo.dateTo}
          handleDateFromChange={handleDateFromChange}
          handleDateToChange={handleDateToChange}
          selectedType={selectedType}
        />
        <DateRangeWithIntervalSelector
          dateRange={dateRangeInfo.dateRange}
          handleDateRangeChange={changeDateRange}
          isSelectedDateRange={isSelectedDateRange}
        />
      </DateRangeSelector>

      {(() => {
        switch (selectedType) {
          // case 1:
          //   return <ReportPlatform dateRangeInfo={dateRangeInfo} />;
          case 2:
            return <ReportBetting dateRangeInfo={dateRangeInfo} />;
          case 3:
            return <ReportWithdraw dateRangeInfo={dateRangeInfo} />;
          case 4:
            return <ReportDeposit dateRangeInfo={dateRangeInfo} />;
          // case 5:
          //   return <ReportRebate dateRangeInfo={dateRangeInfo} />;
          case 6:
            return <Index dateRangeInfo={dateRangeInfo} />;
          case 7:
            return <ReportJoinPromotion dateRangeInfo={dateRangeInfo} />;
          case 8:
            return <ReportBalanceChange dateRangeInfo={dateRangeInfo} />;
          default:
            return null;
        }
      })()}

      <Loading show={false /* Replace with loading state */} />
    </ReportMainContainer>
  );
};

export default Report;
