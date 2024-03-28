import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import config from "@tgs-web-nx/config";
import { useChannelList, useUploadFile } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";
import {groupCodeConfig, GroupCodeEnum} from '@/pages/deposit/components/DepositForm/types';
/**
 * FPS UI
 */
export const FpsLayout = ({
  filterGroupList,
  groupCode,
  handlePerformDeposit,
  isThirdPartyPending,
}: LayoutProps) => {
  const {channelList, currentChannel, extended, isManual} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {doFPSDepositWithName, doFPSDeposit} = useWalletStore();
  const {handleUploadFile, isPending: isManualPending} = useUploadFile();

  const bankType = groupCode ? groupCodeConfig[groupCode as GroupCodeEnum].bankType : null;
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };


  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, account, type, name} = formData;
    if(!isManual && handlePerformDeposit) {
      handlePerformDeposit();
      return;
    }

    if(config.features.Deposit_FPSWithName) {
      doFPSDepositWithName(name, account, amount, id, promotionid, type)
        .then((res) => {
          handleUploadFile(formData.files, res);
        })
      return;
    }

    doFPSDeposit(account, amount, id, promotionid, type)
      .then((res) => {
        handleUploadFile(formData.files, res);
      });
  }





  return (
    <>
      <ChannelCards {...props} />

      {isManual && <ExtendedLayout {...extended} banktype={bankType} />}

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isManual={isManual} isPending={!!isManualPending || !!isThirdPartyPending}/>
    </>
  )
};
