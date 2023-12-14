import React from "react";
import { useHistory } from "react-router";
import { Common, i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
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
  ButtonWrapper,
  DetailText,
  GameWalletButton,
  Hint,
  SubHeaderContainer,
  Turnover,
  TurnoverTextWrapper,
} from "@/components/styled-component/WithdrawV2/Main";
import { Select } from "@/components/UI/Select";

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

  return (
    <>
      <WithdrawInfoCard onhandleManageCardClick={onhandleManageCardClick} />

      {/*管理銀行卡*/}
      <ItemContainer>
        <LabelContainer>{i18n.t("withdrawal.msgEnterBank")}</LabelContainer>
        <FormControl variant="outlined">
          <Select
            value={selectedCardIndex}
            native
            onChange={(e) => {
              const index = e.target.value;
              handleSelectCardChange(index);
              // getTransferLimit(cardList[index].paymentchannelid);
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
            type={"number"}
            placeholder={`${
              selectedCardIndex != null
                ? i18n.t("withdrawal.enterAmount") +
                  ` (${Common.formatNumberWithThousand(min)} - ${Common.formatNumberWithThousand(
                    max,
                  )})`
                : i18n.t("withdrawal.enterAmount")
            }`}
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
      <Turnover>
        {i18n.t("withdrawal.turnover")}
        <TurnoverTextWrapper>
          <span>{Common.formatNumberWithThousand(minWithdrawLimit)}</span>
          <DetailText
            onClick={() => {
              history.push("/wagering");
            }}
          >{`(${i18n.t("withdrawal.checkDetails")})`}</DetailText>
        </TurnoverTextWrapper>
      </Turnover>

      <Hint>{i18n.t("withdrawal.notice")}</Hint>

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

export default React.memo(MainMobile);
