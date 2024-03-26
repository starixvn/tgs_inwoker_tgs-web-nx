import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { DepositFormContext } from "..";
import { DefaultLayout } from "./DefaultLayout";
import { LayoutProps } from "./index";
import {useUploadFile} from '@/pages/deposit/components/DepositForm/hooks';

/**
 * Pulsa UI
 */
export const PulsaLayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {formData} = useContext(DepositFormContext);
  const {doPulsaDeposit, doPulsaDepositWithDetail} = useWalletStore();
  const {handleUploadFile, isPending} = useUploadFile();

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, type, phone} = formData;
    if(config.features.Deposit_AddCard) {
      doPulsaDepositWithDetail(amount, id, promotionid, type, 'note', 'detail', phone).then((res) => {
            handleUploadFile(formData.files, res);
          });
      return;
    }

    doPulsaDeposit(amount, id, promotionid, type, 'note', phone)
      .then((res) => {
        handleUploadFile(formData.files, res);
      });
  }

  return (
    <DefaultLayout filterGroupList={filterGroupList} handleSubmit={handleOnSubmit} groupCode={groupCode} isManualPending={isPending}/>
  )
};
