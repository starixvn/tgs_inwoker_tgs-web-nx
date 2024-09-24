import Loading from "@/components/UI/Loading";
import { DateRangeInfo, useDateRange } from "@/components/account/Report/hooks/useDateRange";
import { useDepositStatus } from "@/components/account/Report/hooks/useDepositStatus";
import { ReportContainer } from "@/components/styled-component/Report";
import DepositDetailCards from "@/pages/report/components/reports/ReportDeposit/components/DepositDetailCards";
import DepositDetailTable from "@/pages/report/components/reports/ReportDeposit/components/DepositDetailTable";
import { ReportService } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { DepositFormViewModel } from "@tgs-web-nx/types";
import moment from "moment";
import { useEffect, useState } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import StatusSelect from "../../StatusSelect";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 10;
const ReportDeposit = ({ dateRangeInfo}: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [depositDetails, setDepositDetails] = useState<DepositFormViewModel[]>([]);
  const [depositDetailsForMobile, setDepositDetailsForMobile] = useState<DepositFormViewModel[]>(
    [],
  );
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize, isMobileSize } = useRwd();

  const { statusDictionary, status, handleStatusChange } = useDepositStatus();

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getDepositDetailsRes = await ReportService.GetDepositDetails(
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

    if (getDepositDetailsRes.IsSuccess) {
      const newDepositDetails =
        page > 1
          ? depositDetailsForMobile.concat(getDepositDetailsRes.data.items)
          : getDepositDetailsRes.data.items;

      setDepositDetails(getDepositDetailsRes.data.items);
      setDepositDetailsForMobile(newDepositDetails);
      setTotalCount(getDepositDetailsRes.data.totalCount || 0);
      setIsMaxPage(getDepositDetailsRes.data.totalCount == newDepositDetails.length);
    } else {
      alert("", getDepositDetailsRes?.info || JSON.stringify(getDepositDetailsRes));
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const currentPage = 1;

    setPage(currentPage);
    fetchReports(currentPage);
    setIsMaxPage(false);
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
            selectedType={selectedType}
          />          
        </DateRangeSelector>
        <DateRangeWithIntervalSelector
            dateRange={dateRangeInfo.dateRange}
            handleDateRangeChange={changeDateRange}
            isSelectedDateRange={isSelectedDateRange}
          />
        <StatusSelect
          type="deposit"
          statusDictionary={statusDictionary}
          status={status}
          handleStatusChange={handleStatusChange}
        />
      </FilterWrapper> */}
      
      <StatusSelect
          type="deposit"
          statusDictionary={statusDictionary}
          status={status}
          handleStatusChange={handleStatusChange}
        />
      <ReportContainer>
        {isDesktopSize ? (
          <DepositDetailTable
            transferDetails={depositDetails}
            totalCount={totalCount}
            page={page}
            pageSize={PAGE_SIZE}
            onPageChange={(page: number) => handlePageChange(page)}
          />
        ) : (
          <DepositDetailCards transferDetails={depositDetailsForMobile} />
        )}

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

export default ReportDeposit;
