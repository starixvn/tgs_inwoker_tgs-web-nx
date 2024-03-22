import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { DepositFormContext } from "..";
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
  const {doCoinsphDeposit, doUploadDepositProof} = useWalletStore();

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, name, type, account: phone} = formData;
    
    doCoinsphDeposit(amount, id, promotionid, type, '', name, phone, '')
      .then((res) => {
        if(formData.files && res?.IsSuccess && typeof(res.data) === 'string') {
          doUploadDepositProof(res.data, formData.files[0])
        }
      });
  }

  return (
    <DefaultLayout filterGroupList={filterGroupList} handleSubmit={handleOnSubmit} groupCode={groupCode}/>
  )
};
