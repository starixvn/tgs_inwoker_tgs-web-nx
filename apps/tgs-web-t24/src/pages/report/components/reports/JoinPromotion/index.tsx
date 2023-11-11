import React, { useEffect, useState } from "react";
import moment from "moment";
import { BottomScrollListener } from "react-bottom-scroll-listener";
import { GetJoinedPromoReportResDto, JoinedPromotionsResponse } from "@tgs-web-nx/types";
import { useNotifications } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GeneralService } from "@tgs-web-nx/core";
import { ReportContainer } from "@/components/styled-component/Report";
import Loading from "@/components/UI/Loading";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";
import JoinPromotionCards from "@/pages/report/components/reports/JoinPromotion/components/JoinPromotionCards";
import JoinPromotionTable from "@/pages/report/components/reports/JoinPromotion/components/JoinPromotionTable";

type Props = {
  dateRangeInfo: DateRangeInfo;
};

const PAGE_SIZE = 20;
const ReportJoinPromotion = ({ dateRangeInfo }: Props) => {
  const { alert } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [promotionDetails, setPromotionDetails] = useState<JoinedPromotionsResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isMaxPage, setIsMaxPage] = useState(false);
  const { isDesktopSize } = useRwd();

  const fetchReports = async (page: number) => {
    setIsLoading(true);

    const getJoinedPromoReportRes = (await GeneralService.GetJoinedPromoReport(
      moment(dateRangeInfo.dateFrom).utc().format(),
      moment(dateRangeInfo.dateTo).utc().add(1, "days").format(),
      page,
      PAGE_SIZE,
      false,
      "",
      false,
    )) as unknown as GetJoinedPromoReportResDto;

    if (getJoinedPromoReportRes.IsSuccess) {
      const newPromotionDetails =
        page > 1
          ? promotionDetails.concat(getJoinedPromoReportRes.data.items)
          : getJoinedPromoReportRes.data.items;

      setPromotionDetails(newPromotionDetails);
      setTotalCount(getJoinedPromoReportRes.data.totalcount || 0);
      setIsMaxPage(getJoinedPromoReportRes.data.totalcount == newPromotionDetails.length);
    } else {
      alert("", getJoinedPromoReportRes?.info || JSON.stringify(getJoinedPromoReportRes));
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
        <JoinPromotionTable promotionDetails={promotionDetails} totalCount={totalCount} />
      ) : (
        <JoinPromotionCards promotionDetails={promotionDetails} />
      )}
      <Loading show={isLoading} />
      {/*@ts-ignore*/}
      <BottomScrollListener onBottom={handleLoadMore} />
    </ReportContainer>
  );
};

export default ReportJoinPromotion;
