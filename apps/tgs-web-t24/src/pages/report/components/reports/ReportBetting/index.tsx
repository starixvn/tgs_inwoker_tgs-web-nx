import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { RoundTotalDto, TransactionDetail } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { ReportContainer } from "@/components/styled-component/Report";
import { ReportService } from "@/core/services/ReportService";
import { useNotifications } from "@/core/feature/useNotifications";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/core/components/Report/hooks/useDateRange";
import TransactionDetailCards from "@/pages/report/components/reports/ReportBetting/components/TransactionDetailCards";
import { useRwd } from "@/core/hooks/tools/useRwd";
import TransactionDetailTable from "@/pages/report/components/reports/ReportBetting/components/TransactionDetailTable";
import TotalState from "@/pages/report/components/reports/ReportBetting/components/TotalState";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportBetting = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [transactionDetails, setTransactionDetails] = useState<TransactionDetail[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const [roundTotal, setRoundTotal] = useState<RoundTotalDto>({
    betAmount: null,
    validBetAmount: null,
    winLoss: null,
    settleAmount: null,
  });
  const { isDesktopSize } = useRwd();

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getTransactionDetailsRes = await ReportService.GetTransactionDetails(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      true,
      "",
      false,
    );

    if (getTransactionDetailsRes.IsSuccess) {
      const newDataList =
        page > 1
          ? transactionDetails.concat(getTransactionDetailsRes.data.items)
          : getTransactionDetailsRes.data.items;

      setTransactionDetails(newDataList);
      setIsMaxPage(getTransactionDetailsRes.data.totalcount == newDataList.length);
      setTotalCount(getTransactionDetailsRes.data.totalcount || 0);
    } else {
      alert("", getTransactionDetailsRes?.info || JSON.stringify(getTransactionDetailsRes));
      setIsLoading(false);
    }

    if (!config.features.Report_ShowRoundsTotal) return;

    const getRoundsTotalRes = await ReportService.GetRoundsTotal(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
    );

    if (getRoundsTotalRes.IsSuccess) {
      setRoundTotal(getRoundsTotalRes.data);
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
      <TotalState roundTotal={roundTotal} />

      {isDesktopSize ? (
        <TransactionDetailTable transactionDetails={transactionDetails} totalCount={totalCount} />
      ) : (
        <TransactionDetailCards transactionDetails={transactionDetails} />
      )}
      <Loading show={isLoading} />
      {/*@ts-ignore*/}
      <BottomScrollListener onBottom={handleLoadMore} />
    </ReportContainer>
  );
};

export default ReportBetting;
