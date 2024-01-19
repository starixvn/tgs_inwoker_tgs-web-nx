import React from "react";
import styled from "styled-components";
import {
  INBOX_TABLE_ROW_COUNT,
  useInboxDetailContext,
  useInboxList,
} from "@tgs-web-nx/core/features";
import { TablePagination } from "@mui/material";
import InboxItemDetailDialog from "@/pages/inbox/components/dialog/InboxItemDetailDialog";
import LoadingBlock from "@/components/project/LoadingBlock";
import InboxListTable from "@/pages/inbox/components/table/InboxListTable";
import InboxReplyDialog from "@/pages/inbox/components/dialog/InboxReplyDialog";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const InboxTableContainer = styled.div`
  min-height: 50vh;

  ${media.sm} {
    background: ${({ theme }) => theme.black03};
    border-radius: 10px;
    padding: 24px 40px;
  }
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
      <TablePagination
        component={"div"}
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
