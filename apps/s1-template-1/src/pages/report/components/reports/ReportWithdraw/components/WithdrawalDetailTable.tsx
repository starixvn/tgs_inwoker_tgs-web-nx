import { CustomizeTablePagination, ReportCardsContainer, ReportTable, TagStatusApproved, TagStatusPaid, TagStatusPaying, TagStatusPending, TagStatusProcessing, TagStatusRejected } from "@/components/styled-component/Report";
import NoRecord from "@/pages/report/components/NoRecord";
import { theme } from "@/theme";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { WithdrawFormViewModel } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import moment from "moment";
import React from "react";

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
                borderTopLeftRadius: `${theme.tableBorderRadius}`,
                width: "25rem"
              }}
              align={"center"}
            >
              <>{i18n.t("report.RequestDate")}</>
            </TableCell>
            <TableCell align={"center"}>
              <>{i18n.t("report.OrderNumber")}</>
            </TableCell>
            <TableCell align={"center"}>
              <>{i18n.t("remark")}</>
            </TableCell>
            <TableCell align={"center"}>
              <>{i18n.t("report.status")}</>
            </TableCell>
            <TableCell
              align={"right"}
              sx={{
                borderTopRightRadius: `${theme.tableBorderRadius}`
             }}
            >
              <>{i18n.t("report.amount")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {withdrawalDetails.map((balanceChange, index) => {
            const { id, createdon, orderno, amount, status, remark } = balanceChange;

            const date = moment(createdon).format("YYYY-MM-DD hh:mm a");
            const lastRow = index === withdrawalDetails.length - 1;

            return (
              <TableRow key={id}>
                <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomLeftRadius: lastRow ? `${theme.tableBorderRadius}` : "0" }} align={"center"}>{date}</TableCell>
                <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit` }} align={"center"}>{orderno}</TableCell>
                <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit` }} align={"center"}>{remark}</TableCell>
                <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit` }} align={"center"}>
                  {status === 1 && <TagStatusPending>{i18n.t(`report.deposit.status${status}`)}</TagStatusPending>}
                  {status === 2 && <TagStatusProcessing>{i18n.t(`report.deposit.status${status}`)}</TagStatusProcessing>}
                  {status === 3 && <TagStatusApproved>{i18n.t(`report.deposit.status${status}`)}</TagStatusApproved>}
                  {status === 4 && <TagStatusRejected>{i18n.t(`report.deposit.status${status}`)}</TagStatusRejected>} 
                  {status === 5 && <TagStatusPaying>{i18n.t(`report.deposit.status${status}`)}</TagStatusPaying>}  
                  {status === 6 && <TagStatusPaid>{i18n.t(`report.deposit.status${status}`)}</TagStatusPaid>}
                </TableCell>
                <TableCell sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomRightRadius: lastRow ? `${theme.tableBorderRadius}` : "0", color: `${theme.amountColor} !important`, fontWeight: "700 !important" }} align={"right"}>{amount}</TableCell>
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

export default WithdrawalDetailTable;
