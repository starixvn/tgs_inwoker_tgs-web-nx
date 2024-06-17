import { useEffect, useState, useCallback, useRef } from "react";
import moment from "moment";
import { useAccountStore, WinLostConfig, WinLostReport } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
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

/**
 * 處理輸贏報表相關邏輯
 */
export const useWinlossReport = () => {
    const { account } = useAccountStore();
    const username = account.info.member_username;
    const {getReport, getBreadcrumb} = WinLostReport;
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
    const config: WinLostConfig = {
        from: moment(getYesterday(dateRangeInfo.dateFrom)).format('YYYY-MM-DD'),
        to: moment(dateRangeInfo.dateTo).format('YYYY-MM-DD'),
        memberType,
        username: searchValue,
        downline: false,
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
        queryFn: () => getReport(config),
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
        hasData: reportData?.data.items && reportData.data.items.length > 0,
        isFetching: isFetchingReportData,
        fee: {
        }
    }
    
    const {
        refetch: refetchBreadCrumb,
        data: breadCrumbData,
        isFetching: isFetchingBreadCrumbData,
    } = useQuery({
        queryKey: ['breadcrumb'], 
        queryFn: () => getBreadcrumb({
            username: config.username, 
            memberType: config.memberType
        }),
        enabled: false
    });

    /**
     * 麵包屑
     * @refetch 重新呼叫api
     * @data 當前麵包屑資料
     * @isFetching 是否正在呼叫 api
     * @update 更新 UI 狀態
     */
    const breadCrumb = {
        refetch: refetchBreadCrumb,
        data: breadCrumbData?.data,
        isFetching: isFetchingBreadCrumbData,
        update: () => setUsernames(breadCrumbData?.data.map(row => row.username) ?? [])
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

        config.downline = true;
        config.page = newPage + 1

        refetchReport();
    };

    /**
     * 處理搜尋使用者名稱
     */
    const handleOnSearch = () => {
        resetPage();
        
        config.downline = false;
        setUsernames([]);
        report.refetch();
        breadCrumb.refetch();
    }

    /**
     * 處理點擊搜尋結果的使用者名稱
     * @param username 被點擊的使用者名稱 
     * @param memberType 使用者的狀態
     * @returns 
     */
    const handleOnClickUsername = (username: string, memberType = 'agent') => {
        if(report.isFetching || memberType === 'player') {
            return;
        }
        
        resetPage();
        config.downline = true;
        config.username = username;
        config.memberType = memberType;
        report.refetch();
        
        
        setUsernames([...usernames, username])
    }

    /**
     * 處理點擊麵包屑
     * @param username 被點擊的使用者名稱 
     * @param isDisable 麵包屑的最後一層不觸發任何行為
     * @returns 
     */
    const handleOnClickBreadcrumb = (username: string, isDisable: boolean) => {
        if(isDisable) {
            return;
        }
        
        config.downline = true;
        config.username = username;
        config.memberType = 'agent';

        const currentIndex = usernames.indexOf(username);
        if (currentIndex !== -1) {
            const newUsernames = usernames.slice(0, currentIndex + 1);
            setUsernames(newUsernames);
        }

        report.refetch();
    }

    //麵包屑資料更新時，同步更新麵包屑 UI
    useEffect(() => {
        breadCrumb.update();
    }, [breadCrumb.data])

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
        handleOnClickUsername,
        handleOnClickBreadcrumb,
        searchValue,
        memberType,
        report,
        breadCrumb,
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

/**
 * 處理玩家細節相關邏輯
 */
export const usePlayerDetail = ({
    from,
    to,
}: {
    from: string,
    to: string,
}) => {
    const [agentId, setAgentId] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const {getPlayerDetail} = WinLostReport;
    const {
        refetch,
        data: playerDetailData, 
    } = useQuery({
        queryKey: ['getPlayerDetail'], 
        queryFn: () => getPlayerDetail({from, to, agentId}),
        enabled: false
    });

    /**
     * 取得特定玩家細節
     * @param id 被取得資料的 agentId
     */
    const handleGetPlayerDetail = (id: string) => {
        setAgentId(id);
        setModalOpen(true);
    }

    /**
     * 處理關閉 modal
     */
    const handleOnCloseModal = () => {
        setModalOpen(false);
    }

    // agentId 被改變時，重新取得對應資料
    useEffect(() => {
        if(agentId){
            refetch();
        }
    }, [agentId])
    
    return {
        playerDetailData,
        handleGetPlayerDetail,
        modalOpen,
        handleOnCloseModal
    }
    
};


/**
 * 處理X軸滑動問題
 */
export const useDragToScrollX = (
    elementRef: React.MutableRefObject<HTMLElement | null>,
) => {
    const positionOnClick = useRef({ elementScrollLeft: 0, mouseX: 0 });

    const onMouseMove = useCallback(
        (e: MouseEvent) => {
            const moveX = e.clientX - positionOnClick.current.mouseX;

            if(elementRef.current) {
                elementRef.current.scrollLeft = positionOnClick.current.elementScrollLeft - moveX;
            }
        },
        [elementRef],
    );

    const onMouseMoveFinish = useCallback(() => {
        if(elementRef.current){
            elementRef.current.removeEventListener("mousemove", onMouseMove);
            elementRef.current.removeEventListener("mouseup", onMouseMoveFinish);
            elementRef.current.removeEventListener("mouseleave", onMouseMoveFinish);
        }
    }, [elementRef, onMouseMove]);

    useEffect(() => {
        if (elementRef.current) {
            const element = elementRef.current;

            element.addEventListener("mousedown", (e) => {
                positionOnClick.current = {
                    elementScrollLeft: element.scrollLeft,
                    mouseX: e.clientX,
                };

                element.addEventListener("mousemove", onMouseMove);
                element.addEventListener("mouseup", onMouseMoveFinish);
                element.addEventListener("mouseleave", onMouseMoveFinish);
            });
        }
    }, [elementRef, onMouseMove, onMouseMoveFinish]);
};

