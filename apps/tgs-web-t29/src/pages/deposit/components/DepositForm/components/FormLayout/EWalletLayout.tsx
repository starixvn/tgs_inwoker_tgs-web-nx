import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { DepositFormContext } from "..";
import { DefaultLayout } from "./DefaultLayout";
import { LayoutProps } from "./index";

/**
 * EWallet UI
 */
export const EWalletLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {formData} = useContext(DepositFormContext);
  const {doEWalletDeposit, doEWalletDepositWithDetail, doUploadDepositProof} = useWalletStore();

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, name, type, phone} = formData;
    if(config.features.Deposit_AddCard) {
      doEWalletDepositWithDetail(amount, id, promotionid, type, 'note', 'detail', name, phone)
        .then((res) => {
          //@ts-ignore
          if(formData.files && res?.IsSuccess && typeof(res.data) === 'string') {
            doUploadDepositProof(res.data, formData.files[0])
          }
        });
      return;
    }

    doEWalletDeposit(amount, id, promotionid, type, 'note', name, phone)
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
