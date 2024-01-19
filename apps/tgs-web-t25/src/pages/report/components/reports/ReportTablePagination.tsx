import React, { useState } from "react";
import TablePagination from "@mui/material/TablePagination";
import { theme } from "@/theme";

type Props = {
  totalCount: number;
};

const ReportTablePagination = ({ totalCount }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={[]}
      count={totalCount}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      sx={{
        width: "100%",
        color: theme.white,
        "& button": {},
      }}
    />
  );
};

export default ReportTablePagination;
