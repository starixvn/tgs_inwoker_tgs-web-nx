import { useEffect, useState } from "react";
import moment from "moment";
import { useAccountStore, WinLostConfig, WinLostReport } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { DateRangeInfo } from "@/components/account/Report/hooks/useDateRange";

export const useWinlossReport = (dateRangeInfo: DateRangeInfo) => {
    const { account } = useAccountStore();
    const username = account.info.member_username;
    const {getReport, getBreadcrumb} = WinLostReport;
    const [memberType, setMemberType] = useState("agent");
    const [searchValue, setSearchValue] = useState("");
    const [usernames, setUsernames] = useState<string[]>([]);

    const config: WinLostConfig = {
        from: moment(dateRangeInfo.dateFrom).format('YYYY-MM-DD'),
        to: moment(dateRangeInfo.dateTo).format('YYYY-MM-DD'),
        memberType,
        username,
        downline: false,
    };
    
    const {
        refetch: refetchReport,
        data: reportData, 
        isFetching: isFetchingReportData
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
        config.username = searchValue ? searchValue : username;
        report.refetch();
        breadCrumb.refetch();
    }

    const handleOnClickUsername = (username: string, memberType: string) => {
        config.downline = true;
        config.username = username;
        config.memberType = memberType;

        report.refetch();

        setUsernames([...usernames, username])
    }

    useEffect(() => {
        breadCrumb.update();
    }, [breadCrumb.data])

    return {
        setSearchValue,
        setMemberType,
        setUsernames,
        handleOnSearch,
        handleOnClickUsername,
        searchValue,
        memberType,
        report,
        breadCrumb,
        usernames
    }
}