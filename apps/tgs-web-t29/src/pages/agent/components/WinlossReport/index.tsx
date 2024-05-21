import { useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";
import {
  Button,
  FormControl,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TextField, Select } from "@mui/material";
import ReportCard from "./components/ReportCard";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import DateRangeWithDatePicker from "@/pages/report/components/DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "@/pages/report/components/DateRangeWithIntervalSelector";
import { useDateRange } from "@/components/account/Report/hooks/useDateRange";
import InfoIcon from "@/assets/t18/images/info.png";
import HintIcon from "@/assets/t29/images/agent/hint.svg";
import Dialog from "@/components/UI/Dialog/Dialog";

const fakeData = {
  items: [
    {
      id: "018f8b81-7302-0000-0001-07e871937e08",
      userName: "testFE1",
      type: "agent",
      totalOrders: 100,
      validBet: 200,
      aWinLoss: 400,
      aSpecial: 500,
      aProfit: 200,
      pWinLoss: 400,
      pSpecial: 600,
      pProfit: 800,
    },
  ],
  totalcount: 21,
};

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

const WinlossReport = () => {
  const { isDesktopSize } = useRwd();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    dateRangeInfo,
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
    isSelectedDateRange,
  } = useDateRange();

  return (
    <WinlossReportContainer>
      <Wrapper>
        <Select defaultValue={"agent"} sx={{ width: "150px" }}>
          <MenuItem value={"agent"}>{i18n.t("usertype.agent")} </MenuItem>
          <MenuItem value={"player"}>{i18n.t("usertype.player")} </MenuItem>
        </Select>
        <TextField
          // value={subject}
          // onChange={updateSubject}
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
        <img src={InfoIcon} width={24} height={24} alt="info" />
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
            {fakeData.items.map((transactionDetail) => {
              const {
                id,
                userName,
                type,
                totalOrders,
                validBet,
                aWinLoss,
                aSpecial,
                aProfit,
                pWinLoss,
                pSpecial,
                pProfit,
              } = transactionDetail;

              return (
                <TableRow key={id}>
                  <TableCell>{userName}</TableCell>
                  <TableCell>{type}</TableCell>
                  <TableCell>{totalOrders}</TableCell>
                  <TableCell>{validBet}</TableCell>
                  <TableCell>{aWinLoss}</TableCell>
                  <TableCell>
                    <HintIconWrapper>
                      <img
                        src={HintIcon}
                        alt="hint"
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      />
                      <span>{aSpecial}</span>
                    </HintIconWrapper>
                  </TableCell>
                  <TableCell>{aProfit}</TableCell>
                  <TableCell>{pWinLoss}</TableCell>
                  <TableCell>{pSpecial}</TableCell>
                  <TableCell>{pProfit}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <ReportCard />
      )}

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
