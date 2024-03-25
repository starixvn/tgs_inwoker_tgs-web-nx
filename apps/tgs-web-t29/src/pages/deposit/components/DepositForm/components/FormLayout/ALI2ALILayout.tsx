import { useContext } from "react";
import { useWalletStore } from "@tgs-web-nx/core";
import { useChannelList } from "../../hooks";
import { Cards as ChannelCards, DepositAmountInput, DepositFormContext, DepositPromotion, DepositSubmitButton, Upload } from "../../components";
import { ExtendedLayout } from "../Extended";
import { LayoutProps } from "./index";
import {groupCodeConfig, GroupCodeEnum} from '@/pages/deposit/components/DepositForm/types';


/**
 * ALI2ALI UI
 */
export const ALI2ALILayout = ({
  filterGroupList,
  groupCode,
}: LayoutProps) => {
  const {channelList, currentChannel, extended, hasExtended, isManual} = useChannelList(filterGroupList, groupCode);
  const {formData} = useContext(DepositFormContext);
  const {performDeposit, doThirdPartyDeposit, doUploadDepositProof} = useWalletStore();
  const bankType = groupCode ? groupCodeConfig[groupCode as GroupCodeEnum].bankType : null;
  const props = {
    i18nParam: "depositAndWithdrawalStatus.channel",
    list: channelList,
  };

  /**
   * 送出表單
   */
  const handleOnSubmit = () => {
    const {amount, id, promotionid, paymentcode, type} = formData;
    if(isManual) {
      doThirdPartyDeposit(amount, id, promotionid, type)
        .then((res) => {
          if(formData.files && res?.IsSuccess && typeof(res.data) === 'string') {
            doUploadDepositProof(res.data, formData.files[0])
          }
        });
      return;
    }

    performDeposit(amount, id, promotionid, paymentcode, type);
  }

  return (
    <>
      <ChannelCards {...props} />

      {hasExtended && <ExtendedLayout {...extended} banktype={bankType} />}

      {/* 請輸入存款金額 */}
      <DepositAmountInput currentChannel={currentChannel} />

      {/* 選擇優惠活動 */}
      <DepositPromotion />

      {isManual && <Upload />}

      {/* 提交表單 */}
      <DepositSubmitButton handleOnSubmit={handleOnSubmit} isManual={isManual} />
    </>
  )
};
