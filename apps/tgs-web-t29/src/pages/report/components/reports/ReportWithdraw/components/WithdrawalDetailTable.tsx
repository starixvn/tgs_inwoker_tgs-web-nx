import React, { useState } from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";
import { WithdrawFormViewModel } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  withdrawalDetails: WithdrawFormViewModel[];
};
const WithdrawalDetailTable = ({ withdrawalDetails }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (withdrawalDetails.length <= 0) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      <ReportTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.RequestDate")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.NewOrderNumber")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.status")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.amount")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {withdrawalDetails.map((balanceChange) => {
            const { id, createdon, orderno, amount, status } = balanceChange;

            const date = moment(createdon).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell>{orderno}</TableCell>
                <TableCell>
                  <>{i18n.t(`report.withdrawal.status${status}`)}</>
                </TableCell>
                <TableCell align={"right"}>{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </ReportTable>

      <TablePagination
        component="div"
        rowsPerPageOptions={[]}
        count={withdrawalDetails.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          width: "100%",
          color: theme.blue40,
          "& button": {},
        }}
      />
    </ReportCardsContainer>
  );
};

export default WithdrawalDetailTable;
