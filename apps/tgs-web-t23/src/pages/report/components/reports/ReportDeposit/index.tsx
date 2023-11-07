import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { useNotifications } from "@/core/feature/useNotifications";
import { ReportService } from "@/core/services/ReportService";
import Loading from "@/components/UI/Loading";
import { useDepositStatus } from "@/core/components/Report/hooks/useDepositStatus";
import StatusSelect from "@/pages/report/components/StatusSelect";
import { DateRangeInfo } from "@/core/components/Report/hooks/useDateRange";
import { DepositFormViewModel } from "@/core/models/dto/report/GetDepositDetailsResDto";
import DepositDetailCards from "@/pages/report/components/reports/ReportDeposit/components/DepositDetailCards";
import { useRwd } from "@/core/hooks/tools/useRwd";
import DepositDetailTable from "@/pages/report/components/reports/ReportDeposit/components/DepositDetailTable";
import { BottomScrollListener } from "react-bottom-scroll-listener";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportDeposit = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [depositDetails, setDepositDetails] = useState<DepositFormViewModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

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
          ? depositDetails.concat(getDepositDetailsRes.data.items)
          : getDepositDetailsRes.data.items;

      setDepositDetails(newDepositDetails);
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

  return (
    <>
      <StatusSelect
        statusDictionary={statusDictionary}
        status={status}
        handleStatusChange={handleStatusChange}
      />

      {isDesktopSize ? (
        <DepositDetailTable transferDetails={depositDetails} totalCount={totalCount} />
      ) : (
        <DepositDetailCards transferDetails={depositDetails} />
      )}

      <Loading show={isLoading} />
      {/*@ts-ignore*/}
      <BottomScrollListener onBottom={handleLoadMore} />
    </>
  );
};

export default ReportDeposit;
