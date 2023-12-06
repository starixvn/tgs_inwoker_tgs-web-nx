import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { WithdrawFormViewModel } from "@tgs-web-nx/types";
import { ReportService } from "@tgs-web-nx/core";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { ReportContainer } from "@/components/styled-component/Report";
import Loading from "@/components/UI/Loading";
import { useWithdrawalStatus } from "@/components/account/Report/hooks/useWithdrawalStatus";
import StatusSelect from "@/pages/report/components/StatusSelect";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";
import WithdrawalDetailTable from "@/pages/report/components/reports/ReportWithdraw/components/WithdrawalDetailTable";
import WithdrawalDetailCards from "@/pages/report/components/reports/ReportWithdraw/components/WithdrawalDetailCards";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportWithdraw = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawFormViewModel[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

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
          ? withdrawalDetails.concat(getWithdrawalDetailsRes.data.items)
          : getWithdrawalDetailsRes.data.items;
      setWithdrawalDetails(newWithdrawalDetails);
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

  return (
    <>
      <StatusSelect
        statusDictionary={statusDictionary}
        status={status}
        handleStatusChange={handleStatusChange}
      />

      <ReportContainer>
        {isDesktopSize ? (
          <WithdrawalDetailTable withdrawalDetails={withdrawalDetails} totalCount={totalCount} />
        ) : (
          <WithdrawalDetailCards withdrawalDetails={withdrawalDetails} />
        )}
        <Loading show={isLoading} />
      </ReportContainer>
      {/*@ts-ignore*/}
      <BottomScrollListener onBottom={handleLoadMore} />
    </>
  );
};

export default ReportWithdraw;
