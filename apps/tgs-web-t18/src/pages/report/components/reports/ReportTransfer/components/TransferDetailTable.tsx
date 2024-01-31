import React from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { GameBalanceInfosViewModel } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  transferDetails: GameBalanceInfosViewModel[];
  totalCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
};

const TransferDetailTable = ({
  transferDetails,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: Props) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  if (!transferDetails?.length) {
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
              <>{i18n.t("report.transfer.table.from")}</>
            </TableCell>
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.transfer.table.to")}</>
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
          {transferDetails.map((transferDetail, index) => {
            const { balancetime, amount, from, to } = transferDetail;

            const date = moment(balancetime).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={index}>
                <TableCell>{date}</TableCell>
                <TableCell>
                  {from ? (from === "BTI" && config.currency === "PHP" ? "PHSB" : from) : ""}
                </TableCell>
                <TableCell>
                  {to ? (to === "BTI" && config.currency === "PHP" ? "PHSB" : to) : ""}
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

export default TransferDetailTable;
