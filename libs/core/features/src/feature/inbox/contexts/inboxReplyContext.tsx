import React, { createContext, useCallback, useState } from "react";
import { InboxItemDetail, ReplyInboxItemReqDto } from "@tgs-web-nx/types";
import { GeneralService } from "@tgs-web-nx/core";

const initialState: {
  isReplyDialogOpen: boolean;
  handleOpenReplyDialog: (newInboxItemDetail: InboxItemDetail) => void;
  handleCloseReplyDialog: () => void;
  inboxItemDetail: InboxItemDetail | null;
  handleSubmitReply: (replyInboxItemReqDto: ReplyInboxItemReqDto) => Promise<void>;
} = {
  isReplyDialogOpen: false,
  handleOpenReplyDialog: () => {},
  handleCloseReplyDialog: () => {},
  inboxItemDetail: null,
  handleSubmitReply: () => Promise.resolve(),
};

export const InboxReplyContext = createContext({
  ...initialState,
});

type ProviderProps = {
  children: React.ReactNode;
};

export const InboxReplyContextProvider = ({ children }: ProviderProps) => {
  // dialog actions
  const [inboxItemDetail, setInboxItemDetail] = useState<InboxItemDetail | null>(null);
  const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false);

  const handleOpenReplyDialog = useCallback((newInboxItemDetail: InboxItemDetail) => {
    setInboxItemDetail(newInboxItemDetail);
    setIsReplyDialogOpen(true);
  }, []);

  const handleCloseReplyDialog = useCallback(() => {
    setIsReplyDialogOpen(false);
  }, []);

  const handleSubmitReply = useCallback(async (replyInboxItemReqDto: ReplyInboxItemReqDto) => {
    setIsReplyDialogOpen(false);
    await GeneralService.ReplyInboxItem(replyInboxItemReqDto);
  }, []);

  return (
    <InboxReplyContext.Provider
      value={{
        isReplyDialogOpen,
        handleOpenReplyDialog,
        handleCloseReplyDialog,
        inboxItemDetail,
        handleSubmitReply,
      }}
    >
      {children}
    </InboxReplyContext.Provider>
  );
};
