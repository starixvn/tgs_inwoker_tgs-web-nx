import React from "react";
import styled from "styled-components";
import { useInboxDetailContext, useInboxList } from "@tgs-web-nx/core/features";
import InboxItemDetailDialog from "@/pages/inbox/components/dialog/InboxItemDetailDialog";
import LoadingBlock from "@/components/project/LoadingBlock";
import InboxListTable from "@/pages/inbox/components/table/InboxListTable";
import InboxReplyDialog from "@/pages/inbox/components/dialog/InboxReplyDialog";

const InboxTableContainer = styled.div``;

const InboxList = () => {
  const {
    // inboxList
    inboxList,
    isLoading,
    // pagination
    page,
    totalCount,
    handleChangePage,
  } = useInboxList();

  // handle select inboxItem
  const { selectInboxItemDetail } = useInboxDetailContext();
  const handleSelectInboxItem = async (id: string) => {
    await selectInboxItemDetail(id);
  };

  return (
    <InboxTableContainer>
      {isLoading ? (
        <LoadingBlock size={30} style={{ marginTop: "90px" }} />
      ) : (
        <InboxListTable
          inboxList={inboxList}
          handleItemClick={handleSelectInboxItem}
          page={page}
          handleChangePage={handleChangePage}
          totalCount={totalCount}
        />
      )}

      <InboxItemDetailDialog />
      <InboxReplyDialog />
    </InboxTableContainer>
  );
};

export default React.memo(InboxList);
