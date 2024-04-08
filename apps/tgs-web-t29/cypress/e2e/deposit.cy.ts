import {common, deposit} from "../commands";

describe("存款功能 E2E 測試", () => {
  beforeEach(() => {
    common.setLang();
  });

  it("visitDepositPage", () => {
    common.interceptBaseApi();
    deposit.enterLoginInfo();
    deposit.visitDepositPage();
  });
});
