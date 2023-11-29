import React from "react";
import { InboxItemDetail } from "@tgs-web-nx/types";
import { useInboxDetailContext, useInboxReplyContext } from "@tgs-web-nx/core/features";
import Dialog from "@/components/UI/Dialog/Dialog";
import LoadingBlock from "@/components/project/LoadingBlock";
import InboxDialogContent from "@/pages/inbox/components/dialog/InboxDialogContent";

const InboxItemDetailDialog = () => {
  const { isDetailDialogOpen, handleCloseDetailDialog, isLoading, inboxItemDetail, error } =
    useInboxDetailContext();
  const { handleOpenReplyDialog } = useInboxReplyContext();

  const handleClickReply = (inboxItemDetail: InboxItemDetail | null) => {
    if (!inboxItemDetail) return;

    handleCloseDetailDialog();
    handleOpenReplyDialog(inboxItemDetail);
  };

  return (
    <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog} fullWidth maxWidth={"sm"}>
      {isLoading && <LoadingBlock size={30} />}

      {!isLoading && !!inboxItemDetail && !error && (
        <InboxDialogContent
          inboxItemDetail={inboxItemDetail}
          handleReply={() => handleClickReply(inboxItemDetail)}
        />
      )}
    </Dialog>
  );
};

export default React.memo(InboxItemDetailDialog);
