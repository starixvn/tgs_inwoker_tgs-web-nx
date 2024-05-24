import { ChangeEvent, useContext, useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControl,
  MenuItem,
  SelectChangeEvent,
  
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TextField, Select } from "@mui/material";
import moment from "moment";
import { useAccountStore, WinLostConfig, WinLostReport } from "@tgs-web-nx/core";
import { useQuery } from "@tanstack/react-query";
import { AgentContext } from "../AgentContextProvider";
import ReportCard from "./components/ReportCard";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import DateRangeWithDatePicker from "@/pages/report/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/pages/report/components/DateRangeWithIntervalSelector";
import InfoIcon from "@/assets/t18/images/info.png";
import HintIcon from "@/assets/t29/images/agent/hint.svg";
import Dialog from "@/components/UI/Dialog/Dialog";


const WinlossReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Wrapper = styled.div`
  display: flex;
`;

const FormulaWrapper = styled(Wrapper)`
  flex-direction: column;
  gap: 10px;
  ${media.sm} {
    flex-direction: row;
  }
`;

const FormulaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserNameBreadcrumbs = styled.div`
  color: ${({ theme }) => theme.blue50};
  font-size: 20px;
  font-weight: 700;
  line-height: 23px;
`;

const HintIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  & > img {
    cursor: pointer;
  }
`;

const NoData = styled.div`
  padding: 10px;
  margin-top: -20px;
  text-align: center;
  border-bottom: 1px solid rgba(83, 88, 103, 0.3);
`;
const WinlossReport = () => {
  const { isDesktopSize } = useRwd();
  const [modalOpen, setModalOpen] = useState(false);
  const [memberType, setMemberType] = useState("agent");
  const [searchValue, setSearchValue] = useState("");
  const { account } = useAccountStore();
  const username = account.info.member_username;
  const {winLossReport: {
    dateRangeInfo,
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
    isSelectedDateRange,
  }} = useContext(AgentContext);

  const config: WinLostConfig = {
    from: moment(dateRangeInfo.dateFrom).format('YYYY-MM-DD'),
    to: moment(dateRangeInfo.dateTo).format('YYYY-MM-DD'),
    memberType,
    username: searchValue ? searchValue : username,
    downline: !!searchValue
  };
  const {getWinLossReport, queryKey} = WinLostReport(config);
  const {refetch, data, isSuccess, isFetching, isFetched} = useQuery({queryKey, queryFn: getWinLossReport, enabled: false});
  const hasData = data && data.data.items.length > 0;
  
  const handleOnChange = (e: SelectChangeEvent) => {
    setMemberType(e.target.value);
  }

  const handleOnSearch = () => {
    refetch()
  }

  const handleOnSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const renderData = () => {
    if(isSuccess) {
      return data.data.items.map((transactionDetail) => {
        const {
            agentSpecial,
            agentTotal,
            agentWinLoss,
            companySpecial,
            companyTotal,
            companyWinLoss,
            id,
            memberType,
            roundCount,
            special,
            turnover,
            username,
            winLoss,
        } = transactionDetail;
  
        return (
          <TableRow key={id}>
            <TableCell>{username}</TableCell>
            <TableCell>{memberType}</TableCell>
            <TableCell>{agentTotal}</TableCell>
            {/* <TableCell>{validBet}</TableCell> */}
            <TableCell>{winLoss}</TableCell>
            <TableCell>
              <HintIconWrapper>
                <img
                  src={HintIcon}
                  alt="hint"
                  onClick={() => {
                    setModalOpen(true);
                  }}
                />
                <span>{agentSpecial}</span>
              </HintIconWrapper>
            </TableCell>
            <TableCell>{agentWinLoss}</TableCell>
            <TableCell>{companyWinLoss}</TableCell>
            <TableCell>{companySpecial}</TableCell>
            <TableCell>{companyTotal}</TableCell>
          </TableRow>
        );
      })
    }

    return null;
  }

  

  return (
    <WinlossReportContainer>
      <Wrapper>
        <Select defaultValue={memberType} sx={{ width: "150px" }} onChange={handleOnChange}>
          <MenuItem value={"agent"}>{i18n.t("usertype.agent")} </MenuItem>
          <MenuItem value={"player"}>{i18n.t("usertype.player")} </MenuItem>
        </Select>
        <TextField
          value={searchValue}
          onChange={handleOnSearchValue}
          placeholder={i18n.t("common.username")}
          sx={{
            marginLeft: "10px",
            input: {
              width: "200px",
            },
          }}
        />
      </Wrapper>
      <Wrapper>
        <DateRangeWithDatePicker
          dateFrom={dateRangeInfo.dateFrom}
          dateTo={dateRangeInfo.dateTo}
          handleDateFromChange={handleDateFromChange}
          handleDateToChange={handleDateToChange}
          selectedType={0}
        />
        {isDesktopSize && (
          <Button
            variant={"outlined"}
            sx={{
              marginLeft: "20px",
              width: "100px",
              color: theme.white,
              background: theme.primary,
              "&:hover": {
                color: theme.white,
                background: theme.primary,
              },
            }}
            onClick={handleOnSearch}
            disabled={isFetching}
          >
            {i18n.t("common.search")}
          </Button>
        )}
      </Wrapper>
      <Wrapper>
        <DateRangeWithIntervalSelector
          dateRange={dateRangeInfo.dateRange}
          handleDateRangeChange={(dateRangeEnum: number) => {
            handleDateRangeChange(dateRangeEnum);
          }}
          isSelectedDateRange={isSelectedDateRange}
        />
      </Wrapper>
      <FormulaWrapper>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <img src={InfoIcon} width={24} height={24} alt="info" />
          </AccordionSummary>
          <AccordionDetails>
            <FormulaContainer>
              <div>{`- ${i18n.t("agent.formula.noOfTickets")}`}</div>
              <div>{`- ${i18n.t("agent.formula.turnover")}`}</div>
              <div>{`- ${i18n.t("agent.formula.playerWinloss")}`}</div>
              <div>{`- 玩家特别: 该代理线全部玩家的"红利金额" + "调帐"(公司、代理、优惠)。`}</div>
              <div>{`- ${i18n.t("agent.formula.bonusAmount")}`}</div>
              <div>{`- 红利金额: VIP福利 + VIP返水 + 活动的优惠金额。`}</div>
              <div>{`- ${i18n.t("agent.formula.agentWinloss")}`}</div>
              <div>{`- ${i18n.t("agent.formula.agentSpecial")}`}</div>
            <div>{`- 代理盈虧: 代理輸贏 - 代理特別。`}</div>
          </FormulaContainer>
          </AccordionDetails>
        </Accordion>
        
        
      </FormulaWrapper>
      <UserNameBreadcrumbs>Username</UserNameBreadcrumbs>
      {isDesktopSize ? (
        <Table>
          <TableHead>
            <TableRow sx={{ background: theme.blue20 }}>
              <TableCell colSpan={7} sx={{ textAlign: "center" }}>
                {i18n.t("usertype.player")}
              </TableCell>
              <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                {i18n.t("usertype.agent")}
              </TableCell>
            </TableRow>
            <TableRow sx={{ background: theme.blue10 }}>
              <TableCell>{i18n.t("common.username")}</TableCell>
              <TableCell>类型</TableCell>
              <TableCell>订单数</TableCell>
              <TableCell>有效投注</TableCell>
              <TableCell>{i18n.t("report.winloss")}</TableCell>
              <TableCell>特别</TableCell>
              <TableCell>盈亏</TableCell>
              <TableCell>{i18n.t("report.winloss")}</TableCell>
              <TableCell>特别</TableCell>
              <TableCell>盈亏</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderData()}
          </TableBody>
        </Table>
      ) : (
        <ReportCard />
      )}
      {!hasData && <NoData>沒有資料</NoData>}
      <Dialog
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
      >
        <Table sx={{ width: "250px" }}>
          <TableHead>
            <TableRow sx={{ background: theme.blue20 }}>
              <TableCell></TableCell>
              <TableCell>{i18n.t("common.amount")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>红利</TableCell>
              <TableCell>125</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>調帳</TableCell>
              <TableCell>125</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>總計</TableCell>
              <TableCell>250</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Dialog>
    </WinlossReportContainer>
  );
};

export default WinlossReport;
