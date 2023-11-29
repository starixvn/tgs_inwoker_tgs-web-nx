import { useContext } from "react";
import { InboxDetailContext } from "./contexts/inboxDetailContext";
import { InboxReplyContext } from "./contexts/inboxReplyContext";
import { SendDetailContext } from "./contexts/sendDetailContext";

export const useInboxDetailContext = () => useContext(InboxDetailContext);
export const useInboxReplyContext = () => useContext(InboxReplyContext);
export const useSendDetailContext = () => useContext(SendDetailContext);
export * from "./contexts/inboxDetailContext";
export * from "./contexts/inboxReplyContext";
export * from "./contexts/sendDetailContext";

export * from "./hooks/useInboxList";
export * from "./hooks/useSendList";
export * from "./hooks/useDialogContent";
export { INBOX_TABLE_ROW_COUNT } from "./constants";
