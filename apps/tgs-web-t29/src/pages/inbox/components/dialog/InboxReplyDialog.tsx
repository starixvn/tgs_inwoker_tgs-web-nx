import React from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import { useInboxReplyContext } from "@tgs-web-nx/core/features";
import InboxReplyContent from "@/pages/inbox/components/dialog/InboxReplyContent";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";

const InboxDialogContainer = styled.div`
  padding: 36px 24px;
`;

const InboxDetailDialog = () => {
  const { isReplyDialogOpen, handleCloseReplyDialog, inboxItemDetail, handleSubmitReply } =
    useInboxReplyContext();
  return (
    <Dialog open={isReplyDialogOpen} onClose={handleCloseReplyDialog} fullWidth maxWidth={"sm"}>
      <InboxDialogContainer>
        {inboxItemDetail && (
          <InboxReplyContent inboxItemDetail={inboxItemDetail} handleSubmit={handleSubmitReply} />
        )}
      </InboxDialogContainer>
    </Dialog>
  );
};

export default React.memo(InboxDetailDialog);
