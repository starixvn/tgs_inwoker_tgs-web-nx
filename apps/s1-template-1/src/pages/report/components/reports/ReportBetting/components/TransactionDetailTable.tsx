import {
  CustomizeTablePagination,
  CustomWinLose,
  ReportCardsContainer,
  ReportTable,
  TimeIDTableCell,
  WinLossZero
} from "@/components/styled-component/Report";
import CopyIconStyled from "@/pages/deposit/components/components/CopyIcon";
import NoRecord from "@/pages/report/components/NoRecord";
import TotalState from "@/pages/report/components/reports/ReportBetting/components/TotalState";
import { theme } from "@/theme";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RoundTotalDto, TransactionDetail } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import moment from "moment";
import React from "react";
import styled from "styled-components";

const IdWrapper = styled.div`
  position: relative;
  .icon-copy {
    position: absolute;
    top: -7px;
  }
`;

const TicketStatus = {
  Open: 1,
  Void: 2,
  Won: 3,
  Lost: 4,
  Draw: 5,
};

const BetHistoryStatus: { [key: number]: string } = {
  [TicketStatus.Open]: "Open",
  [TicketStatus.Void]: "Void",
  [TicketStatus.Won]: "Won",
  [TicketStatus.Lost]: "Lost",
  [TicketStatus.Draw]: "Draw",
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

  const { isDesktopSize } = useRwd();
  if (!transactionDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      <ReportTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TimeIDTableCell
              align={"center"}
              sx={{
                borderTopLeftRadius: `${theme.tableBorderRadius}`
              }}
            >
              <>
                {i18n.t("report.betid")} & {i18n.t("report.dateTime")}
              </>
            </TimeIDTableCell>
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
              const idShort = id.substring(0,7).concat("...");
              return (
                <TableRow key={id}>
                  <TableCell
                    sx={{
                      borderBottom: lastRow ? `none !important` : `inherit`,
                      borderBottomLeftRadius: lastRow ? `${theme.tableBorderRadius}` : "0",
                    }}
                  >
                    <IdWrapper>
                      <span>{idShort}</span>
                      <div>{date}</div>        
                      <CopyIconStyled copyContent={id} />              
                    </IdWrapper>                    
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
                    <div>
                      {status != null &&
                        i18n.t(`common.${BetHistoryStatus[status].toString().toLowerCase()}`)}
                    </div>
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
