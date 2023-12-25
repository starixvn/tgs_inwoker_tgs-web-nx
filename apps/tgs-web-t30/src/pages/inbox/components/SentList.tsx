import React from "react";
import styled from "styled-components";
import {
  INBOX_TABLE_ROW_COUNT,
  useSendDetailContext,
  useSendList,
} from "@tgs-web-nx/core/features";
import { TablePagination } from "@mui/material";
import LoadingBlock from "@/components/project/LoadingBlock";
import SendListTable from "@/pages/inbox/components/table/SendListTable";
import SendItemDetailDialog from "@/pages/inbox/components/dialog/SendItemDetailDialog";
import { theme } from "@/theme";

const SentTableContainer = styled.div`
  min-height: 50vh;
`;

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
      <TablePagination
        component={"div"}
        count={totalCount}
        rowsPerPage={INBOX_TABLE_ROW_COUNT}
        page={page > 0 ? page - 1 : 0}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[]}
        sx={{
          width: "100%",
          color: {
            xs: theme.white,
            sm: theme.text,
          },
          "& button": {},
        }}
      />

      {isLoading ? (
        <LoadingBlock size={30} style={{ marginTop: "90px" }} />
      ) : (
        <SendListTable sendList={sendList} handleItemClick={handleSelectInboxItem} />
      )}

      <SendItemDetailDialog />
    </SentTableContainer>
  );
};

export default SentList;
