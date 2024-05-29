import { createContext, ReactNode, useState } from "react";
import { DateRangeInfo, useDateRange } from "@/components/account/Report/hooks/useDateRange";
import Dialog, { CommonDialogProps } from "@/components/UI/Dialog/Dialog";


type AgentContextValue = {
    winLossReport: {
        dateRangeInfo: DateRangeInfo,
        handleDateFromChange: (e?: Date) => void,
        handleDateToChange: (e?: Date) => void,
        handleDateRangeChange: (dateRangeEnum: number) => void,
        isSelectedDateRange: boolean,
    },
    dialog: {
        onOpen: (children: ReactNode) => void,
    } & CommonDialogProps
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
    },
    dialog: {
        open: false,
        onClose: () => {},
        onOpen: () => {},
        children: '',
    },
}

export const AgentContext = createContext(defaultValue);

type Props = {
    children: ReactNode
}

export const AgentContextProvider = ({children}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogChildren, setDialogChildren] = useState<ReactNode>('');

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
        },
        dialog: {
            open: isOpen,
            onClose: () => {
                setIsOpen(false)
            },
            onOpen: (children) => {
                setIsOpen(true);
                setDialogChildren(children);
            },
            children: dialogChildren,
        },
    }

    return (
        <AgentContext.Provider value={value}>
            <Dialog open={value.dialog.open} onClose={value.dialog.onClose}>
                {value.dialog.children}
            </Dialog>
            {children}
        </AgentContext.Provider>
    )
}