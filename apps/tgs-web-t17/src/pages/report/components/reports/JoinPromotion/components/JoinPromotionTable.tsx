import React from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import { JoinedPromotionsResponse } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";
import { theme } from "@/theme";

type Props = {
  promotionDetails: JoinedPromotionsResponse[];
  totalCount: number;
  page: number;
  onPageChange: (newPage: number) => void;
  pageSize: number;
};
const JoinPromotionTable = ({
  promotionDetails,
  totalCount,
  page,
  pageSize,
  onPageChange,
}: Props) => {
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    onPageChange(newPage);
  };

  if (!promotionDetails?.length) {
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
              <>{i18n.t("report.joinedPromo.promoName")}</>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promotionDetails.map((promotionDetail, index) => {
            const { joinedOn, promotionName } = promotionDetail;
            const date = moment(joinedOn).format("YYYY-MM-DD hh:mm a");

            return (
              <TableRow key={index}>
                <TableCell>{date}</TableCell>
                <TableCell>{promotionName}</TableCell>
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
          color: theme.white,
          "& button": {},
        }}
      />
    </ReportCardsContainer>
  );
};

export default JoinPromotionTable;
