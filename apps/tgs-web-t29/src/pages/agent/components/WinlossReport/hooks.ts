import { useContext, useEffect, useState } from "react";
import moment from "moment";
import { useAccountStore, WinLostConfig, WinLostReport } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { AgentContext } from "../AgentContextProvider";
import { useDateRange } from "../useDateRange";



export const useWinlossReport = () => {
    const { account } = useAccountStore();
    const username = account.info.member_username;
    const {getReport, getBreadcrumb} = WinLostReport;
    const [memberType, setMemberType] = useState("agent");
    const [searchValue, setSearchValue] = useState(username);
    const [usernames, setUsernames] = useState<string[]>([]);
    const [page, setPage] = useState(0);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

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
        page,
        rows: 20,
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

    const handleOnSearch = () => {
        setUsernames([]);
        report.refetch();
        breadCrumb.refetch();
    }

    const handleOnClickUsername = (username: string, memberType = 'agent') => {
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
    }
}

export const usePlayerDetail = ({
    from,
    to,
    username
}) => {
    const {getPlayerDetail} = WinLostReport;
    const {
        refetch: refetchReport,
        data, 
        isFetching: isFetchingReportData,
        isFetched: isFetchedReport,
    } = useQuery({
        queryKey: ['getPlayerDetail'], 
        queryFn: () => getPlayerDetail({from, to, username}),
        // enabled: false
    });

    
};