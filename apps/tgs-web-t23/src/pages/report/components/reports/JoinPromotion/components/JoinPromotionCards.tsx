import React from "react";
import moment from "moment";
import { JoinedPromotionsResponse } from "@tgs-web-nx/types";
import NoRecord from "@/pages/report/components/NoRecord";
import i18n from "@/core/utils/i18n";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/components/styled-component/Report";

type Props = {
  promotionDetails: JoinedPromotionsResponse[];
};
const JoinPromotionCards = ({ promotionDetails }: Props) => {
  if (!promotionDetails?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {promotionDetails.map((promotionDetails, index) => {
        const date = moment(promotionDetails.joinedOn).format("YYYY-MM-DD hh:mm a");
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("report.dateTime")} : </ReportCardCol>
              <ReportCardCol>{date}</ReportCardCol>
            </ReportCardRow>

            <ReportCardRow>
              <ReportCardCol>
                <>{i18n.t("report.joinedPromo.promoName")}</>:{" "}
              </ReportCardCol>
              <ReportCardCol>{promotionDetails.promotionName}</ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default JoinPromotionCards;
