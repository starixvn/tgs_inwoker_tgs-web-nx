import React, { useEffect, useState } from "react";
import moment from "moment";
import { useNotifications } from "@/core/feature/useNotifications";
import { ReportService } from "@/core/services/ReportService";
import Loading from "@/components/UI/Loading";
import { TransactionLogViewModel } from "@/core/models/dto/report/GetBalanceChangesResDto";
import { DateRangeInfo } from "@/core/components/Report/hooks/useDateRange";
import { useRwd } from "@/core/hooks/tools/useRwd";
import BalanceChangeCards from "@/pages/report/components/reports/ReportBalanceChange/components/BalanceChangeCards";
import TransactionDetailTable from "@/pages/report/components/reports/ReportBalanceChange/components/BalanceChangeTable";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { ReportContainer } from "@/components/styled-component/Report";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportBalanceChange = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [balanceChangeDetails, setBalanceChangeDetails] = useState<TransactionLogViewModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

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
          ? balanceChangeDetails.concat(getBalanceChangeRes.data.items)
          : getBalanceChangeRes.data.items;

      setBalanceChangeDetails(newDataList);
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

  return (
    <ReportContainer>
      {isDesktopSize ? (
        <TransactionDetailTable
          balanceChangeDetails={balanceChangeDetails}
          totalCount={totalCount}
        />
      ) : (
        <BalanceChangeCards balanceChangeDetails={balanceChangeDetails} />
      )}
      <Loading show={isLoading} />
      {/*@ts-ignore*/}
      <BottomScrollListener onBottom={handleLoadMore} />
    </ReportContainer>
  );
};

export default ReportBalanceChange;
