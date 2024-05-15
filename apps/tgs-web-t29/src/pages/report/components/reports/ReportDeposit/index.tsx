import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { DepositFormViewModel } from "@tgs-web-nx/types";
import { ReportService } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Loading from "@/components/UI/Loading";
import { useDepositStatus } from "@/components/account/Report/hooks/useDepositStatus";
import StatusSelect from "@/pages/report/components/StatusSelect";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";
import DepositDetailCards from "@/pages/report/components/reports/ReportDeposit/components/DepositDetailCards";
import DepositDetailTable from "@/pages/report/components/reports/ReportDeposit/components/DepositDetailTable";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 10;
const ReportDeposit = ({ dateRangeInfo }: Props) => {
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
      await setDepositDetailsForMobile(newDepositDetails);
      setTotalCount(getDepositDetailsRes.data.totalCount || 0);
      setIsMaxPage(getDepositDetailsRes.data.totalCount === depositDetailsForMobile.length);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(dateRangeInfo), status]);

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
    <>
      <StatusSelect
        type="deposit"
        statusDictionary={statusDictionary}
        status={status}
        handleStatusChange={handleStatusChange}
      />

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
