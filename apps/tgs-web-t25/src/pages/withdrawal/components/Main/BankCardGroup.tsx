import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { Grid } from "@mui/material";
import styled from "styled-components";
import { useShowAddCardButton } from "@tgs-web-nx/core/features";
import iconCard from "@/assets/t25/images/withdraw/icon-card.svg";
import iconCardActive from "@/assets/t25/images/withdraw/icon-card-active.svg";
import iconManage from "@/assets/t25/images/withdraw/icon-manage.svg";
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
  theme: typeof theme;
};
const BankCardButton = styled.div<BankCardButtonProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 11px;
  font-size: 14px;
  color: ${({ $active, theme }: BankCardButtonProps) => ($active ? theme.white : theme.gray50)};
  background: ${({ $active, theme }: BankCardButtonProps) =>
    $active ? theme.blue40 : theme.blue20};
  width: auto !important;
  cursor: pointer;
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

type Props = {
  //TODO: cardList type
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
  return (
    <BankCardGroupContainer>
      {cardList.map((item, index) => {
        const isActive = index === selectedCardIndex;
        return (
          <BankCardButton
            key={index}
            $active={isActive}
            onClick={() => {
              handleSelectCardChange(index);
              getTransferLimit(item.paymentchannelid);
            }}
          >
            <Icon iconUrl={isActive ? iconCardActive : iconCard} width={"20px"} height={"20px"} />
            <BankCardButtonLabel>{i18n.t("withdrawal.bankCard")}</BankCardButtonLabel>
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
