import { createContext, ReactNode } from "react";
import { DateRangeInfo, useDateRange } from "@/components/account/Report/hooks/useDateRange";


type AgentContextValue = {
    winLossReport: {
        dateRangeInfo: DateRangeInfo,
        handleDateFromChange: (e?: Date) => void,
        handleDateToChange: (e?: Date) => void,
        handleDateRangeChange: (dateRangeEnum: number) => void,
        isSelectedDateRange: boolean,
    }
}

const today = new Date();

const defaultValue: AgentContextValue = {
    winLossReport: {
        dateRangeInfo: {
            dateFrom: today,
            dateTo: today,
            dateRange: -1
        },
        handleDateFromChange: () => {},
        handleDateToChange: () => {},
        handleDateRangeChange: () => {},
        isSelectedDateRange: false,
    }
}

export const AgentContext = createContext(defaultValue);

type Props = {
    children: ReactNode
}

export const AgentContextProvider = ({children}: Props) => {
    const {
        dateRangeInfo,
        handleDateFromChange,
        handleDateToChange,
        handleDateRangeChange,
        isSelectedDateRange,
      } = useDateRange();

    const value: AgentContextValue = {
        winLossReport: {
            dateRangeInfo,
            handleDateFromChange,
            handleDateToChange,
            handleDateRangeChange,
            isSelectedDateRange,
        }
    }

    return (
        <AgentContext.Provider value={value}>
            {children}
        </AgentContext.Provider>
    )
}