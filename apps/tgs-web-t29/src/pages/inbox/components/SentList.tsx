import React from "react";
import styled from "styled-components";
import { useSendDetailContext, useSendList } from "@tgs-web-nx/core/features";
import LoadingBlock from "@/components/project/LoadingBlock";
import SendListTable from "@/pages/inbox/components/table/SendListTable";
import SendItemDetailDialog from "@/pages/inbox/components/dialog/SendItemDetailDialog";

const SentTableContainer = styled.div``;

const SentList = () => {
  const {
    // inboxList
    sendList,
    isLoading,
    // pagination
    page,
    totalCount,
    handleChangePage,
  } = useSendList();

  // handle select inboxItem
  const { selectSendItemDetail } = useSendDetailContext();
  const handleSelectInboxItem = async (id: string) => {
    await selectSendItemDetail(id);
  };

  return (
    <SentTableContainer>
      {isLoading ? (
        <LoadingBlock size={30} style={{ marginTop: "90px" }} />
      ) : (
        <SendListTable
          sendList={sendList}
          handleItemClick={handleSelectInboxItem}
          page={page}
          handleChangePage={handleChangePage}
          totalCount={totalCount}
        />
      )}

      <SendItemDetailDialog />
    </SentTableContainer>
  );
};

export default SentList;
