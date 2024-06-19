import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { useGetChannelCode } from "@tgs-web-nx/core/hooks";
import config from "@tgs-web-nx/config";
import iconCard from "@/assets/t29/images/withdraw/icon-card.svg";
import iconCardActive from "@/assets/t29/images/withdraw/icon-card-active.svg";
import iconManage from "@/assets/t29/images/withdraw/icon-manage.svg";
import { theme } from "@/theme";
import Icon from "@/components/project/Icon";

const BankCardGroupContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

type BankCardButtonProps = {
  $active: boolean;
  $disabled?: boolean;
  theme: typeof theme;
};
const getBackgroundColor = (props: BankCardButtonProps) => {
  const { $active, $disabled, theme } = props;
  //顯示channel code功能開啟且拿不到channel code時disabled
  if ($disabled) {
    return "#D9D9D9";
  } else return $active ? theme.blue40 : theme.blue20;
};
const BankCardButton = styled.div<BankCardButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  font-size: 14px;
  color: ${({ $active, theme }: BankCardButtonProps) => ($active ? theme.white : theme.gray50)};
  background: ${(props: BankCardButtonProps) => getBackgroundColor(props)};
  width: auto !important;
  cursor: ${({ $disabled }: BankCardButtonProps) => ($disabled ? "not-allowed" : "pointer")};
  float: left;
`;

const BankCardButtonLabel = styled.div`
  //width: 86px;
  display: inline-block;
  white-space: nowrap;
`;
const BankCardButtonCardNo = styled.div`
  float: right;
`;
const BankCardButtonCardNoHL = styled(BankCardButtonCardNo)`
  font-weight: bold;
`;

const ChannelCode = styled(BankCardButtonCardNoHL)``;

type Props = {
  //TODO: cardList type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardList: any[];
  selectedCardIndex: number;
  handleSelectCardChange: (index: number) => void;
  getTransferLimit: (id: number) => void;
  onhandleManageCardClick: () => void;
};

const BankCardGroup = ({
  cardList,
  selectedCardIndex,
  handleSelectCardChange,
  getTransferLimit,
  onhandleManageCardClick,
}: Props) => {
  const { getChannelCode } = useGetChannelCode();

  return (
    <BankCardGroupContainer>
      {cardList.map((item, index) => {
        const isActive = index === selectedCardIndex;
        const channelCode = getChannelCode(item);
        const disabled = config.features.isShowChannelCode && !channelCode;
        return (
          <BankCardButton
            key={index}
            $active={isActive}
            $disabled={disabled}
            onClick={() => {
              if (disabled) return;
              handleSelectCardChange(index);
              getTransferLimit(item.paymentchannelid);
            }}
          >
            <Icon iconUrl={isActive ? iconCardActive : iconCard} width={"20px"} height={"20px"} />
            {!config.features.isShowChannelCode && (
              <BankCardButtonLabel>{i18n.t("withdrawal.bankCard")}</BankCardButtonLabel>
            )}
            <BankCardButtonCardNoHL>
              {(() => {
                if (
                  item.banktype === "ThirdParty" ||
                  item.banktype === "Coinsph" ||
                  item.banktype === "FPS"
                ) {
                  if (item.detail.phone) {
                    return item.detail.phone.substring(
                      item.detail.phone.length - 4,
                      item.detail.phone.length,
                    );
                  } else if (item.detail.address) {
                    return item.detail.address.substring(
                      item.detail.address.length - 4,
                      item.detail.address.length,
                    );
                  }
                } else if (item.banktype === "Pulsa" || item.banktype === "EWallet") {
                  if (item.detail.phone) {
                    return item.detail.phone.substring(
                      item.detail.phone.length - 4,
                      item.detail.phone.length,
                    );
                  } else if (item.detail.address) {
                    return item.detail.address.substring(
                      item.detail.address.length - 4,
                      item.detail.address.length,
                    );
                  }
                } else {
                  if (item.detail.bankAccount) {
                    return item.detail.bankAccount.substring(
                      item.detail.bankAccount.length - 4,
                      item.detail.bankAccount.length,
                    );
                  } else if (item.detail.address) {
                    return item.detail.address.substring(
                      item.detail.address.length - 4,
                      item.detail.address.length,
                    );
                  }
                }
              })()}
            </BankCardButtonCardNoHL>
            <BankCardButtonCardNo>{i18n.t("withdrawal.tail")}</BankCardButtonCardNo>
            {config.features.isShowChannelCode && <ChannelCode>{channelCode}</ChannelCode>}
          </BankCardButton>
        );
      })}

      <BankCardButton onClick={onhandleManageCardClick} $active={true}>
        <Icon iconUrl={iconManage} width={"20px"} height={"20px"} />

        <Grid>{i18n.t("withdrawal.manageBank")}</Grid>
      </BankCardButton>
    </BankCardGroupContainer>
  );
};

export default BankCardGroup;
