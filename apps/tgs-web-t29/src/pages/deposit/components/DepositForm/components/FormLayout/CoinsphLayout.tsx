import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { DepositFormContext } from "..";
import { useUploadFile } from "../../hooks";
import { DefaultLayout } from "./DefaultLayout";
import { LayoutProps } from "./index";

/**
 * Coinsph UI
 */
export const CoinsphLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {formData} = useContext(DepositFormContext);
  const {doCoinsphDeposit} = useWalletStore();
  const {handleUploadFile, isPending} = useUploadFile();

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, name, type, account: phone} = formData;

    doCoinsphDeposit(amount, id, promotionid, type, '', name, phone, '')
      .then((res) => {
        handleUploadFile(formData.files, res);
      });
  }

  return (
    <DefaultLayout filterGroupList={filterGroupList} handleSubmit={handleOnSubmit} groupCode={groupCode} isManualPending={isPending}/>
  )
};
