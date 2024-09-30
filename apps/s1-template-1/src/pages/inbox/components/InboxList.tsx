import LoadingBlock from "@/components/project/LoadingBlock";
import { CustomizeTablePagination } from "@/components/styled-component/Report";
import InboxItemDetailDialog from "@/pages/inbox/components/dialog/InboxItemDetailDialog";
import InboxReplyDialog from "@/pages/inbox/components/dialog/InboxReplyDialog";
import InboxListTable from "@/pages/inbox/components/table/InboxListTable";
import { theme } from "@/theme";
import {
  INBOX_TABLE_ROW_COUNT,
  useInboxDetailContext,
  useInboxList,
} from "@tgs-web-nx/core/features";
import React from "react";
import styled from "styled-components";

const InboxTableContainer = styled.div`
  min-height: 50vh;
`;

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
      <CustomizeTablePagination
        count={totalCount}
        rowsPerPage={INBOX_TABLE_ROW_COUNT}
        page={page > 0 ? page - 1 : 0}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        sx={{
          width: "100%",
          color: theme.text,
          "& button": {},
        }}
      />

      {isLoading ? (
        <LoadingBlock size={30} style={{ marginTop: "90px" }} />
      ) : (
        <InboxListTable inboxList={inboxList} handleItemClick={handleSelectInboxItem} />
      )}

      <InboxItemDetailDialog />
      <InboxReplyDialog />
    </InboxTableContainer>
  );
};

export default React.memo(InboxList);
