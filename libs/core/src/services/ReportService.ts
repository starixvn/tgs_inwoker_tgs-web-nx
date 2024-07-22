import {
  GetBalanceChangesResDto,
  GetDepositDetailsResDto,
  GetDepositStatusResDto,
  GetRoundsTotalResDto,
  GetTransactionDetailsResDto,
  GetTransferReportResDto,
  GetWithdrawalDetailsResDto,
  GetWithdrawalStatusResDto,
} from "@tgs-web-nx/types";
import { ApiService } from "../api-services/services/ApiService";

export const ReportService = {
  GetTransactionDetails,
  GetWithdrawalDetails,
  GetDepositDetails,
  GetDepositStatus,
  GetWithdrawalStatus,
  GetTransferReport,
  GetRoundsTotal,
  GetBalanceChanges,
};

function GetTransactionDetails(
  from: string,
  to: string,
  page: number,
  rows: number,
  desc: boolean,
  sort: string,
  all: boolean,
  culture: string,
) {
  return ApiService.get(
    `playerreport/rounds?From=${from}&To=${to}&page=${page}&rows=${rows}&desc=${desc}&sort=${sort}&all=${all}&culture=${culture}`,
  ) as unknown as Promise<GetTransactionDetailsResDto>;
}

function GetRoundsTotal(from: string, to: string) {
  return ApiService.get(
    `playerreport/rounds/total?From=${from}&To=${to}`,
  ) as unknown as Promise<GetRoundsTotalResDto>;
}

function GetWithdrawalDetails(
  status: string,
  from: string,
  to: string,
  page: number,
  rows: number,
  desc: boolean,
  sort: string,
  all: boolean,
  order: string,
) {
  return ApiService.get(
    `withdraw/player/list?status=${status}&begincreate=${from}&endcreate=${to}&Page=${page}&Rows=${rows}&IsDesc=${desc}&SortBy=${sort}&ShowAll=${all}&OrderBy=${order}`,
  ) as unknown as Promise<GetWithdrawalDetailsResDto>;
}

function GetDepositDetails(
  status: string,
  from: string,
  to: string,
  page: number,
  rows: number,
  desc: boolean,
  sort: string,
  all: boolean,
  order: string,
) {
  return ApiService.get(
    `deposit/player/list?status=${status}&begincreate=${from}&endcreate=${to}&Page=${page}&Rows=${rows}&IsDesc=${desc}&SortBy=${sort}&ShowAll=${all}&OrderBy=${order}`,
  ) as unknown as Promise<GetDepositDetailsResDto>;
}

function GetDepositStatus() {
  return ApiService.get(`deposit/status`) as unknown as Promise<GetDepositStatusResDto>;
}

function GetWithdrawalStatus() {
  return ApiService.get(`withdraw/status`) as unknown as Promise<GetWithdrawalStatusResDto>;
}

function GetTransferReport(
  from: string,
  to: string,
  page: number,
  rows: number,
  order: number,
  desc: boolean,
  sort: string,
  all: boolean,
) {
  return ApiService.get(
    `game/balance/list?beginrecord=${from}&endrecord=${to}&Page=${page}&Rows=${rows}&OrderBy=${order}&IsDesc=${desc}&SortBy=${sort}&ShowAll=${all}`,
  ) as unknown as Promise<GetTransferReportResDto>;
}

function GetBalanceChanges(from: string, to: string, page: number, rows: number) {
  return ApiService.get(
    `transaction?from=${from}&to=${to}&page=${page}&rows=${rows}`,
  ) as unknown as Promise<GetBalanceChangesResDto>;
}
