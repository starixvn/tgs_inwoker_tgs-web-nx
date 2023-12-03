import React from "react";
import styled from "styled-components";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import limitBg from "@/assets/t29/images/withdraw/limit-bg.png";

import {
  FormControl as ProfileFormControl,
  ItemContainer as ProfileItemContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import BankCardGroup from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/components/BankCardGroup";
import StepTitle from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/components/StepTitle";
import { media } from "@/theme/breakpoints";
import { MainProps } from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/Main";

const ItemContainer = styled(ProfileItemContainer)`
  ${media.sm} {
    max-width: none;
  }
`;

const FormControl = styled(ProfileFormControl)`
  max-width: 500px;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & input {
    padding: 16px 0 !important;
  }
`;

const LimitPopupContainer = styled.div`
  white-space: nowrap;
  background: url(${limitBg}) no-repeat;
  background-size: contain;
  background-position: center;
  font-size: 0.812rem;
  color: ${({ theme }) => theme.white};
  padding: 10px 24px;
  border-radius: 4px;
  display: inline-block;
  line-height: 25px;
`;

const Turnover = styled.div`
  color: ${({ theme }) => theme.text};
  span {
    margin-left: 5px;
    color: ${({ theme }) => theme.secondary};
    font-weight: bold;
  }
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

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 5px;
`;

const USDTWrapper = styled.div``;

const MainDesktop = ({
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
      {/* Please choose bank */}
      <ItemContainer>
        <StepTitle step={1} title={i18n.t("withdrawal.msgEnterBank")} />

        <SelectionContainer>
          <BankCardGroup
            cardList={cardList}
            selectedCardIndex={selectedCardIndex}
            handleSelectCardChange={handleSelectCardChange}
            getTransferLimit={getTransferLimit}
            onhandleManageCardClick={onhandleManageCardClick}
          />
        </SelectionContainer>
      </ItemContainer>

      {/* Transfer from all sub wallet to main wallet */}
      <ItemContainer>
        {config.features.NewTransferUI && (
          <StepTitle step={2} title={i18n.t("transfer.msgTransferOutFromGP")}>
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
          </StepTitle>
        )}
      </ItemContainer>

      {/* Please enter the withdrawal amount */}
      <ItemContainer>
        <StepTitle
          step={config.features.NewTransferUI ? 3 : 2}
          title={i18n.t("withdrawal.enterAmount")}
        />

        <SelectionContainer>
          <AmountWrapper>
            <FormControl variant="outlined">
              <TextField
                width={250}
                height={38}
                placeholder={i18n.t("withdrawal.enterAmount")}
                onChange={handleAmountChange}
                variant="outlined"
                autoComplete="off"
                value={amount}
                pattern="[0-9]*"
                type={"number"}
                maxLength={12}
              />
            </FormControl>

            <LimitPopupContainer>
              {Common.formatNumberWithThousand(min)} - {Common.formatNumberWithThousand(max)}
            </LimitPopupContainer>
          </AmountWrapper>

          {/* if is USDT, need to show below infomation */}
          {(() => {
            if (cardList[selectedCardIndex] && cardList[selectedCardIndex].banktype === "Usdt") {
              return (
                <USDTWrapper>
                  <StepTitle title={i18n.t("withdrawal.usdtAmount")} />

                  <FormControl variant="outlined">
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={isNaN(amount) === false ? (amount * exchangeRate).toFixed(2) : 0}
                      pattern="[0-9]*"
                      type={"number"}
                      disabled={true}
                    />
                  </FormControl>
                </USDTWrapper>
              );
            }
          })()}
          <Turnover>
            {i18n.t("withdrawal.turnover")}
            <span>{Common.formatNumberWithThousand(minWithdrawLimit)}</span>
          </Turnover>
        </SelectionContainer>
      </ItemContainer>

      <ItemContainer>
        {config.features.Deposit_Withdrawal_PlayerNote &&
          cardList[selectedCardIndex] &&
          (cardList[selectedCardIndex].banktype.toUpperCase() === "BANK" ||
            cardList[selectedCardIndex].banktype.toUpperCase() === "EWALLET" ||
            cardList[selectedCardIndex].banktype.toUpperCase() === "PULSA") && (
            <>
              <StepTitle
                step={config.features.NewTransferUI ? 4 : 3}
                title={i18n.t("withdrawal.playerNote")}
              />

              <SelectionContainer>
                <FormControl variant="outlined">
                  <TextField
                    placeholder={i18n.t("withdrawal.plsEnterPlayerNote")}
                    onChange={handlePlayerNote}
                    variant="outlined"
                    autoComplete="off"
                    value={playerNote}
                    maxLength={50}
                  />
                </FormControl>
              </SelectionContainer>
            </>
          )}
      </ItemContainer>

      <SubmitButton
        disabled={
          isNaN(parseFloat(amount)) ||
          parseFloat(amount) < min ||
          parseFloat(amount) > max ||
          disabled
        }
        onClick={handleWithdrawalClick}
        sx={{
          width: "250px",
        }}
      >
        {i18n.t("common.nextStep")}
      </SubmitButton>
    </>
  );
};

export default MainDesktop;
