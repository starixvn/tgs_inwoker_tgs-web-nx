import { INBOX_TABLE_ROW_COUNT } from "../constants";
import { usePagination } from "./usePagination";
import { useGetSendList } from "./useGetSendList";

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
