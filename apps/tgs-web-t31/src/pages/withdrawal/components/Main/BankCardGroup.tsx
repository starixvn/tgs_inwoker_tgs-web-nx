import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { Grid } from "@mui/material";
import styled from "styled-components";
import iconCard from "@/assets/t31/images/withdraw/icon-card.svg";
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
  border: ${({ $active, theme }) => `1px solid ${$active ? theme.accountLableText : theme.white}`};
  border-radius: 4px;
  font-size: 14px;
  color: ${({ theme }) => theme.white};
  background: ${({ $active, theme }: BankCardButtonProps) =>
    $active ? theme.accountLableText : theme.black30};
  cursor: pointer;
  height: 44px;
`;

const ManageBankButton = styled(BankCardButton)`
  background: ${({ theme }) => theme.primaryGradient};
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  width: 132px;
  height: 44px;
  justify-content: center;
`;

const BankCardButtonLabel = styled.div`
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
            <Icon iconUrl={iconCard} width={"20px"} height={"20px"} />
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

      <ManageBankButton onClick={onhandleManageCardClick} $active={true}>
        <Grid>{i18n.t("withdrawal.manageBank")}</Grid>
      </ManageBankButton>
    </BankCardGroupContainer>
  );
};

export default BankCardGroup;
