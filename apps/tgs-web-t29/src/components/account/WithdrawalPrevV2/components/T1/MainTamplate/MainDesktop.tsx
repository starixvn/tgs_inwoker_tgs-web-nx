import React, { useEffect } from "react";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useHistory } from "react-router";

import { useWageringPage } from "@tgs-web-nx/core/hooks";
import { SubmitButton } from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import BankCardGroup from "@/pages/withdrawal/components/Main/BankCardGroup";
import StepTitle from "@/pages/withdrawal/components/Main/StepTitle";
import { MainProps } from "@/components/account/WithdrawalPrevV2/components/T1/MainTamplate/index";
import {
  AmountWrapper,
  ButtonWrapper,
  FormControl,
  GameWalletButton,
  ItemContainer,
  LimitPopupContainer,
  SelectionContainer,
  Turnover,
  USDTWrapper,
  TurnoverTextWrapper,
  RequireWrapper,
  RequireAmount,
} from "@/components/styled-component/WithdrawV2/Main";

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
  useEffect(() => {
    getTransferLimit(cardList[selectedCardIndex].paymentchannelid);
  }, [cardList, getTransferLimit, selectedCardIndex]);

  useEffect(() => {
    fetchpPlayerBucket();
  }, []);

  const { wageringRequirement, playerBuckets, fetchpPlayerBucket, activeType, setActiveType } =
    useWageringPage();

  const gett18Translation = (type: string) => {
    switch (type) {
      case "LiveDealer":
        return i18n.t("common.live");
      case "Sportsbook":
        return i18n.t("common.sports");
      case "Slot":
        return i18n.t("common.slot");
      case "CardGame":
        return i18n.t("common.chess");
      case "Lottery":
        return i18n.t("common.lottery");
      case "VirtualSports":
        return i18n.t("common.virtualsports");
    }
  };
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
      {config.features.NewTransferUI && (
        <ItemContainer>
          <StepTitle step={2} title={i18n.t("transfer.msgTransferOutFromGP")}>
            <ButtonWrapper>
              <GameWalletButton
                style={{ marginTop: 0, marginLeft: 10 }}
                onClick={() => {
                  performWithdrawFromEveryBrand().then((e: any) => {
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
        </ItemContainer>
      )}

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
                placeholder={i18n.t("withdrawal.enterAmount")}
                onChange={handleAmountChange}
                variant="outlined"
                autoComplete="off"
                value={amount}
                type={"number"}
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
                  <StepTitle
                    title={i18n.t("withdrawal.usdtAmount")}
                    style={{ marginTop: "16px" }}
                  />

                  <FormControl variant="outlined">
                    <TextField
                      variant="outlined"
                      autoComplete="off"
                      value={isNaN(amount) === false ? (amount * exchangeRate).toFixed(2) : 0}
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
            <TurnoverTextWrapper>
              <RequireWrapper>
                <div>Main:</div>
                <RequireAmount> {wageringRequirement}</RequireAmount>
              </RequireWrapper>
              {playerBuckets.map((bucket) => {
                return (
                  <RequireWrapper>
                    <span>{gett18Translation(bucket.key)}:</span>
                    <RequireAmount> {bucket.amount}</RequireAmount>
                  </RequireWrapper>
                );
              })}
            </TurnoverTextWrapper>
          </Turnover>
        </SelectionContainer>
      </ItemContainer>

      {config.features.Deposit_Withdrawal_PlayerNote &&
        cardList[selectedCardIndex] &&
        (cardList[selectedCardIndex].banktype.toUpperCase() === "BANK" ||
          cardList[selectedCardIndex].banktype.toUpperCase() === "EWALLET" ||
          cardList[selectedCardIndex].banktype.toUpperCase() === "PULSA") && (
          <ItemContainer>
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
                />
              </FormControl>
            </SelectionContainer>
          </ItemContainer>
        )}

      <SubmitButton
        disabled={Boolean(
          isNaN(parseFloat(amount)) ||
            parseFloat(amount) < min ||
            parseFloat(amount) > max ||
            disabled,
        )}
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
