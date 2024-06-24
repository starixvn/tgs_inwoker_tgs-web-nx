import React, { useEffect } from "react";
import { Common, i18n } from "@tgs-web-nx/utils";
import { MenuItem } from "@mui/material";
import config, { brandConfig, mapBrandName } from "@tgs-web-nx/config";
import styled from "styled-components";
import { useGetChannelCode, useWageringPage } from "@tgs-web-nx/core/hooks";
import { MainProps } from "./index";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import WithdrawInfoCard from "@/pages/withdrawal/components/WithdrawInfoCard";
import {
  ManageBankCardButtonContainer,
  RequireAmount,
  RequireWrapper,
  Turnover,
  TurnoverTextWrapper,
} from "@/components/styled-component/WithdrawV2/Main";
import ManageBankCardButton from "@/pages/withdrawal/components/ManageBankCardButton";
import { Select } from "@/components/UI/Select";
import {
  ButtonWrapper,
  GameWalletButton,
  SubHeaderContainer,
  Hint,
  CurrencyHint,
} from "@/components/styled-component/WithdrawV2/Main";

const TransferHint = styled.div`
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
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
  const { wageringRequirement, playerBuckets, fetchpPlayerBucket, activeType, setActiveType } =
    useWageringPage();

  const { getChannelCode } = useGetChannelCode();

  const currencyRate = brandConfig[mapBrandName(config.brand)].currencyRate;
  useEffect(() => {
    fetchpPlayerBucket();
  }, []);

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
      <WithdrawInfoCard />

      <ManageBankCardButtonContainer>
        <ManageBankCardButton handleManageCardClick={onhandleManageCardClick} />
      </ManageBankCardButtonContainer>

      {/*管理銀行卡*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("withdrawal.msgEnterBank")}</LabelContainer>
        <FormControl variant="outlined">
          <Select
            value={selectedCardIndex}
            onChange={(e) => {
              const index = e.target.value;
              handleSelectCardChange(index);
              // getTransferLimit(cardList[index].paymentchannelid);
            }}
          >
            <MenuItem disabled value="">
              {i18n.t("withdrawal.msgEnterBank")}
            </MenuItem>
            {cardList.map((item, index) => {
              const channelCode = getChannelCode(item) === null ? "" : getChannelCode(item);
              return (
                <MenuItem
                  key={index}
                  value={index}
                  id={`optionValue-${index}`}
                  disabled={!channelCode}
                >
                  {config.features.isShowChannelCode
                    ? `${channelCode} - (${
                        item.detail.address || item.detail.bankAccount || item.detail.phone
                      })`
                    : `${item.banktype} (${
                        item.detail.address || item.detail.bankAccount || item.detail.phone
                      })`}
                </MenuItem>
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
            type="tel"
            placeholder={i18n.t("withdrawal.enterAmount")}
          />
        </FormControl>
        <TransferHint>
          {selectedCardIndex != null &&
            `${Common.formatNumberWithThousand(min)} - ${Common.formatNumberWithThousand(max)}`}
        </TransferHint>
        {!!currencyRate && (
          <CurrencyHint>
            {!isNaN(amount) ? `${Common.formatCurrency(amount * currencyRate)}` : "0"}{" "}
            {config.currency}
          </CurrencyHint>
        )}
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
      <Turnover>
        {i18n.t("withdrawal.turnover")}
        <TurnoverTextWrapper>
          <RequireWrapper>
            <span>Main:</span>
            <RequireAmount> {wageringRequirement}</RequireAmount>
          </RequireWrapper>
          {playerBuckets.map((bucket) => {
            return (
              <RequireWrapper key={bucket.key}>
                <span>{gett18Translation(bucket.key)}:</span>
                <RequireAmount> {bucket.amount}</RequireAmount>
              </RequireWrapper>
            );
          })}
        </TurnoverTextWrapper>
      </Turnover>

      <Hint>{i18n.t("withdrawal.notice")}</Hint>

      <SubmitButton
        fullWidth
        disabled={
          Boolean(isNaN(parseFloat(amount)) || disabled) ||
          Common.validateDepositAndWithdrawAmount(amount, max, min)
        }
        onClick={handleWithdrawalClick}
      >
        {i18n.t("common.nextStep")}
      </SubmitButton>
    </>
  );
};

export default React.memo(MainMobile);
