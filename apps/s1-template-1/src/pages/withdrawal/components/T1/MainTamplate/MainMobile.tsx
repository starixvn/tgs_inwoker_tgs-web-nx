import {
  FormControl,
  ItemContainer,
  LabelContainer
} from "@/components/styled-component/ProfileForms";
import {
  ButtonWrapper,
  GameWalletButton,
  ManageBankCardButtonContainer,
  SubHeaderContainer
} from "@/components/styled-component/WithdrawV2/Main";
import { GreenGradientButton } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { TextField } from "@/components/UI/TextField";
import ManageBankCardButton from "@/pages/withdrawal/components/ManageBankCardButton";
import { media } from "@/theme/breakpoints";
import MenuItem from "@mui/material/MenuItem";
import config from "@tgs-web-nx/config";
import { useWageringPage } from "@tgs-web-nx/core/hooks";
import { Common, i18n } from "@tgs-web-nx/utils";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { MainProps } from "./index";

const TransferHint = styled.div`
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const BankAccountWrapper = styled.div`
  ${media.sm} {
    display: grid;
    grid-template-columns: 1fr 15rem;
    align-items: flex-end;
    grid-column-gap: 1.2rem;
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
  const history = useHistory();
  const { wageringRequirement, playerBuckets, fetchpPlayerBucket, activeType, setActiveType } =
    useWageringPage();

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
      {/* <WithdrawInfoCard /> */}

      {/*管理銀行卡*/}
      <BankAccountWrapper>
        <ItemContainer style={{marginBottom: "1.6rem"}}>
          <LabelContainer>{i18n.t("card.selectYourBankAccount")}</LabelContainer>
          <FormControl variant="outlined">
            <Select
              value={selectedCardIndex}
              onChange={(e) => {
                const index = e.target.value;
                handleSelectCardChange(index);
                // getTransferLimit(cardList[index].paymentchannelid);
              }}
            >

              {cardList.map((item, index) => {
                return (
                  <MenuItem key={index} value={index} id={`optionValue-${index}`}>
                    {i18n.t(item.banktype)} (
                    {item.detail.address || item.detail.bankAccount || item.detail.phone})
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </ItemContainer>
        <ItemContainer style={{marginBottom: "1.6rem"}}>
          <ManageBankCardButtonContainer>
            <ManageBankCardButton handleManageCardClick={onhandleManageCardClick} />
          </ManageBankCardButtonContainer>
        </ItemContainer>
      </BankAccountWrapper>



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
        <LabelContainer>{i18n.t("withdrawal.amount")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            fullWidth
            value={amount}
            onChange={handleAmountChange}
            type={"text"}
            placeholder={`${Common.formatNumberWithThousand(min)} - ${Common.formatNumberWithThousand(max)}`}
          />
        </FormControl>
        {/* <TransferHint>
          {selectedCardIndex != null &&
            `${Common.formatNumberWithThousand(min)} - ${Common.formatNumberWithThousand(max)}`}
        </TransferHint> */}
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
      {/* <Turnover>
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
      </Turnover> */}

      {/* <Hint>{i18n.t("withdrawal.notice")}</Hint> */}

      <GreenGradientButton
        fullWidth
        disabled={Boolean(
          isNaN(parseFloat(amount.replace(/,/g, ""))) ||
            parseFloat(amount.replace(/,/g, "")) < min ||
            parseFloat(amount.replace(/,/g, "")) > max ||
            !!disabled,
        )}
        onClick={handleWithdrawalClick}
      >
        {i18n.t("common.submit")}
      </GreenGradientButton>
    </>
  );
};

export default React.memo(MainMobile);
