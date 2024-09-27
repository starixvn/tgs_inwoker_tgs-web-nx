import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { RoundTotalDto, TransactionDetail } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { theme } from "@/theme";
import TotalState from "@/pages/report/components/reports/ReportBetting/components/TotalState";
import NoRecord from "@/pages/report/components/NoRecord";
import CopyIconStyled from "@/pages/deposit/components/components/CopyIcon";
import {
  CustomizeTablePagination,
  CustomWinLose,
  ReportCardsContainer,
  ReportTable,
  WinLossZero,
} from "@/components/styled-component/Report";

const IdWrapper = styled.div`
  position: relative;
`;

const TicketStatus = {
  Open: 1,
  Void: 2,
  Won: 3,
  Lost: 4,
  Draw: 5,
};

const BetHistoryStatus: { [key: number]: string } = {
  [TicketStatus.Open]: i18n.t("common.open"),
  [TicketStatus.Void]: i18n.t("common.void"),
  [TicketStatus.Won]: i18n.t("common.won"),
  [TicketStatus.Lost]: i18n.t("common.lost"),
  [TicketStatus.Draw]: i18n.t("common.draw"),
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

  return (
    <ReportCardsContainer>
      <ReportTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align={"center"}
              sx={{
                borderTopLeftRadius: `${theme.tableBorderRadius}`,
                width: "36rem",
              }}
            >
              <>
                {i18n.t("report.betid")} & {i18n.t("report.dateTime")}
              </>
            </TableCell>
            <TableCell align={"center"}>Provider</TableCell>
            <TableCell align={"right"}>
              <>{i18n.t("report.totalBet")}</>
            </TableCell>
            <TableCell align={"right"}>
              <>{i18n.t("report.winloss")}</>
            </TableCell>
            <TableCell
              align={"center"}
              sx={{
                borderTopRightRadius: `${theme.tableBorderRadius}`,
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
            .map((transactionDetail, index) => {
              const { id, createdOn, betAmount, winLoss, gameProviderName, status } =
                transactionDetail;

              const date = moment(createdOn).format("YYYY-MM-DD hh:mm a");
              const lastRow = index === transactionDetails.length - 1;
              return (
                <TableRow key={id}>
                  <TableCell
                    sx={{
                      borderBottom: lastRow ? `none !important` : `inherit`,
                      borderBottomLeftRadius: lastRow ? `${theme.tableBorderRadius}` : "0",
                    }}
                  >
                    <IdWrapper>
                      <span>{id}</span>
                      <CopyIconStyled copyContent={id} />
                    </IdWrapper>
                    <div>{date}</div>
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: lastRow ? `none !important` : `inherit` }}
                    align={"center"}
                  >
                    {gameProviderName}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: lastRow ? `none !important` : `inherit` }}
                    align={"right"}
                  >
                    {betAmount}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: lastRow ? `none !important` : `inherit` }}
                    align={"right"}
                  >
                    {winLoss === 0 ? (
                      <WinLossZero>{winLoss}</WinLossZero>
                    ) : (
                      <CustomWinLose $value={winLoss}>{winLoss}</CustomWinLose>
                    )}
                  </TableCell>
                  <TableCell
                    align={"center"}
                    sx={{
                      borderBottom: lastRow ? `none !important` : `inherit`,
                      borderBottomRightRadius: lastRow ? `${theme.tableBorderRadius}` : "0",
                    }}
                  >
                    <div>{status != null && BetHistoryStatus[status]}</div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </ReportTable>
      <CustomizeTablePagination
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
