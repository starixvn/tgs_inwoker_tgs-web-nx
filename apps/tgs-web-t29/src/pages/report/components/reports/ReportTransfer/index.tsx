import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { GameBalanceInfosViewModel } from "@tgs-web-nx/types";
import { ReportService } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";
import TransferDetailTable from "@/pages/report/components/reports/ReportTransfer/components/TransferDetailTable";
import TransferDetailCard from "@/pages/report/components/reports/ReportTransfer/components/TransferDetailCard";
import { ReportContainer } from "@/components/styled-component/Report";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 10;
const ReportTransfer = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { isDesktopSize, isMobileSize } = useRwd();

  const [transferDetails, setTransferDetails] = useState<GameBalanceInfosViewModel[]>([]);
  const [transferDetailsForMobile, setTransferDetailsForMobile] = useState<
    GameBalanceInfosViewModel[]
  >([]);
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
          ? transferDetailsForMobile.concat(getTransferReportRes.data.items)
          : getTransferReportRes.data.items;

      setTransferDetails(getTransferReportRes.data.items);
      await setTransferDetailsForMobile(newTransferDetails);
      setTotalCount(getTransferReportRes.data.totalCount || 0);
      setIsMaxPage(getTransferReportRes.data.totalCount === transferDetailsForMobile.length);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dateRangeInfo)]);

  const handleLoadMore = async () => {
    if (isMaxPage) return;
    if (isLoading) return;

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
        <TransferDetailTable
          transferDetails={transferDetails}
          totalCount={totalCount}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => handlePageChange(page)}
        />
      ) : (
        <TransferDetailCard transferDetails={transferDetailsForMobile} />
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

export default ReportTransfer;
