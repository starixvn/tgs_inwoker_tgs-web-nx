import React, { useState } from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";
import { TransactionDetail, RoundTotalDto } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  agentReport: any[];
  totalCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
};
const AgentReportTable = ({ agentReport, totalCount, page, pageSize, onPageChange }: Props) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  if (!agentReport?.length) {
    return <NoRecord />;
  }
  return (
    <ReportCardsContainer>
      <ReportTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                width: "15%",
                border: "none",
              }}
            >
              <>{i18n.t("report.agentRebate.settlementDate")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.agentRebate.maxActivePlayer")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.totalValidBet")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.agentRebate.totalRebates")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {agentReport.map((agent, index) => {
            const { settleDateTime, maxActivePlayerNumber, validBet, rebate, sentOn } = agent;

            const settleDate = moment(settleDateTime).format("YYYY-MM-DD");
            const sentDate = moment(sentOn).format("YYYY-MM-DD");

            return (
              <TableRow key={index}>
                <TableCell>{settleDate}</TableCell>
                <TableCell align={"right"}>{maxActivePlayerNumber}</TableCell>
                <TableCell align={"right"}>{validBet}</TableCell>
                <TableCell align={"right"}>{rebate}</TableCell>
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
          color: theme.blue40,
          "& button": {},
        }}
      />
    </ReportCardsContainer>
  );
};

export default AgentReportTable;
