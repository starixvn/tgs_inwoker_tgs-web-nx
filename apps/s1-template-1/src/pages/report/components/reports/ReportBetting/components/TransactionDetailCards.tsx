import React from "react";
import moment from "moment";
import { TransactionDetail } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import {
  CustomWinLose,
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/components/styled-component/Report";

type Props = {
  transactionDetails: TransactionDetail[];
};
const TransactionDetailCards = ({ transactionDetails }: Props) => {
  if (!transactionDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {transactionDetails.map((row, index) => {
        const date = moment(row.createdOn).format("YYYY-MM-DD hh:mm a");
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              {i18n.t("report.betid")}: <ReportCardCol>{row.id}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                {row.gameProviderName
                  ? row.gameProviderName === "BTI" &&  config.currency === "PHP"
                    ? "PHSB"
                    : row.gameProviderName
                  : ""}
                - {row.gameName}
              </ReportCardCol>
              <ReportCardCol> {date}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                {i18n.t("report.betAmount")} :{row.betAmount}
              </ReportCardCol>{" "}
              <ReportCardCol>
                {i18n.t("report.validBet")} :{row.validBetAmount}
              </ReportCardCol>{" "}
              <ReportCardCol>
                {i18n.t("report.winloss")} :
                <CustomWinLose $value={row.winLoss}>{row.winLoss}</CustomWinLose>
              </ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default TransactionDetailCards;
