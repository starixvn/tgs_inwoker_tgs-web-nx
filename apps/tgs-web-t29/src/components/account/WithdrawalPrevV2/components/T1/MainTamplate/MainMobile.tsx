import React from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import WithdrawInfoCard from "@/pages/withdrawal/components/WithdrawInfoCard";
import { ManageBankCardButtonContainer } from "@/components/styled-component/Withdraw";
import ManageBankCardButton from "@/pages/withdrawal/components/ManageBankCardButton";
import { Select } from "@/components/UI/Select";
import { MainProps } from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/Main";

const SubHeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  margin: 0 0 0 0;
  display: flex;
`;

const GameWalletButton = styled.div`
  font-size: 12px;
  background: ${({ theme }) => {
    return theme.primary;
  }};
  width: fit-content;

  text-align: center;
  padding: 5px;

  margin: 8px 5px 0 0;
  color: #fff;

  min-width: 79px;
  height: 28px;
  border-radius: 5px;
  border: solid 1px #ffffff;

  &:hover {
    cursor: pointer;
    background-blend-mode: screen, normal;
    ${(props) =>
      props.disabled
        ? "   background-image: linear-gradient(to top, #797979, #c3c3c3);"
        : " box-shadow: inset 1px 1px 9px 0  rgba(255, 255, 255, 0.75);"}
  }
`;

const MainMobile = ({
  amount,
  playerNote,
  min,
  max,
  disabled,
  exchangeRate,
  cardList,
  minWithdrawLimit,
  selectedCardIndex,
  handleSelectCardChange,
  getTransferLimit,
  onhandleManageCardClick,
  performWithdrawFromEveryBrand,
  onhandleRefreshClick,
  handleAmountChange,
  handlePlayerNote,
  handleWithdrawalClick,
}: MainProps) => {
  return (
    <>
      <WithdrawInfoCard />
      <ManageBankCardButtonContainer>
        <ManageBankCardButton handleManageCardClick={onhandleManageCardClick} />
      </ManageBankCardButtonContainer>

      {/*管理銀行卡*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("withdrawal.msgEnterBank")}</LabelContainer>
        <FormControl variant="outlined">
          <Select
            value={cardList[selectedCardIndex]}
            native
            onChange={(e) => {
              const index = e.target.value;
              handleSelectCardChange(index);
              getTransferLimit(cardList[index].paymentchannelid);
            }}
          >
            <option disabled value="">
              {i18n.t("withdrawal.msgEnterBank")}
            </option>
            {cardList.map((item, index) => {
              return (
                <option key={index} value={index} id={`optionValue-${index}`}>
                  {item.banktype} (
                  {item.detail.address || item.detail.bankAccount || item.detail.phone})
                </option>
              );
            })}
          </Select>
        </FormControl>
      </ItemContainer>

      {config.features.NewTransferUI && (
        <SubHeaderContainer>
          <LabelContainer>{i18n.t("transfer.msgTransferOutFromGP")}</LabelContainer>

          <ButtonWrapper>
            <GameWalletButton
              style={{ marginTop: 0, marginLeft: 10 }}
              onClick={() => {
                performWithdrawFromEveryBrand().then((e) => {
                  if (e.IsSuccess) {
                    onhandleRefreshClick();
                  }
                });
              }}
            >
              {i18n.t("transfer.oneKeyTransferAll")}
            </GameWalletButton>
          </ButtonWrapper>
        </SubHeaderContainer>
      )}

      {/*請輸入提款金額*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("common.amount")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            type={"number"}
            placeholder={
              selectedCardIndex != null
                ? i18n.t("withdrawal.enterAmount") +
                  ` (${Common.formatNumberWithThousand(min)} - ${Common.formatNumberWithThousand(
                    max,
                  )})`
                : i18n.t("withdrawal.enterAmount")
            }
          />
        </FormControl>
      </ItemContainer>

      {/*玩家備註*/}
      {config.features.Deposit_Withdrawal_PlayerNote &&
        cardList[selectedCardIndex] &&
        (cardList[selectedCardIndex].banktype.toUpperCase() === "BANK" ||
          cardList[selectedCardIndex].banktype.toUpperCase() === "EWALLET" ||
          cardList[selectedCardIndex].banktype.toUpperCase() === "PULSA") && (
          <ItemContainer>
            <LabelContainer>{i18n.t("withdrawal.playerNote")}</LabelContainer>
            <FormControl>
              <TextField
                value={playerNote}
                onChange={handlePlayerNote}
                placeholder={i18n.t("withdrawal.plsEnterPlayerNote")}
              />
            </FormControl>
          </ItemContainer>
        )}

      <SubmitButton
        fullWidth
        disabled={Boolean(
          isNaN(parseFloat(amount)) ||
            parseFloat(amount) < min ||
            parseFloat(amount) > max ||
            !!disabled,
        )}
        onClick={handleWithdrawalClick}
      >
        {i18n.t("common.nextStep")}
      </SubmitButton>
    </>
  );
};

export default MainMobile;
