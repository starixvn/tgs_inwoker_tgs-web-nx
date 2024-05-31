import { useImageActions, useRebateTable, useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  styled as muiStyled,
} from "@mui/material";
import { useProfitShareReport } from "./hooks";
import { AgentSelect } from "./components";
import Loading from "@/components/UI/Loading";


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
  border: "none",
  fontSize: "16px",
}));

const FillTableCell = muiStyled(NonBorderTableCell)(({ theme }) => ({
  border: "none",
  background: theme.palette.blue20,
}));

const TitleTableCell = muiStyled(NonBorderTableCell)(({ theme }) => ({
  color: "#23507D",
  fontWeight: 700,
}));


const ProfitShareReport = () => {
  const { imageId } = useImageActions();
  const { affiliateLink } = useRebateTable();
  const { isDesktopSize } = useRwd();
  const {lists: {current, previous}, formatDate, formatSentOn} = useProfitShareReport();
  const currentData = current.data[current.currentKey] && current.data[current.currentKey][0];
  const previousData = previous.data[previous.currentKey] && previous.data[previous.currentKey][0];


  if(!current.data[current.currentKey] || !previous.data[previous.currentKey]) {
    return <Loading show /> 
  }

  return (
    <ProfitShareContainer>
      {/* 結算週期: 顯示"目前"該平台設定的結算週期, 有每日/每週/雙週/每月四種 */}
      <ProfitShareTitle>結算週期:每日</ProfitShareTitle>
      <Table sx={{ fontSize: "18px" }}>
        <TableHead>
          <TableRow>
            <NonBorderTableCell></NonBorderTableCell>
            <TitleTableCell>
              {/* 上期 */}
              <AgentSelect options={previous.keys} onChange={previous.onChange} value={previous.currentKey}>
                上期
              </AgentSelect>
            </TitleTableCell>
            <TitleTableCell>
              {/* 本期 */}
              <AgentSelect options={current.keys} onChange={current.onChange} value={current.currentKey}>
                本期
              </AgentSelect>
            </TitleTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {/* 週期日期: 顯示日期:YYYY/MM/DD */}
            <TitleTableCell>週期日期</TitleTableCell>
            <NonBorderTableCell>
              {formatDate(previousData?.from)} - {formatDate(previousData?.to)}</NonBorderTableCell>
            <NonBorderTableCell>
              {formatDate(currentData?.from)} - {formatDate(currentData?.to)}</NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 派發狀態: 審核中 已派發 已拒絕三種 */}
            <TitleTableCell>派發狀態</TitleTableCell>
            <NonBorderTableCell>
              {formatSentOn(previousData?.sentOn)}
            </NonBorderTableCell>
            <NonBorderTableCell>
              {formatSentOn(currentData?.sentOn)}
            </NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 代理承擔紅利: 分紅金額 * 分紅比例 */}
            <TitleTableCell>代理承擔紅利</TitleTableCell>
            <NonBorderTableCell>
              {previousData?.directDividendAmount * previousData?.dividendPercentage}
            </NonBorderTableCell>
            <NonBorderTableCell>
              {currentData?.directDividendAmount * currentData?.dividendPercentage}
            </NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 代理承擔優惠調帳: 優惠調帳 * 分紅比例 */}
            <TitleTableCell>代理承擔優惠調帳</TitleTableCell>
            <NonBorderTableCell>
              {previousData?.bonusAdjustAmount * previousData?.dividendPercentage}
            </NonBorderTableCell>
            <NonBorderTableCell>
              {currentData?.bonusAdjustAmount * currentData?.dividendPercentage}
            </NonBorderTableCell>
          </TableRow>

          <TableRow>
            {/* 週期盈虧: 公司輸贏-紅利金額 */}
            <TitleTableCell>週期盈虧</TitleTableCell>
            <NonBorderTableCell>{previousData?.companyWinLossAmount - previousData?.bonus}</NonBorderTableCell>
            <NonBorderTableCell>{currentData?.companyWinLossAmount - currentData?.bonus}</NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 公司輸贏: 公司贏玩家輸的加總(正數時) */}
            <FillTableCell sx={{ textAlign: "right" }}>+ 公司輸贏</FillTableCell>
            <FillTableCell>{previousData?.companyWinLossAmount}</FillTableCell>
            <FillTableCell>{currentData?.companyWinLossAmount}</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 紅利金額: VIP福利+VIP返水+活動優惠金額的加總 */}
            <FillTableCell sx={{ textAlign: "right" }}>- 紅利金額</FillTableCell>
            <FillTableCell>{previousData?.bonus}</FillTableCell>
            <FillTableCell>{currentData?.bonus}</FillTableCell>
          </TableRow>

          <TableRow>
            {/* 直屬玩家貢獻: 淨盈利*分紅比例(這個代理的) */}
            <TitleTableCell>直屬玩家貢獻</TitleTableCell>
            <NonBorderTableCell>333,333,333</NonBorderTableCell>
            <NonBorderTableCell>400</NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 淨盈利 */}
            <FillTableCell sx={{ textAlign: "right" }}>淨盈利</FillTableCell>
            <FillTableCell>222,222,222</FillTableCell>
            <FillTableCell>410</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 分紅比例: 該名代理後台設定的"分紅比例"%數 */}
            <FillTableCell sx={{ textAlign: "right" }}>*分紅比例</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>

          <TableRow>
            {/* 分紅金額: 直屬玩家貢獻+團隊貢獻+累計負分紅-代理調帳-平台費用-產品費用會等於後台"代理分紅派發"的實際分紅金額 */}
            <TitleTableCell>分紅金額</TitleTableCell>
            <NonBorderTableCell>333,333,333</NonBorderTableCell>
            <NonBorderTableCell>400</NonBorderTableCell>
          </TableRow>
          <TableRow>
            {/* 直屬玩家貢獻 */}
            <FillTableCell sx={{ textAlign: "right" }}>+ 直屬玩家貢獻</FillTableCell>
            <FillTableCell>222,222,222</FillTableCell>
            <FillTableCell>410</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 產品費用: 真人+體育+電子+棋牌+彩票+虛擬體育的產品費用加總, 代理贏才做計算，若代理輸為負數則=0 */}
            <FillTableCell sx={{ textAlign: "right" }}>-產品費用</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 團隊貢獻: 下級代理淨盈利 * (該名代理分紅% - 下級代理分紅%) */}
            <FillTableCell sx={{ textAlign: "right" }}>+ 團隊貢獻</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 累計負分紅: 該名代理的當期累計的累計負分紅(只會有0和負值), 會等於後台"代理分紅派發"的累計負分紅金額 */}
            <FillTableCell sx={{ textAlign: "right" }}>累計負分紅</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
          <TableRow>
            {/* 代理調帳: 代理調帳金額(僅顯示有勾"算入凈盈利"的優惠調帳金額) */}
            <FillTableCell sx={{ textAlign: "right" }}>- 代理調帳</FillTableCell>
            <FillTableCell>111,111,111</FillTableCell>
            <FillTableCell>10</FillTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </ProfitShareContainer>
  );
};

export default ProfitShareReport;
