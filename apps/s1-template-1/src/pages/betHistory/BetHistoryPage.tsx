import { Title } from "@/components/account/Report";
import { useDateRange } from "@/components/account/Report/hooks/useDateRange";
import AccountPaper from "@/components/project/AccountPaper";
import MenuTabs from "@/components/project/MenuTabs";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { DateRangeSelector, ReportMainContainer } from "@/components/styled-component/Report";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import DateRangeWithDatePicker from "../report/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "../report/components/DateRangeWithIntervalSelector";
import ReportBetting from "../report/components/reports/ReportBetting";

const BetHistoryPage = () => {
  const { isDesktopSize } = useRwd();
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
    return (
      <PageContainer>
      {/* {isDesktopSize && <UserWalletInfo />} */}
      {isDesktopSize && <MenuTabs />}
      <AccountPaper pageName={i18n.t("common.betHistory")} iconUrl="" >
      <ReportMainContainer>
          <DateRangeSelector>
            <Title>{i18n.t("report.date")}</Title>
            <DateRangeWithDatePicker
              dateFrom={dateRangeInfo.dateFrom}
              dateTo={dateRangeInfo.dateTo}
              handleDateFromChange={handleDateFromChange}
              handleDateToChange={handleDateToChange}
              selectedType={2}
            />        
          </DateRangeSelector>
          <DateRangeWithIntervalSelector
              dateRange={dateRangeInfo.dateRange}
              handleDateRangeChange={changeDateRange}
              isSelectedDateRange={isSelectedDateRange}
            />
          <ReportBetting dateRangeInfo={dateRangeInfo} />;
        </ReportMainContainer>
      </AccountPaper>
    </PageContainer>
    );
  };
  
  export default BetHistoryPage;
  