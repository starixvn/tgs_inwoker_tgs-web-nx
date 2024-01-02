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
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("report.betDateTime")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("report.betid")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("report.platformgamename")}</>
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
              <>{i18n.t("report.validBet")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
                color: `${theme.text} !important`,
              }}
            >
              <>{i18n.t("report.winloss")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TotalState roundTotal={roundTotal} />
        <TableBody>
          {transactionDetails
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transactionDetail) => {
              const {
                id,
                createdOn,
                betAmount,
                validBetAmount,
                winLoss,
                subGameProviderName,
                gameProviderName,
                gameName,
              } = transactionDetail;

              const date = moment(createdOn).format("YYYY-MM-DD hh:mm a");

              return (
                <TableRow key={id}>
                  <TableCell>{date}</TableCell>
                  <TableCell
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      maxWidth: "136px",
                      width: "10%",
                    }}
                  >
                    {id}
                  </TableCell>
                  <TableCell>
                    {gameProviderName
                      ? gameProviderName === "BTI" && config.currency === "PHP"
                        ? "PHSB"
                        : gameProviderName
                      : ""}
                    - {gameName}
                  </TableCell>
                  <TableCell align={"right"}>{betAmount}</TableCell>
                  <TableCell align={"right"}>{validBetAmount}</TableCell>
                  <TableCell align={"right"}>
                    <CustomWinLose $value={winLoss}>{winLoss}</CustomWinLose>
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
