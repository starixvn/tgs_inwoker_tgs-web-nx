import LoadingBlock from "@/components/project/LoadingBlock";
import { CustomizeTablePagination } from "@/components/styled-component/Report";
import SendItemDetailDialog from "@/pages/inbox/components/dialog/SendItemDetailDialog";
import SendListTable from "@/pages/inbox/components/table/SendListTable";
import { theme } from "@/theme";
import {
  INBOX_TABLE_ROW_COUNT,
  useSendDetailContext,
  useSendList,
} from "@tgs-web-nx/core/features";
import styled from "styled-components";

const SentTableContainer = styled.div`
  min-height: 50vh;
  padding-top: 1.6rem;
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

      {isLoading ? (
        <LoadingBlock size={30} style={{ marginTop: "90px" }} />
      ) : (
        <SendListTable sendList={sendList} handleItemClick={handleSelectInboxItem} />
      )}
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

      <SendItemDetailDialog />
    </SentTableContainer>
  );
};

export default SentList;
