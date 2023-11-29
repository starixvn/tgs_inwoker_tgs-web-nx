import { INBOX_TABLE_ROW_COUNT } from "../constants";
import { usePagination } from "./tools/usePagination";
import { useGetInboxList } from "./tools/useGetInboxList";

export function useInboxList() {
  // fetch api with pagination
  const { page, handleChangePage } = usePagination();
  const { inboxList, isLoading, error, totalCount } = useGetInboxList({
    page,
    row: INBOX_TABLE_ROW_COUNT,
  });

  return {
    // inboxList
    inboxList,
    isLoading,
    error,
    // pagination
    page,
    totalCount,
    handleChangePage,
  };
}
