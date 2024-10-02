import Icon from "@/components/project/Icon";
import { theme } from "@/theme";
import { Grid } from "@mui/material";
import { i18n } from "@tgs-web-nx/utils";
import React from "react";
import styled from "styled-components";

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
  border: ${({ theme }) => `1px solid ${theme.white}`};
  border-radius: 8px;
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
            <Icon iconUrl={isActive ? "" : ""} width={"20px"} height={"20px"} />
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
        <Icon iconUrl={""} width={"20px"} height={"20px"} />

        <Grid>{i18n.t("withdrawal.manageBank")}</Grid>
      </BankCardButton>
    </BankCardGroupContainer>
  );
};

export default BankCardGroup;
