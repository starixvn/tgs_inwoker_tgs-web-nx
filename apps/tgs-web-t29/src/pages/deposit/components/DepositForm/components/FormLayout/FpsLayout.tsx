import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { DepositFormContext } from "..";
import { DefaultLayout } from "./DefaultLayout";
import { LayoutProps } from "./index";

/**
 * FPS UI
 */
export const FpsLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {formData} = useContext(DepositFormContext);
  const {doFPSDepositWithName, doFPSDeposit} = useWalletStore();
  

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, account, type, name} = formData;
    if(config.features.Deposit_FPSWithName) {
      doFPSDepositWithName(name, account, amount, id, promotionid, type);
      return;
    }

    doFPSDeposit(account, amount, id, promotionid, type);
  }

  return (
    <DefaultLayout filterGroupList={filterGroupList} groupCode={groupCode} handleSubmit={handleOnSubmit}/>
  )
};
