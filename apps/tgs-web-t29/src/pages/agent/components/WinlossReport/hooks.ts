import { useEffect, useState } from "react";
import moment from "moment";
import { useAccountStore, WinLostConfig, WinLostReport } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { useDateRange } from "../useDateRange";


const rows = 20;

export const useWinlossReport = () => {
    const { account } = useAccountStore();
    const username = account.info.member_username;
    const {getReport, getBreadcrumb} = WinLostReport;
    const [memberType, setMemberType] = useState("agent");
    const [searchValue, setSearchValue] = useState(username);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [page, setPage] = useState(0);

    const {
        dateRangeInfo,
        handleDateFromChange,
        handleDateToChange,
        handleDateRangeChange,
        isSelectedDateRange,
      } = useDateRange();

    const config: WinLostConfig = {
        from: moment(dateRangeInfo.dateFrom).format('YYYY-MM-DD'),
        to: moment(dateRangeInfo.dateTo).format('YYYY-MM-DD'),
        memberType,
        username: searchValue,
        downline: false,
        page: page + 1,
        rows,
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

    const report = {
        refetch: refetchReport,
        items: reportData && reportData.data.items,
        hasData: reportData?.data.items && reportData.data.items.length > 0,
        isFetching: isFetchingReportData,
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

    const breadCrumb = {
        refetch: refetchBreadCrumb,
        data: breadCrumbData?.data,
        isFetching: isFetchingBreadCrumbData,
        update: () => setUsernames(breadCrumbData?.data.map(row => row.username) ?? [])
    }

    const resetPage = () => {
        config.page = 1;
        setPage(0);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);

        config.downline = true;
        config.page = newPage + 1

        refetchReport();
    };

    const handleOnSearch = () => {
        resetPage();

        setUsernames([]);
        report.refetch();
        breadCrumb.refetch();
    }

    const handleOnClickUsername = (username: string, memberType = 'agent') => {
        resetPage();
        config.downline = true;
        config.username = username;
        config.memberType = memberType;

        report.refetch();

        setUsernames([...usernames, username])
    }

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


    useEffect(() => {
        breadCrumb.update();
    }, [breadCrumb.data])

    useEffect(() => {
        config.downline =false;
        handleDateRangeChange(0);
        setTimeout(handleOnSearch, 100)
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

export const usePlayerDetail = ({
    from,
    to,
}: {
    from: string,
    to: string,
}) => {
    const [username, setUsername] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const {getPlayerDetail} = WinLostReport;
    const {
        refetch,
        data: playerDetailData, 
    } = useQuery({
        queryKey: ['getPlayerDetail'], 
        queryFn: () => getPlayerDetail({from, to, username}),
        enabled: false
    });

    const handleGetPlayerDetail = (name: string) => {
        setUsername(name);
        setModalOpen(true);
    }

    const handleOnCloseModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        refetch();
    }, [username])
    
    return {
        playerDetailData,
        handleGetPlayerDetail,
        modalOpen,
        handleOnCloseModal
    }
    
};