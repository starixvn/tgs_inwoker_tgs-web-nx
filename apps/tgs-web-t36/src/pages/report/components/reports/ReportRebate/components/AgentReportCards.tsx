import moment from "moment";
import { AgentReportDetail } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import NoRecord from "@/pages/report/components/NoRecord";
import {
  ReportCard,
  ReportCardCol,
  ReportCardRow,
  ReportCardsContainer,
} from "@/components/styled-component/Report";

type Props = {
  agentReport: AgentReportDetail[];
};
const AgentReportCards = ({ agentReport }: Props) => {
  if (!agentReport?.length) {
    return <NoRecord />;
  }

  return (
    <ReportCardsContainer>
      {agentReport.map((agentReport, index) => {
        const { settleDateTime, maxActivePlayerNumber, validBet, rebate, sentOn } = agentReport;
        const settleDate = moment(settleDateTime).format("YYYY-MM-DD");
        const sentDate = moment(sentOn).format("YYYY-MM-DD");
        return (
          <ReportCard key={index}>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("結算日期")} : </ReportCardCol>
              <ReportCardCol>{settleDate}</ReportCardCol>
            </ReportCardRow>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("最大活躍人數")} :</ReportCardCol>
              <ReportCardCol>{maxActivePlayerNumber}</ReportCardCol>
            </ReportCardRow>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("團隊有效投注")} :</ReportCardCol>
              <ReportCardCol>{validBet}</ReportCardCol>
            </ReportCardRow>
            <ReportCardRow>
              <ReportCardCol>{i18n.t("返水金額")} :</ReportCardCol>
              <ReportCardCol>{rebate}</ReportCardCol>
            </ReportCardRow>
          </ReportCard>
        );
      })}
    </ReportCardsContainer>
  );
};

export default AgentReportCards;
