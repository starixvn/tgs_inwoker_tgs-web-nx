import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import Loading from "@/components/UI/Loading";
import ReportTypeTabs from "@/pages/report/components/ReportTypeTabs";
import DateRangeWithDatePicker from "@/pages/report/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/pages/report/components/DateRangeWithIntervalSelector";
import ReportBetting from "@/pages/report/components/reports/ReportBetting";
import ReportWithdraw from "@/pages/report/components/reports/ReportWithdraw";
import ReportDeposit from "@/pages/report/components/reports/ReportDeposit";
import ReportRebate from "@/pages/report/components/reports/ReportRebate";
import Index from "@/pages/report/components/reports/ReportTransfer";
import ReportJoinPromotion from "@/pages/report/components/reports/JoinPromotion";
import ReportBalanceChange from "@/pages/report/components/reports/ReportBalanceChange";
import ReportPlatform from "@/pages/report/components/reports/ReportPlatform";
import { useDateRange } from "@/components/account/Report/hooks/useDateRange";
import {
  DateRangeSelector,
  DateTitle,
  ReportMainContainer,
} from "@/components/styled-component/Report";

const Report = () => {
  // TODO: tab function
  const { tab } = useParams<{ tab: string }>();
  const [selectedType, setSelectedType] = useState(
    tab && parseInt(tab) > 0 && parseInt(tab) <= 8 ? parseInt(tab) : 2,
  );

  const { dateRangeInfo, handleDateFromChange, handleDateToChange, handleDateRangeChange } =
    useDateRange();

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
        <DateTitle>{i18n.t("report.date")}</DateTitle>

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
        />
      </DateRangeSelector>

      {(() => {
        switch (selectedType) {
          case 1:
            return <ReportPlatform dateRangeInfo={dateRangeInfo} />;
          case 2:
            return <ReportBetting dateRangeInfo={dateRangeInfo} />;
          case 3:
            return <ReportWithdraw dateRangeInfo={dateRangeInfo} />;
          case 4:
            return <ReportDeposit dateRangeInfo={dateRangeInfo} />;
          case 5:
            return <ReportRebate dateRangeInfo={dateRangeInfo} />;
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
