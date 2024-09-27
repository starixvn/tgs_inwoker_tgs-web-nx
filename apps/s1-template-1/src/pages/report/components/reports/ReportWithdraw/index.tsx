import Loading from "@/components/UI/Loading";
import { DateRangeInfo, useDateRange } from "@/components/account/Report/hooks/useDateRange";
import { useWithdrawalStatus } from "@/components/account/Report/hooks/useWithdrawalStatus";
import { ReportContainer } from "@/components/styled-component/Report";
import WithdrawalDetailTable from "@/pages/report/components/reports/ReportWithdraw/components/WithdrawalDetailTable";
import { ReportService } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { WithdrawFormViewModel } from "@tgs-web-nx/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import StatusSelect from "../../StatusSelect";


type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 10;
const ReportWithdraw = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawFormViewModel[]>([]);
  const [withdrawalDetailsForMobile, setWithdrawalDetailsForMobile] = useState<
    WithdrawFormViewModel[]
  >([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize, isMobileSize } = useRwd();

  const { statusDictionary, status, handleStatusChange } = useWithdrawalStatus();

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getWithdrawalDetailsRes = await ReportService.GetWithdrawalDetails(
      status,
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "CreatedOn",
      false,
      "1",
    );

    if (getWithdrawalDetailsRes.IsSuccess) {
      const newWithdrawalDetails =
        page > 1
          ? withdrawalDetailsForMobile.concat(getWithdrawalDetailsRes.data.items)
          : getWithdrawalDetailsRes.data.items;
      setWithdrawalDetails(getWithdrawalDetailsRes.data.items);
      setWithdrawalDetailsForMobile(newWithdrawalDetails);
      setTotalCount(getWithdrawalDetailsRes.data.totalCount || 0);
      setIsMaxPage(getWithdrawalDetailsRes.data.totalCount == newWithdrawalDetails.length);
    } else {
      alert("", getWithdrawalDetailsRes?.info || JSON.stringify(getWithdrawalDetailsRes));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentPage = 1;

    setPage(currentPage);
    fetchReports(currentPage);
    setIsMaxPage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dateRangeInfo), status]);

  const handleLoadMore = async () => {
    if (isMaxPage) return;

    const nextPage = page + 1;
    setPage(nextPage);
    await fetchReports(nextPage);
  };

  const handlePageChange = async (page: number) => {
    fetchReports(page + 1);
    setPage(page + 1);
  };

  const {
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
    isSelectedDateRange,
  } = useDateRange();

  const changeDateRange = (dateRangeEnum: number) => {
    handleDateRangeChange(dateRangeEnum);
  };

  return (
    <>
    {/* <FilterWrapper>
        <DateRangeSelector>
          <Title>{i18n.t("report.date")}</Title>
          <DateRangeWithDatePicker
            dateFrom={dateRangeInfo.dateFrom}
            dateTo={dateRangeInfo.dateTo}
            handleDateFromChange={handleDateFromChange}
            handleDateToChange={handleDateToChange}
            selectedType={3}
          />          
        </DateRangeSelector>
        <DateRangeWithIntervalSelector
            dateRange={dateRangeInfo.dateRange}
            handleDateRangeChange={changeDateRange}
            isSelectedDateRange={isSelectedDateRange}
          />
         
      </FilterWrapper> */}
     
    <StatusSelect
        type="withdrawal"
        statusDictionary={statusDictionary}
        status={status}
        handleStatusChange={handleStatusChange}
      />
      <ReportContainer>
          <WithdrawalDetailTable
            withdrawalDetails={withdrawalDetails}
            totalCount={totalCount}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={(page: number) => handlePageChange(page)}
          />
        <Loading show={isLoading} />
      </ReportContainer>
      {/*@ts-ignore*/}
      <BottomScrollListener
        onBottom={() => {
          isMobileSize && handleLoadMore();
        }}
      />
    </>
  );
};

export default ReportWithdraw;
