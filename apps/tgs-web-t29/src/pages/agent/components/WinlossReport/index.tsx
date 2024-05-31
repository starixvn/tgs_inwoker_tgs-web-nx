import { useContext, useState } from "react";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
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
import { TextField, Select, Breadcrumbs } from "@mui/material";
import { AgentContext } from "../AgentContextProvider";
import { AgentButton } from "../AgentButton";
import DateRangeWithDatePicker from "../DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "../DateRangeWithIntervalSelector";
import ReportCard from "./components/ReportCard";
import { TableKey, mapTable } from "./config";
import { HintIconWrapper, WinlossReportContainer, FormulaWrapper, FormulaContainer, ScrollArea, TableWrapper, NoData, Wrapper, UserName } from "./components";
import { useWinlossReport } from "./hooks";
import { theme } from "@/theme";
import InfoIcon from "@/assets/t18/images/info.png";
import HintIcon from "@/assets/t29/images/agent/hint.svg";
import Dialog from "@/components/UI/Dialog/Dialog";


const WinlossReport = () => {
  const { isDesktopSize } = useRwd();
  const [modalOpen, setModalOpen] = useState(false);
  
  const {
    memberType,
    searchValue,
    setSearchValue, 
    setMemberType, 
    handleOnClickUsername,
    handleOnClickBreadcrumb,
    report,
    breadCrumb,
    usernames,
    handleOnSearch,
    dateRangeInfo,
    handleDateFromChange,
    handleDateToChange,
    handleDateRangeChange,
    isSelectedDateRange,
    page,
    handleChangePage
  } = useWinlossReport();

  const renderData = () => {
    if(report.hasData) {
      return report.items?.map((transactionDetail) => {
        const {
            username,
            agentSpecial,
            agentWinLoss,
            id,
            memberType,
            roundCount,
            special,
            turnover,
            winLoss,
        } = transactionDetail;
        
        const cells: Record<TableKey, string | number> = {
          username,
          memberType, 
          roundCount, 
          turnover, 
          winLoss, 
          special, 
          profit: winLoss - special, 
          agentWinLoss, 
          agentSpecial, 
          agentProfit: agentWinLoss - agentSpecial
        };
        
        return (
          <TableRow key={id}>
            {Object.keys(mapTable).map((row, i) => {
              
              if(row === 'username' && cells['memberType'] === 'agent') {
                return (
                <TableCell 
                  key={i} 
                  onClick={() => handleOnClickUsername(cells.username as string, memberType)}
                  sx={{
                    color: "#23507D",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {cells.username}
                </TableCell>
              )
              }


              if (row === 'special') {
                return (
                  <TableCell key={i}>
                    <HintIconWrapper>
                      <img
                        src={HintIcon}
                        alt="hint"
                        onClick={() => {
                          setModalOpen(true);
                        }}
                      />
                      <span>{cells[row]}</span>
                    </HintIconWrapper>
                </TableCell>
                )
              }

              return (
                <TableCell key={i}>{cells[row as TableKey]}</TableCell>
              )
            })}
          </TableRow>
        );
      })
    }

    return null;
  }
  
  return (
    <WinlossReportContainer>
      <Wrapper>
        <Select 
          defaultValue={memberType} 
          sx={{ width: "150px" }} 
          onChange={(e)=> setMemberType(e.target.value)}
        >
          <MenuItem value={"agent"}>{i18n.t("usertype.agent")} </MenuItem>
          <MenuItem value={"player"}>{i18n.t("usertype.player")} </MenuItem>
        </Select>
        <TextField
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
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
          <AgentButton
            sx={{
              marginLeft: "20px",
            }}
            onClick={handleOnSearch}
            disabled={!searchValue ? !searchValue : (report.isFetching || breadCrumb.isFetching)}
          >
            {i18n.t("common.search")}
          </AgentButton>
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
        <Accordion sx={{'display': 'flex', 'alignItems': 'flex-start'}}>
          <AccordionSummary
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{flexShrink: '0'}}
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
      <Breadcrumbs sx={{color: theme.blue50}}>
          {
            usernames.map((name, i) => {
              const isDisable = i === usernames.length - 1;
              return (
                <UserName $isDisable={isDisable}
                  onClick={() => handleOnClickBreadcrumb(name, isDisable)} 
                  key={i}>
                    {name}
                </UserName>
              );
            })
          }
      </Breadcrumbs>
      {isDesktopSize ? (
        <ScrollArea>
          <TableWrapper>
            <Table>
              <TableHead>
                {/* 玩家、代理 */}
                <TableRow sx={{ background: theme.blue20 }}>
                  <TableCell colSpan={7} sx={{ textAlign: "center", borderRight: "1px solid #e0e0e0" }}>
                    {i18n.t("usertype.player")}
                  </TableCell>
                  <TableCell colSpan={3} sx={{ textAlign: "center" }}>
                    {i18n.t("usertype.agent")}
                  </TableCell>
                </TableRow>

                {/* 分類 */}
                <TableRow sx={{ background: theme.blue10 }}>
                  {Object.values(mapTable).map((t, i) => {
                    if (i === 6) {
                      return (
                        <TableCell key={i} sx={{borderRight: "1px solid #e0e0e0"}}>
                          {t}
                        </TableCell>
                      )
                    }

                    return <TableCell key={i}>{t}</TableCell>
                  })}
                </TableRow>

              </TableHead>
              <TableBody>
                {/* 報表資料 */}
                {renderData()}
              </TableBody>
              
            </Table>
            
            {!report.hasData && <NoData>沒有資料</NoData>}
          </TableWrapper>
          {(report.items && report.items?.length >= 20) && <TablePagination
            component="div"
            count={report.items?.length ?? 0}
            rowsPerPage={20}
            page={page}
            onPageChange={handleChangePage}
            sx={{
              ".MuiTablePagination-selectLabel, .MuiTablePagination-selectRoot, .MuiTablePagination-input": {
                display: "none"
              },
            }}
          />}
        </ScrollArea>
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
