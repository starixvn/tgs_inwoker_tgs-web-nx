import { useDateRange } from "@/components/account/Report/hooks/useDateRange";
import { DateRangeSelector, ReportMainContainer } from "@/components/styled-component/Report";
import Loading from "@/components/UI/Loading";
import DateRangeWithDatePicker from "@/pages/report/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/pages/report/components/DateRangeWithIntervalSelector";
import ReportJoinPromotion from "@/pages/report/components/reports/JoinPromotion";
import ReportBalanceChange from "@/pages/report/components/reports/ReportBalanceChange";
import ReportBetting from "@/pages/report/components/reports/ReportBetting";
import ReportDeposit from "@/pages/report/components/reports/ReportDeposit";
import Index from "@/pages/report/components/reports/ReportTransfer";
import ReportWithdraw from "@/pages/report/components/reports/ReportWithdraw";
import ReportTypeTabs from "@/pages/report/components/ReportTypeTabs";
import { i18n } from "@tgs-web-nx/utils";
import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  color: ${({ theme }) => theme.text};
  font-size: 1.25rem;
  font-weight: 700;
`;

const Report = () => {
  // TODO: tab function
  const location = useLocation();
  const { tab } = useParams<{ tab: string }>();
  const [selectedType, setSelectedType] = useState(
    tab && parseInt(tab) > 0 && parseInt(tab) <= 8 ? parseInt(tab) : 2,
  );

  if(location.state){
    setSelectedType(8);
    location.state = null;
  }

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

  // eslint-disable-next-line @typescript-eslint/ban-types
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
      </DateRangeSelector>
      <DateRangeWithIntervalSelector
          dateRange={dateRangeInfo.dateRange}
          handleDateRangeChange={changeDateRange}
          isSelectedDateRange={isSelectedDateRange}
        />
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
