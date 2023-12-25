import moment from "moment";
import { TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { DepositFormViewModel } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";

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
            <TableCell
              sx={{
                border: "none",
              }}
            >
              <>{i18n.t("report.submitDate")}</>
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
          {transferDetails
            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((depositDetail) => {
              const { id, createdon, amount, orderno, status } = depositDetail;

              const date = moment(createdon).format("YYYY-MM-DD hh:mm a");

              return (
                <TableRow key={id}>
                  <TableCell>{date}</TableCell>
                  <TableCell>{orderno}</TableCell>
                  <TableCell>
                    <>{i18n.t(`report.deposit.status${status}`)}</>
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

export default DepositDetailTable;
