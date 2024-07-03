import { useEffect, useState } from "react";
import moment from "moment";
import { Contribution, useAccountStore, ContributionConfig } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { ContributionItem } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import { useDateRange } from "../useDateRange";
const rows = 20;

/**
 * 送出給後端之前，from的日期必須減一天(同BO輸贏報表邏輯)
 * https://raypro.atlassian.net/browse/TGS-4885
 * @param today 今天
 * @returns 今天 - 1天 = 昨天
 */
const getYesterday = (today: Date) => {
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
  
    return yesterday;
}


function calculatePageTotal(items: ContributionItem[]): ContributionItem {
    const totals = {
        username: i18n.t("agent.pageTotal"),
        type: 0,
        depositAmount: 0,
        depositHandlingFee: 0,
        withdrawalAmount: 0,
        companyAdjustAmount: 0,
        agentAdjustAmount: 0,
        bonusAdjustAmount: 0,
        bonusAmount: 0,
        betAmount: 0,
        validBetAmount: 0,
        turnover: 0,
        winLossAmount: 0,
        netProfit: 0
    };

    // 計算總和
    items.forEach(item => {
        totals.depositAmount += item.depositAmount;
        totals.depositHandlingFee += item.depositHandlingFee;
        totals.withdrawalAmount += item.withdrawalAmount;
        totals.companyAdjustAmount += item.companyAdjustAmount;
        totals.agentAdjustAmount += item.agentAdjustAmount;
        totals.bonusAdjustAmount += item.bonusAdjustAmount;
        totals.bonusAmount += item.bonusAmount;
        totals.betAmount += item.betAmount;
        totals.validBetAmount += item.validBetAmount;
        totals.turnover += item.turnover;
        totals.winLossAmount += item.winLossAmount;
        totals.netProfit += item.netProfit;
    });

    return totals;
}

/**
 * 處理貢獻報表相關邏輯
 */
export const useContribution = () => {
    const { account } = useAccountStore();
    const username = account.info.member_username;
    const {getContribution} = Contribution;
    const [memberType, setMemberType] = useState("agent");
    const [searchValue, setSearchValue] = useState(username);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [page, setPage] = useState(0);

    // 日期範圍 hook
    const {
        dateRangeInfo,
        handleDateFromChange,
        handleDateToChange,
        handleDateRangeChange,
        isSelectedDateRange,
      } = useDateRange();
    
    // 取得輸贏報表 payload
    const config: ContributionConfig = {
        from: moment(getYesterday(dateRangeInfo.dateFrom)).format('YYYY-MM-DD'),
        to: moment(dateRangeInfo.dateTo).format('YYYY-MM-DD'),
        desc: true,
        page: page + 1, //payload 從1開始, state 從0開始
        rows, //固定為20
    };
    
    const {
        refetch: refetchReport,
        data: reportData, 
        isFetching: isFetchingReportData,
        isFetched: isFetchedReport,
    } = useQuery({
        queryKey: ['report'], 
        queryFn: () => getContribution(config),
        enabled: false
    });

    /**
     * 報表
     * @refetch 重新呼叫api
     * @items 當前資料
     * @hasData 是否有資料
     * @isFetching 是否正在呼叫 API
     */
    const report = {
        refetch: refetchReport,
        items: reportData && reportData.data.items,
        total: reportData && {username: i18n.t("agent.total"), type: 0, ...reportData.data.total},
        pageTotal: reportData && calculatePageTotal(reportData.data.items),
        totalCount: reportData && reportData.data.totalCount,
        hasData: reportData?.data.items && reportData.data.items.length > 0,
        isFetching: isFetchingReportData,
    }
    

    /**
     * 重置當前page
     */
    const resetPage = () => {
        config.page = 1;
        setPage(0);
    };

    /**
     * 處理 paginator 換頁行為
     */
    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
        config.page = newPage + 1
        refetchReport();
    };

    /**
     * 處理搜尋使用者名稱
     */
    const handleOnSearch = () => {
        resetPage();
        setUsernames([]);
        report.refetch();
    }

    // 預設進頁面搜尋當天資料
    useEffect(() => {
        handleDateRangeChange(0);
        setTimeout(handleOnSearch, 100) //須等日期更新完成才搜尋
    }, [isFetchedReport])

    return {
        setSearchValue,
        setMemberType,
        setUsernames,
        handleOnSearch,
        searchValue,
        memberType,
        report,
        usernames,
        dateRangeInfo,
        page, 
        handleChangePage,
        handleDateFromChange,
        handleDateToChange,
        handleDateRangeChange,
        isSelectedDateRange,
        totalCount: reportData?.data.totalCount,
        config,
    }
}
