import { createContext, ReactNode, useState } from "react";
import Dialog, { CommonDialogProps } from "@/components/UI/Dialog/Dialog";


type AgentContextValue = {
    dialog: {
        onOpen: (children: ReactNode) => void,
    } & CommonDialogProps
}


const defaultValue: AgentContextValue = {
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


    const value: AgentContextValue = {
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