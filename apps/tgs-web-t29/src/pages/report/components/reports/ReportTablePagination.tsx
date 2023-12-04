import { useCallback, useState } from "react";
import TablePagination from '@mui/material/TablePagination';
import { theme } from '@/theme';

type Props = {
  totalCount: number;
};

const ReportTablePagination = ({ totalCount }: Props) => {
  const [page, setPage] = useState(1);
  const handleChangePage = useCallback((e: any, newPage: number) => {
    // page1 => page = 0 (like array index)
    setPage(newPage + 1);
  }, []);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalCount}
      page={page > 0 ? page - 1 : 0}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[]}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        width: "100%",
        color: theme.blue40,
        "& button": {},
      }}
    />
  );
}

export default ReportTablePagination;