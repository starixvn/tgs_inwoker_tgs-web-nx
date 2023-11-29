import { INBOX_TABLE_ROW_COUNT } from "../constants";
import { usePagination } from "./tools/usePagination";
import { useGetSendList } from "./tools/useGetSendList";

export function useSendList() {
  // fetch api with pagination
  const { page, handleChangePage } = usePagination();
  const { sendList, isLoading, error, totalCount } = useGetSendList({
    page,
    row: INBOX_TABLE_ROW_COUNT,
  });

  return {
    // sendList
    sendList,
    isLoading,
    error,
    // pagination
    page,
    totalCount,
    handleChangePage,
  };
}
