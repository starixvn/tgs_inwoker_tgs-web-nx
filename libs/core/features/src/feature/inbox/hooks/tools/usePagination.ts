import { useCallback, useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((e: any, newPage: number) => {
    // page1 => page = 0 (like array index)
    setPage(newPage + 1);
  }, []);

  return {
    page,
    handleChangePage,
  };
}
