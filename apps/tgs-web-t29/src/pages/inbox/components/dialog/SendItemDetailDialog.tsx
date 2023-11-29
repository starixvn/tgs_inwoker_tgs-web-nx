import React from "react";
import { useSendDetailContext } from "@tgs-web-nx/core/features";
import Dialog from "@/components/UI/Dialog/Dialog";
import LoadingBlock from "@/components/project/LoadingBlock";
import SendDialogContent from "@/pages/inbox/components/dialog/SendDialogContent";

const SendItemDetailDialog = () => {
  const { isDetailDialogOpen, handleCloseDetailDialog, isLoading, sendItemDetail, error } =
    useSendDetailContext();

  return (
    <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog} fullWidth maxWidth={"md"}>
      {isLoading && <LoadingBlock size={30} />}

      {!isLoading && !!sendItemDetail && !error && (
        <SendDialogContent sendItemDetail={sendItemDetail} />
      )}
    </Dialog>
  );
};

export default React.memo(SendItemDetailDialog);
