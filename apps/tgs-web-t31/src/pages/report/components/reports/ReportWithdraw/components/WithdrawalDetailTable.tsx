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
  totalCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
};
const WithdrawalDetailTable = ({
  withdrawalDetails,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: Props) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
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
        count={totalCount}
        rowsPerPage={pageSize}
        page={page - 1}
        onPageChange={handleChangePage}
        sx={{
          width: "100%",
          color: theme.text,
          "& button": {},
        }}
      />
    </ReportCardsContainer>
  );
};

export default WithdrawalDetailTable;
