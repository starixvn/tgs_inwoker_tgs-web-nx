import React from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow, TablePagination } from "@mui/material";
import { TransactionDetail } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import {
  CustomWinLose,
  ReportCardsContainer,
  ReportTable,
} from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  transactionDetails: TransactionDetail[];
};
const TransactionDetailTable = ({ transactionDetails }: Props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
              }}
            >
              <>{i18n.t("report.betDateTime")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.betid")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.platformgamename")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.totalBet")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.validBet")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.winloss")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactionDetails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transactionDetail) => {
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
                <TableCell>{id}</TableCell>
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
        count={transactionDetails.length}
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

export default TransactionDetailTable;
