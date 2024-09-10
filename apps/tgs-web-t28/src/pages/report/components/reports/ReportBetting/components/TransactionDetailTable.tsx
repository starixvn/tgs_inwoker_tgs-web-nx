import React, { useState } from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";
import { TransactionDetail, RoundTotalDto } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import {
  CustomWinLose,
  ReportCardsContainer,
  ReportTable,
} from "@/components/styled-component/Report";
import { theme } from "@/theme";
import TotalState from "@/pages/report/components/reports/ReportBetting/components/TotalState";

const TicketStatus = {
  Waiting: 0,
  Running: 1,
  Void: 2,
  Refund: 3,
  Cancel: 4,
  Loss: 5,
  Win: 6,
  Draw: 7,
  HaftWin: 8,
  HaftLoss: 9,
};

const BetHistoryStatus: { [key: number]: string } = {
  [TicketStatus.Waiting]: "Open",
  [TicketStatus.Running]: "Open",
  [TicketStatus.Void]: "Void",
  [TicketStatus.Refund]: "Void",
  [TicketStatus.Cancel]: "Void",
  [TicketStatus.Loss]: "Lost",
  [TicketStatus.Win]: "Won",
  [TicketStatus.Draw]: "Draw",
  [TicketStatus.HaftWin]: "Won",
  [TicketStatus.HaftLoss]: "Lost",
};

type Props = {
  transactionDetails: TransactionDetail[];
  roundTotal: RoundTotalDto;
  totalCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
};
const TransactionDetailTable = ({
  transactionDetails,
  roundTotal,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: Props) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  if (!transactionDetails?.length) {
    return <NoRecord />;
  }

  const getStatusColor = (status: number | null) => {
    if (status === null) return "";
    if (status === TicketStatus.Win || status === TicketStatus.HaftWin) return theme.green;
    if (status === TicketStatus.Loss || status === TicketStatus.HaftLoss) return theme.red;

    return theme.text;
  };

  return (
    <ReportCardsContainer>
      <ReportTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>
                {i18n.t("report.betDateTime")}/{i18n.t("report.betid")}
              </>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("Game Provider Name")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("report.totalBet")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>
                {i18n.t("report.winloss")}/{i18n.t("Comm")}
              </>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("report.status")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TotalState roundTotal={roundTotal} />
        <TableBody>
          {transactionDetails
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transactionDetail) => {
              const { id, createdOn, betAmount, winLoss, gameProviderName, commission, status } =
                transactionDetail;

              const date = moment(createdOn).format("YYYY-MM-DD hh:mm a");

              return (
                <TableRow key={id}>
                  <TableCell>
                    <div>{date}</div>
                    <div>{id}</div>
                  </TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "136px",
                      width: "10%",
                    }}
                  >
                    {gameProviderName}
                  </TableCell>
                  <TableCell align={"right"}>{betAmount}</TableCell>
                  <TableCell align={"right"}>
                    <CustomWinLose $value={winLoss}>{winLoss}</CustomWinLose>
                    <div>{commission}</div>
                  </TableCell>
                  <TableCell
                    align={"right"}
                    sx={{
                      border: "none",
                      color: `${getStatusColor(status)} !important`,
                    }}
                  >
                    <div>{status != null && BetHistoryStatus[status]}</div>
                  </TableCell>
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

export default TransactionDetailTable;
