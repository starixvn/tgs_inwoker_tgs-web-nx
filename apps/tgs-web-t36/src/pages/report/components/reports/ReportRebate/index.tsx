import React, { useEffect, useState } from "react";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications } from "@tgs-web-nx/core/features";
import NoRecord from "@/pages/report/components/NoRecord";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";
import { ReportContainer } from "@/components/styled-component/Report";
import { ReportService } from "@tgs-web-nx/core";
import moment from "moment";
import { useRwd } from "@tgs-web-nx/core/hooks";
import AgentReportTable from "./components/AgentReportTable";
import differenceInDays from "date-fns/differenceInDays";
import AgentReportCards from "./components/AgentReportCards";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportRebate = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const { isDesktopSize, isMobileSize } = useRwd();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [agentReport, setAgentReport] = useState<any[]>([]);
  const [agentReportForMobile, setAgentReportForMobile] = useState<any[]>([]);

  const [isMaxPage, setIsMaxPage] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const fetchReports = async (page: number) => {
    if (differenceInDays(dateRangeInfo.dateTo, dateRangeInfo.dateFrom) > 31) {
      return alert("", i18n.t("report.agentRebate.intervalDays").replace(/{maxdays}/g, "31"));
    }
    setIsLoading(true);
    const agentReportRes = await ReportService.GetAgentReport(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
    );

    if (agentReportRes.IsSuccess) {
      const newDataList =
        page > 1
          ? agentReportForMobile.concat(agentReportRes.data.items)
          : agentReportRes.data.items;

      setAgentReport(agentReportRes.data.items);
      setAgentReportForMobile(newDataList);
      setIsMaxPage(agentReportRes.data.totalCount == newDataList.length);
      setTotalCount(agentReportRes.data.totalCount || 0);
    } else {
      alert("", agentReportRes?.info || JSON.stringify(agentReportRes));
      setIsLoading(false);
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
        <AgentReportTable
          agentReport={agentReport}
          totalCount={totalCount}
          page={page}
          pageSize={PAGE_SIZE}
          onPageChange={(page: number) => handlePageChange(page)}
        />
      ) : (
        <AgentReportCards agentReport={agentReport} />
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

export default ReportRebate;
