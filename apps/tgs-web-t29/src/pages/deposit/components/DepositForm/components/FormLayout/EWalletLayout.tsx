import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { DepositFormContext } from "..";
import { DefaultLayout } from "./DefaultLayout";
import { LayoutProps } from "./index";
import {useUploadFile} from '@/pages/deposit/components/DepositForm/hooks';

/**
 * EWallet UI
 */
export const EWalletLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {formData} = useContext(DepositFormContext);
  const {doEWalletDeposit, doEWalletDepositWithDetail} = useWalletStore();
  const {handleUploadFile, isPending} = useUploadFile();
  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, eMoneyName, type, phone} = formData;
    if(config.features.Deposit_AddCard) {
      doEWalletDepositWithDetail(amount, id, promotionid, type, 'note', 'detail', eMoneyName, phone)
        .then((res) => {
          handleUploadFile(formData.files, res);
        });
      return;
    }

    doEWalletDeposit(amount, id, promotionid, type, 'note', eMoneyName, phone)
      .then((res) => {
        if(formData.files && res?.IsSuccess) {
          handleUploadFile(formData.files, res);
        }
      })
  }

  return (
    <DefaultLayout filterGroupList={filterGroupList} handleSubmit={handleOnSubmit} groupCode={groupCode} isShowExtendedLayout={false} isManualPending={isPending}/>
  )
};
