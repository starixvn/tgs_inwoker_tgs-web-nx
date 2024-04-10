import {common, deposit} from "../commands";


describe("存款功能 E2E 測試", () => {
  beforeEach(() => {
    common.setSessionStorage();
    common.setNotAuthLocalStorage();
  });

  it("前往存款頁面", () => {
    deposit.visitDepositPage();
  });

  it("銀行手動存款測試", () => {
    deposit.visitDepositPage();
    deposit.bank.manualBankDeposit();
  });

  it("DibaoPay", () => {
    deposit.visitDepositPage();
    deposit.bank.dibaoPay();
  });

  it("Coinsph 手動存款測試", () => {
    deposit.visitDepositPage();
    deposit.coinsph.manualCoinsphDeposit();
  });
});
