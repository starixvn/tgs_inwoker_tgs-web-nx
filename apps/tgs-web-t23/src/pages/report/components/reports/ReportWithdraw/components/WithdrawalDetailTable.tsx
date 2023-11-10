import React from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { WithdrawFormViewModel } from "@tgs-web-nx/types";
import NoRecord from "@/pages/report/components/NoRecord";
import i18n from "@/core/utils/i18n";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";

type Props = {
  withdrawalDetails: WithdrawFormViewModel[];
  totalCount: number;
};
const WithdrawalDetailTable = ({ withdrawalDetails, totalCount }: Props) => {
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
                  <>{i18n.t(`report.deposit.status${status}`)}</>
                </TableCell>
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

export default WithdrawalDetailTable;
