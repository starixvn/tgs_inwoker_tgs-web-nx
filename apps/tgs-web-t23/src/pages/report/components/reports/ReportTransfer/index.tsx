import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { useNotifications } from "@/core/feature/useNotifications";
import { ReportService } from "@/core/services/ReportService";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/core/components/Report/hooks/useDateRange";
import { GameBalanceInfosViewModel } from "@/core/types/dto/report/GetTransferReportResDto";
import { useRwd } from "@/core/hooks/tools/useRwd";
import TransferDetailTable from "@/pages/report/components/reports/ReportTransfer/components/TransferDetailTable";
import TransferDetailCard from "@/pages/report/components/reports/ReportTransfer/components/TransferDetailCard";
import { ReportContainer } from "@/components/styled-component/Report";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const Index = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { isDesktopSize } = useRwd();

  const [transferDetails, setTransferDetails] = useState<GameBalanceInfosViewModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getTransferReportRes = await ReportService.GetTransferReport(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      1,
      true,
      "BalanceTime",
      false,
    );

    if (getTransferReportRes.IsSuccess) {
      const newTransferDetails =
        page > 1
          ? transferDetails.concat(getTransferReportRes.data.items)
          : getTransferReportRes.data.items;

      setTransferDetails(newTransferDetails);
      setTotalCount(getTransferReportRes.data.totalCount || 0);
      setIsMaxPage(getTransferReportRes.data.totalCount == newTransferDetails.length);
    } else {
      alert("", getTransferReportRes?.info || JSON.stringify(getTransferReportRes));
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
        <TransferDetailTable transferDetails={transferDetails} totalCount={totalCount} />
      ) : (
        <TransferDetailCard transferDetails={transferDetails} />
      )}
      <Loading show={isLoading} />
      {/*@ts-ignore*/}
      <BottomScrollListener onBottom={handleLoadMore} />
    </ReportContainer>
  );
};

export default Index;
