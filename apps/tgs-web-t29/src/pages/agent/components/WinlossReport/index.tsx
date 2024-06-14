import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { TextField, Select, Breadcrumbs } from "@mui/material";
import { useRef } from "react";
import { AgentButton } from "../AgentButton";
import DateRangeWithDatePicker from "../DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "../DateRangeWithIntervalSelector";
import ReportCard from "./components/ReportCard";
import { TableKey, mapTable } from "./config";
import { HintIconWrapper, WinlossReportContainer, FormulaWrapper, FormulaContainer, ScrollArea, TableWrapper, NoData, Wrapper, UserName } from "./components";
import { usePlayerDetail, useWinlossReport, useDragToScrollX } from "./hooks";
import { theme } from "@/theme";
import InfoIcon from "@/assets/t29/images/info.png";
import HintIcon from "@/assets/t29/images/agent/hint.svg";
import Dialog from "@/components/UI/Dialog/Dialog";
import LoadingBlock from "@/components/project/LoadingBlock";

const WinlossReport = () => {
  const { isDesktopSize } = useRwd();
  const scrollAreaRef = useRef(null);
  useDragToScrollX(scrollAreaRef);

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
    handleChangePage,
    totalCount,
    config,
  } = useWinlossReport();

  const {
    playerDetailData, 
    handleGetPlayerDetail,
    modalOpen, 
    handleOnCloseModal
  } = usePlayerDetail({
    from: config.from,
    to: config.to,
  })

  const renderData = () => {

    if(report.isFetching) {
      return (
        <LoadingBlock size={30} style={{margin: "20px auto"}}/>
      )
    }

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
                    textAlign: "center",
                  }}
                >
                  {cells["username"]}
                </TableCell>
              )
              }


              if (row === 'special' && cells['memberType'] === 'agent') {
                return (
                  <TableCell key={i} sx={{textAlign: 'center'}}>
                    <HintIconWrapper>
                      <img
                        src={HintIcon}
                        alt="hint"
                        onClick={() => {
                          handleGetPlayerDetail(id)
                        }}
                      />
                      <span>{cells[row]}</span>
                    </HintIconWrapper>
                </TableCell>
                )
              }

              const data = cells[row as TableKey];

              return (
                <TableCell key={i} sx={{textAlign: 'center'}}>
                  {typeof data === 'number' ? data.toFixed(2) : data}
                </TableCell>
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

      {!isDesktopSize && (
          <AgentButton
            onClick={handleOnSearch}
            disabled={!searchValue ? !searchValue : (report.isFetching || breadCrumb.isFetching)}
          >
            {i18n.t("common.search")}
          </AgentButton>
      )}

      <FormulaWrapper>
        <Accordion sx={{
          'display': 'flex',
          'alignItems': 'flex-start',
          'flexDirection': isDesktopSize ? 'row' : 'column'}}>
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
      {usernames.length > 0 && <Breadcrumbs sx={{color: theme.blue50}}>
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
      </Breadcrumbs>}
      {isDesktopSize ? (
        <ScrollArea ref={scrollAreaRef}>  
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
                  {Object.keys(mapTable).map((key, i) => {
                    if (i === 6) {
                      return (
                        <TableCell key={i} sx={{borderRight: "1px solid #e0e0e0"}}>
                          {i18n.t(mapTable[key as TableKey])}
                        </TableCell>
                      )
                    }

                    return <TableCell key={i}>{i18n.t(mapTable[key as TableKey])}</TableCell>
                  })}
                </TableRow>

              </TableHead>
              <TableBody>
                {/* 報表資料 */}
                {renderData()}
              </TableBody>
              
            </Table>
            
            {(!report.hasData && !report.isFetching) && <NoData>{i18n.t("common.nodata")}</NoData>}
          </TableWrapper>
        </ScrollArea>
      ) : (
        // 手機版
        <ReportCard 
          report={report} 
          handleOnClickUsername={handleOnClickUsername}
          handleGetPlayerDetail={handleGetPlayerDetail}
        />
      )}
      <TablePagination
          component="div"
          count={totalCount ?? 0}
          rowsPerPage={config.rows ?? 20}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[20, 40, 60]}
          sx={{
            ".MuiTablePagination-selectLabel, .MuiTablePagination-selectRoot, .MuiTablePagination-input": {
              display: "none"
            },
      }}/>

      {/* 玩家特別 */}
      <Dialog
        open={modalOpen}
        onClose={handleOnCloseModal}
        fullscreenOnMobile={false}
      >
        <UserName $isDisable style={{margin: "20px auto", display: "block"}}>{i18n.t("agent.playerSpecial")}</UserName>
        <Table sx={{ width: "250px" }}>
          <TableHead>
            <TableRow sx={{ background: theme.blue20 }}>
              <TableCell></TableCell>
              <TableCell sx={{textAlign: "center"}}>{i18n.t("common.amount")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell  sx={{textAlign: "center"}}>{i18n.t("agent.bonus")}</TableCell>
              <TableCell  sx={{textAlign: "center"}}>{playerDetailData?.data.bonus}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{textAlign: "center"}}>{i18n.t("agent.adjust")}</TableCell>
              <TableCell sx={{textAlign: "center"}}>{playerDetailData?.data.bonusAdjust}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{textAlign: "center"}}>{i18n.t("agent.total")}</TableCell>
              <TableCell sx={{textAlign: "center"}}>
                {(playerDetailData?.data.bonus ?? 0) + (playerDetailData?.data.bonusAdjust ?? 0)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Dialog>
    </WinlossReportContainer>
  );
};

export default WinlossReport;
