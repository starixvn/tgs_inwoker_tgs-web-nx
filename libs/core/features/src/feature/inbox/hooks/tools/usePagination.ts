import { useCallback, useState } from "react";

export function usePagination() {
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return {
    page,
    handleChangePage,
  };
}
