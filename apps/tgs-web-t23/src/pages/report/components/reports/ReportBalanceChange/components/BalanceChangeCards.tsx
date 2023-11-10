import React from "react";
import moment from "moment";
import { TransactionLogViewModel } from "@tgs-web-nx/types";
import NoRecord from "@/pages/report/components/NoRecord";
import i18n from "@/utils/i18n";
import ErrorSwitcher from "@/utils/ErrorSwitcher";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/components/styled-component/Report";

type Props = {
  balanceChangeDetails: TransactionLogViewModel[];
};
const BalanceChangeCards = ({ balanceChangeDetails }: Props) => {
  if (!balanceChangeDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {balanceChangeDetails.map((balanceChangeDetail, index) => {
        const { recordedon, amount, type } = balanceChangeDetail;
        const date = moment(recordedon).format("YYYY/MM/DD hh:mm:ss");
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("report.dateTime")} : </ReportCardCol>
              <ReportCardCol>{date}</ReportCardCol>
            </ReportCardRow>
            <ReportCardRow>
              <ReportCardCol>
                <>{i18n.t("report.balanceChanges.type")}</>
              </ReportCardCol>
              <ReportCardCol>{ErrorSwitcher.getTranslation(type)}</ReportCardCol>
            </ReportCardRow>
            <ReportCardRow>
              <ReportCardCol>
                <>{i18n.t("report.balanceChanges.amount")}:</>
              </ReportCardCol>
              <ReportCardCol>{amount}</ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default BalanceChangeCards;
