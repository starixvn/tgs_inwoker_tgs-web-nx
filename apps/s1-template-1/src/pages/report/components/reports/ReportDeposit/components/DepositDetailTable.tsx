import { CustomizeTablePagination, DateTimeTableCell, ReportCardsContainer, ReportTable, TagStatusApproved, TagStatusPending, TagStatusProcessing, TagStatusRejected } from "@/components/styled-component/Report";
import NoRecord from "@/pages/report/components/NoRecord";
import { theme } from "@/theme";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DepositFormViewModel } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import moment from "moment";

type Props = {
  transferDetails: DepositFormViewModel[];
  totalCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
};

const DepositDetailTable = ({
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
            <DateTimeTableCell
              sx={{
                borderTopLeftRadius: `${theme.tableBorderRadius}`
              }}
              align={"center"}
            >
              <>{i18n.t("report.submitDate")}</>
            </DateTimeTableCell>
            <TableCell align={"center"} sx={{
                width: "28rem"
              }}>
              <>{i18n.t("report.OrderNumber")}</>
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
          {transferDetails
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((depositDetail, index) => {
              const { id, createdon, amount, orderno, status } = depositDetail;

              const date = moment(createdon).format("YYYY-MM-DD hh:mm a");
              const lastRow = index === transferDetails.length - 1;

              return (
                <TableRow key={id}>
                  <TableCell align={"center"} sx={{ borderBottom: lastRow ?  `none !important` : `inherit`, borderBottomLeftRadius: lastRow ? `${theme.tableBorderRadius}` : "0" }}>{date}</TableCell>
                  <TableCell align={"center"} sx={{ borderBottom: lastRow ?  `none !important` : `inherit` }}>{orderno}</TableCell>
                  <TableCell align={"center"} sx={{ borderBottom: lastRow ?  `none !important` : `inherit` }}>
                    {status === 1 && <TagStatusPending>{i18n.t(`report.deposit.status${status}`)}</TagStatusPending>}
                    {status === 2 && <TagStatusProcessing>{i18n.t(`report.deposit.status${status}`)}</TagStatusProcessing>}
                    {status === 3 && <TagStatusApproved>{i18n.t(`report.deposit.status${status}`)}</TagStatusApproved>}
                    {status === 4 && <TagStatusRejected>{i18n.t(`report.deposit.status${status}`)}</TagStatusRejected>}                   
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

export default DepositDetailTable;
