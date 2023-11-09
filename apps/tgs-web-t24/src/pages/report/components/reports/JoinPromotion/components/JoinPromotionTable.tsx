import React from "react";
import moment from "moment";
import { TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import NoRecord from "@/pages/report/components/NoRecord";
import { ReportCardsContainer, ReportTable } from "@/components/styled-component/Report";
import i18n from "@/utils/i18n";
import { JoinedPromotionsResponse } from "@/core/models/dto/general/GetJoinedPromoReportResDto";

type Props = {
  promotionDetails: JoinedPromotionsResponse[];
  totalCount: number;
};
const JoinPromotionTable = ({ promotionDetails, totalCount }: Props) => {
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

      {/*<TablePagination*/}
      {/*  rowsPerPageOptions={[25]}*/}
      {/*  component="div"*/}
      {/*  count={totalCount}*/}
      {/*  rowsPerPage={25}*/}
      {/*  page={0}*/}
      {/*  onPageChange={() => {}}*/}
      {/*  onRowsPerPageChange={() => {}}*/}
      {/*/>*/}
    </ReportCardsContainer>
  );
};

export default JoinPromotionTable;
