import React from "react";
import { Dialog } from "@mui/material";
import styled from "styled-components";
import { useSendDetailContext } from "@tgs-web-nx/core/features";
import LoadingBlock from "@/components/project/LoadingBlock";
import SendDialogContent from "@/pages/inbox/components/dialog/SendDialogContent";

const SendDialogContainer = styled.div`
  padding: 36px 24px;
`;

const SendItemDetailDialog = () => {
  const { isDetailDialogOpen, handleCloseDetailDialog, isLoading, sendItemDetail, error } =
    useSendDetailContext();

  return (
    <Dialog open={isDetailDialogOpen} onClose={handleCloseDetailDialog} fullWidth maxWidth={"md"}>
      <SendDialogContainer>
        {isLoading && <LoadingBlock size={30} />}

        {!isLoading && !!sendItemDetail && !error && (
          <SendDialogContent sendItemDetail={sendItemDetail} />
        )}
      </SendDialogContainer>
    </Dialog>
  );
};

export default React.memo(SendItemDetailDialog);
