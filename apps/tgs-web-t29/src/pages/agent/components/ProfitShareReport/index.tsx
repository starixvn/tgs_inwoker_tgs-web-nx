import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled as muiStyled,
} from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import { NoData } from "../NoData";
import { useProfitShareReport, formatNaN, formatSentOn, getDateRange } from "./hooks";
import { AgentSelect } from "./components";
import Loading from "@/components/UI/Loading";
import { media } from "@/theme/breakpoints";


const ProfitShareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfitShareTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
  color: #23507d;
`;

const NonBorderTableCell = muiStyled(TableCell)(({ theme }) => ({
  padding: '8px',
  border: "none",
  fontSize: "14px",
  [media.sm]: {
    fontSize: "16px"
  },
  textAlign: 'end',
}));

const FillTableCell = muiStyled(NonBorderTableCell)(({ theme }) => ({
  border: "none",
  background: theme.palette.blue20,
  textAlign: 'end',
}));

const TitleTableCell = muiStyled(NonBorderTableCell)(({ theme }) => ({
  color: "#23507D",
  fontWeight: 700,
  textAlign: 'left',
}));

const ListTableCell = muiStyled(TitleTableCell)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
}));


const Dot = styled.span`
  display: block;
  flex-shrink: 0;
  width: 8px;
  aspect-ratio: 1;
  background: #3281D0;
  border-radius: 100%;
  transform: translateY(-1px);
`;


const ProfitShareReport = () => {
  const {lists: {current, previous}, isFetching, period} = useProfitShareReport();
  const currentData = current.data[current.currentKey] && current.data[current.currentKey][0];
  const previousData = previous.data[previous.currentKey] && previous.data[previous.currentKey][0];

  if(isFetching) {
    return <Loading show /> 
  }
  
  if(!currentData && !previousData) {
    return <NoData />
  }

  // 週期盈虧
  const previousPeriodPL = previousData?.companyWinLossAmount - previousData?.bonus;
  const currentPeriodPL = currentData?.companyWinLossAmount - currentData?.bonus;
  
  // 淨營利
  const previousNetProfit = previousPeriodPL - previousData?.bonusAdjustAmount;
  const currentNetProfit = currentPeriodPL - currentData?.bonusAdjustAmount;
  
  // 直屬玩家貢獻
  const previousPlayerContribution = previousData?.directDividendAmount;
  const currentPlayerContribution = currentData?.directDividendAmount;

  return (
    <ProfitShareContainer>
      {/* 結算週期: 顯示"目前"該平台設定的結算週期, 有每日/每週/雙週/每月四種 */}
      <ProfitShareTitle>
        {i18n.t("agent.settlementPeriod")}: {i18n.t(`agent.${period}`)}
      </ProfitShareTitle>
      <Table sx={{ fontSize: "18px" }}>
        {/* 上期 本期 */}
        <TableHead>
          <TableRow>
            <NonBorderTableCell></NonBorderTableCell>
            <TitleTableCell>
              {/* 上期 */}
              <AgentSelect options={previous.keys} onChange={previous.onChange} value={previous.currentKey}>
                {i18n.t("agent.previousPeriod")}
              </AgentSelect>
            </TitleTableCell>
            <TitleTableCell>
              {/* 本期 */}
              <AgentSelect options={current.keys} onChange={current.onChange} value={current.currentKey}>
                {i18n.t("agent.currentPeriod")}
              </AgentSelect>
            </TitleTableCell>
          </TableRow>
        </TableHead>
        
        <TableBody>
          <TableRow>
            {/* 週期日期: 顯示日期:YYYY/MM/DD */}
            <TitleTableCell>{i18n.t("agent.startEndDate")}</TitleTableCell>
            <NonBorderTableCell>
              {getDateRange((previousData?.from), (previousData?.to))}
            </NonBorderTableCell>
            <NonBorderTableCell>
              {getDateRange((currentData?.from), (currentData?.to))}
            </NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 派發狀態: 審核中 已派發 已拒絕三種 */}
            <TitleTableCell>{i18n.t("agent.status")}</TitleTableCell>
            <NonBorderTableCell>
              {previousData ? i18n.t(`agent.${formatSentOn(previousData?.sentOn)}`) : '-'}
            </NonBorderTableCell>
            <NonBorderTableCell>
            {currentData ? i18n.t(`agent.${formatSentOn(currentData?.sentOn)}`) : '-'}
            </NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 代理承擔紅利: 紅利金額 * 分紅比例 */}
            <TitleTableCell>{i18n.t("agent.agentCoveredBonus")}</TitleTableCell>
            <NonBorderTableCell>
              {formatNaN(previousData?.bonus * previousData?.dividendPercentage)}
            </NonBorderTableCell>
            <NonBorderTableCell>
              {formatNaN(currentData?.bonus * currentData?.dividendPercentage)}
            </NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 代理承擔優惠調帳: 優惠調帳 * 分紅比例 */}
            <TitleTableCell>{i18n.t("agent.agentCoveredBonusAdjust")}</TitleTableCell>
            <NonBorderTableCell>
              {formatNaN(previousData?.bonusAdjustAmount * previousData?.dividendPercentage)}
            </NonBorderTableCell>
            <NonBorderTableCell>
              {formatNaN(currentData?.bonusAdjustAmount * currentData?.dividendPercentage)}
            </NonBorderTableCell>
          </TableRow>

          {/* 計算區塊 */}

          {/* 週期盈虧: 公司輸贏 - 紅利金額 */}
          <TableRow>
            <ListTableCell>
              <Dot />
              {i18n.t("agent.periodPL")}
            </ListTableCell>
            <NonBorderTableCell>{formatNaN(previousPeriodPL)}</NonBorderTableCell>
            <NonBorderTableCell>{formatNaN(currentPeriodPL)}</NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 公司輸贏: 公司贏玩家輸的加總(正數時) */}
            <FillTableCell sx={{ textAlign: "right" }}>+ {i18n.t("agent.companyWinLoss")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.companyWinLossAmount)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.companyWinLossAmount)}</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 紅利金額: VIP福利+VIP返水+活動優惠金額的加總 */}
            <FillTableCell sx={{ textAlign: "right" }}>- {i18n.t("agent.bonus")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.bonus)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.bonus)}</FillTableCell>
          </TableRow>

          {/* 淨盈利: 週期盈虧 - 優惠調帳(bonusAdjustAmount)*/}
          <TableRow>
            <ListTableCell>
              <Dot />
              {i18n.t("agent.netProfit")}
            </ListTableCell>
            <NonBorderTableCell>{formatNaN(previousNetProfit)}</NonBorderTableCell>
            <NonBorderTableCell>{formatNaN(currentNetProfit)}</NonBorderTableCell>
          </TableRow>
          {/* 週期盈虧 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+ {i18n.t("agent.periodPL")}</FillTableCell>
            <FillTableCell>{formatNaN(previousPeriodPL)}</FillTableCell>
            <FillTableCell>{formatNaN(currentPeriodPL)}</FillTableCell>
          </TableRow>
          {/* 優惠調帳 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>- {i18n.t("agent.bonusAdjust")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.bonusAdjustAmount)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.bonusAdjustAmount)}</FillTableCell>
          </TableRow>

          {/* 直屬玩家貢獻*/}
          <TableRow>
            <ListTableCell>
              <Dot />
              {i18n.t("agent.playerContribution")}
            </ListTableCell>
            <NonBorderTableCell>{formatNaN(previousPlayerContribution)}</NonBorderTableCell>
            <NonBorderTableCell>{formatNaN(currentPlayerContribution)}</NonBorderTableCell>
          </TableRow>
          {/* 淨盈利 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>{i18n.t("agent.netProfit")}</FillTableCell>
            <FillTableCell>{formatNaN(previousNetProfit)}</FillTableCell>
            <FillTableCell>{formatNaN(currentNetProfit)}</FillTableCell>
          </TableRow>
          {/* 分紅比例 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>*{i18n.t("agent.profitSharePT")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.dividendPercentage)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.dividendPercentage)}</FillTableCell>
          </TableRow>

          {/* 分紅金額 */}
          <TableRow>
            <ListTableCell>
              <Dot />
              {i18n.t("agent.profitShareAmount")}
            </ListTableCell>
            <NonBorderTableCell>{formatNaN(previousData?.totalDividendAmount)}</NonBorderTableCell>
            <NonBorderTableCell>{formatNaN(currentData?.totalDividendAmount)}</NonBorderTableCell>
          </TableRow>
          {/* 直屬玩家貢獻 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+{i18n.t("agent.playerContribution")}</FillTableCell>
            <FillTableCell>{formatNaN(previousPlayerContribution)}</FillTableCell>
            <FillTableCell>{formatNaN(currentPlayerContribution)}</FillTableCell>
          </TableRow>
          {/* 產品費用 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>-{i18n.t("agent.productCharges")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.productFeeAmount)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.productFeeAmount)}</FillTableCell>
          </TableRow>
          {/* 團隊貢獻 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+{i18n.t("agent.teamContribution")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.teamContributionAmount)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.teamContributionAmount)}</FillTableCell>
          </TableRow>
          {/* 累計負分紅 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>+{i18n.t("agent.cumulativeNegativeDividendAmount")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.negativeAgentDividendAmount)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.negativeAgentDividendAmount)}</FillTableCell>
          </TableRow>
          {/* 代理調帳 */}
          <TableRow>
            <FillTableCell sx={{ textAlign: "right" }}>-{i18n.t("agent.agentAdjust")}</FillTableCell>
            <FillTableCell>{formatNaN(previousData?.agentAdjustAmount)}</FillTableCell>
            <FillTableCell>{formatNaN(currentData?.agentAdjustAmount)}</FillTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ProfitShareContainer>
  );
};

export default ProfitShareReport;
