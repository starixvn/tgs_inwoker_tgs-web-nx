import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { TransactionLogViewModel } from "@tgs-web-nx/types";
import { ReportService } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";
import BalanceChangeCards from "@/pages/report/components/reports/ReportBalanceChange/components/BalanceChangeCards";
import TransactionDetailTable from "@/pages/report/components/reports/ReportBalanceChange/components/BalanceChangeTable";
import { ReportContainer } from "@/components/styled-component/Report";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 10;
const ReportBalanceChange = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [balanceChangeDetails, setBalanceChangeDetails] = useState<TransactionLogViewModel[]>([]);
  const [balanceChangeDetailsForMobile, setBalanceChangeDetailsForMobile] = useState<
    TransactionLogViewModel[]
  >([]);

  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize, isMobileSize } = useRwd();

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getBalanceChangeRes = await ReportService.GetBalanceChanges(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
    );

    if (getBalanceChangeRes.IsSuccess) {
      const newDataList =
        page > 1
          ? balanceChangeDetailsForMobile.concat(getBalanceChangeRes.data.items)
          : getBalanceChangeRes.data.items;

      setBalanceChangeDetails(getBalanceChangeRes.data.items);
      setBalanceChangeDetailsForMobile(newDataList);
      setTotalCount(getBalanceChangeRes.data.totalcount || 0);
      setIsMaxPage(getBalanceChangeRes.data.totalcount == newDataList.length);
    } else {
      alert("", getBalanceChangeRes?.info || JSON.stringify(getBalanceChangeRes));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const currentPage = 1;

    setPage(currentPage);
    fetchReports(currentPage);
    setIsMaxPage(false);
  }, [JSON.stringify(dateRangeInfo)]);

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

  return (
    <ReportContainer>
      {isDesktopSize ? (
        <TransactionDetailTable
          balanceChangeDetails={balanceChangeDetails}
          totalCount={totalCount}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => handlePageChange(page)}
        />
      ) : (
        <BalanceChangeCards balanceChangeDetails={balanceChangeDetailsForMobile} />
      )}
      <Loading show={isLoading} />
      {/*@ts-ignore*/}
      <BottomScrollListener
        onBottom={() => {
          isMobileSize && handleLoadMore();
        }}
      />
    </ReportContainer>
  );
};

export default ReportBalanceChange;
