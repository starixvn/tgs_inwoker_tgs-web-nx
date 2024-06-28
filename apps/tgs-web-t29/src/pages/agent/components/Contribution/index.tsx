import { useDragToScrollX, useRwd } from "@tgs-web-nx/core/hooks";
import { Common, i18n } from "@tgs-web-nx/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useRef } from "react";
import { AgentButton } from "../AgentButton";
import DateRangeWithDatePicker from "../DateRangeWithDatePicker";
import DateRangeWithIntervalSelector from "../DateRangeWithIntervalSelector";
import { TableKey, mapTable } from "./config";
import { Container, ScrollArea, NoData, Wrapper } from "./components";
import { useContribution, formatNumber } from "./hooks";
import { theme } from "@/theme";
import LoadingBlock from "@/components/project/LoadingBlock";


const sticky = {
  position: "sticky",
  left: 0,
  zIndex: 2,
};


const Contribution = () => {
  const { isDesktopSize } = useRwd();
  const scrollAreaRef = useRef(null);
  useDragToScrollX(scrollAreaRef);

  const {
    searchValue,
    report,
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
  } = useContribution();

  const renderData = () => {

    if(report.isFetching) {
      return (
        <LoadingBlock size={30} style={{margin: "20px auto"}}/>
      )
    }

    if(report.hasData) {
      return report?.items ?.map((item, i) => {
        const {
            username,
            type,
            depositAmount,
            depositHandlingFee,
            withdrawalAmount,
            companyAdjustAmount,
            agentAdjustAmount,
            bonusAdjustAmount,
            bonusAmount,
            betAmount,
            validBetAmount,
            turnover,
            winLossAmount,
            netProfit
        } = item;
        
        const cells: Record<TableKey, string | number> = {
          username,
          type, 
          depositAmount: Common.formatCurrency(depositAmount), 
          withdrawalAmount: Common.formatCurrency(formatNumber(withdrawalAmount)), 
          agentAdjustAmount: Common.formatCurrency(formatNumber(agentAdjustAmount)), 
          bonusAdjustAmount: Common.formatCurrency(formatNumber(bonusAdjustAmount)), 
          bonusAmount: Common.formatCurrency(formatNumber(bonusAmount)), 
          betAmount: Common.formatCurrency(formatNumber(betAmount)), 
          validBetAmount: Common.formatCurrency(formatNumber(validBetAmount)), 
          turnover: Common.formatCurrency(formatNumber(turnover)), 
          winLossAmount: Common.formatCurrency(formatNumber(winLossAmount)), 
          netProfit: Common.formatCurrency(formatNumber(netProfit)), 
        };

        


        return (
          <TableRow key={i}>
            {Object.keys(mapTable).map((row, i) => {
              const data = cells[row as TableKey];

              if(row === 'username') {
                return (
                  <TableCell key={i} sx={{
                    textAlign: "center",
                    background: "#fff",
                    ...sticky,
                  }}>
                    {data}
                  </TableCell>
                )
              }

              return (
                <TableCell key={i} sx={{textAlign: 'center'}}>
                  {data}
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
    <Container>
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
            disabled={!searchValue ? !searchValue : (report.isFetching)}
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
          isShowMonth={false}
        />
      </Wrapper>

      {!isDesktopSize && (
          <AgentButton
            onClick={handleOnSearch}
            disabled={!searchValue ? !searchValue : (report.isFetching)}
          >
            {i18n.t("common.search")}
          </AgentButton>
      )}

      {isDesktopSize ? (
        <ScrollArea ref={scrollAreaRef}>  
            <Table sx={{minWidth: '1200px'}}>
              <TableHead>

                {/* 分類 */}
                <TableRow sx={{ background: theme.blue10 }}>
                  {Object.keys(mapTable).map((key, i) => {
                    if (key === 'username') {
                      return (
                        <TableCell key={i} sx={{
                          background: "#CBDEED",
                          ...sticky
                        }}>
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
        </ScrollArea>
      ) : (
        // 手機版
        <></>
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
    </Container>
  );
};

export default Contribution;
