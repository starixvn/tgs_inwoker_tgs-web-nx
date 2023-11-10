import React from "react";
import moment from "moment";
import { GameBalanceInfosViewModel } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import NoRecord from "@/pages/report/components/NoRecord";
import i18n from "@/core/utils/i18n";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/components/styled-component/Report";

type Props = {
  transferDetails: GameBalanceInfosViewModel[];
};
const TransferDetailCard = ({ transferDetails }: Props) => {
  if (!transferDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {transferDetails.map((transferDetail, index) => {
        const { balancetime, amount, from, to } = transferDetail;

        return (
          <ReportCard key={index}>
            <ReportCardRow>
              {i18n.t("report.transfer.table.from")} :{" "}
              <ReportCardCol>
                {from ? (from === "BTI" && config.currency === "PHP" ? "PHSB" : from) : ""}
              </ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              {i18n.t("report.transfer.table.to")} :{" "}
              <ReportCardCol>
                {to ? (to === "BTI" && config.currency === "PHP" ? "PHSB" : to) : ""}
              </ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              {i18n.t("report.amount")} : <ReportCardCol>{amount}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>{moment(balancetime).format("YYYY-MM-DD hh:mm a")}</ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default TransferDetailCard;
