import React from "react";
import { useInboxReplyContext } from "@tgs-web-nx/core/features";
import InboxReplyContent from "@/pages/inbox/components/dialog/InboxReplyContent";
import Dialog from "@/components/UI/Dialog/Dialog";

const InboxDetailDialog = () => {
  const { isReplyDialogOpen, handleCloseReplyDialog, inboxItemDetail, handleSubmitReply } =
    useInboxReplyContext();
  return (
    <Dialog
      open={isReplyDialogOpen}
      onClose={handleCloseReplyDialog}
      fullWidth
      maxWidth={"sm"}
      fullscreenOnMobile={false}
    >
      {inboxItemDetail && (
        <InboxReplyContent
          inboxItemDetail={inboxItemDetail}
          handleSubmitReply={handleSubmitReply}
        />
      )}
    </Dialog>
  );
};

export default React.memo(InboxDetailDialog);
