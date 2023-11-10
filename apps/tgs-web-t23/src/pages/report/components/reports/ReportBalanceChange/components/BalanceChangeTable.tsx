import React from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { TransactionLogViewModel } from "@tgs-web-nx/types";
import NoRecord from "@/pages/report/components/NoRecord";
import i18n from "@/utils/i18n";
import ErrorSwitcher from "@/utils/ErrorSwitcher";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";

type Props = {
  balanceChangeDetails: TransactionLogViewModel[];
  totalCount: number;
};
const TransactionDetailTable = ({ balanceChangeDetails, totalCount }: Props) => {
  if (!balanceChangeDetails?.length) {
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
              <>{i18n.t("report.dateTime")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.balanceChanges.type")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.balanceChanges.amount")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceChangeDetails.map((balanceChange) => {
            const { id, recordedon, type, amount } = balanceChange;

            const date = moment(recordedon).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={id}>
                <TableCell>{date}</TableCell>
                <TableCell>{ErrorSwitcher.getTranslation(type)}</TableCell>
                <TableCell align={"right"}>{amount}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </ReportTable>

      {/*<TablePagination*/}
      {/*  rowsPerPageOptions={[25]}*/}
      {/*  component="div"*/}
      {/*  count={totalCount}*/}
      {/*  rowsPerPage={25}*/}
      {/*  page={0}*/}
      {/*  onPageChange={() => {}}*/}
      {/*  onRowsPerPageChange={() => {}}*/}
      {/*/>*/}
    </ReportCardsContainer>
  );
};

export default TransactionDetailTable;
