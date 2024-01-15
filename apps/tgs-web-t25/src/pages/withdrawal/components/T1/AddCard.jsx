import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { TextField } from "@/components/UI/TextField";
import { Select as CustomSelect } from "@/components/UI/Select";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  SubmitButton,
} from "@/components/styled-component/ProfileForms";
import FormTitle from "@/pages/withdrawal/components/Main/FormTitle";

const disableBankHolderBrand = "MOVN2";
const Container = styled.div`
  width: 100%;
`;

const ButtonGroups = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddCard = ({
  isDeposit,
  eWalletCustom,
  eWalletCustomIDR,
  depositList,
  withdrawalList,
  bankList,
  channelList,
  selectedBankType,
  selectedBankTypeIndex,
  selectedChannelIndex,
  bankName,
  disableBankNameInput,
  bankAccountName,
  disableBankAccountNameInput,
  number,
  handleBankTypeChange,
  handleChannelChange,
  handleBankNameChange,
  handleBankBranchChange,
  handleBankAccountNameChange,
  handleNameChange,
  handlePhoneChange,
  handleNumberChange,
  handleNextClick,
  showBack,
  onhandleBackClick,
  ifsc,
  handleIFSCChange,
}) => {
  const { isDesktopSize } = useRwd();

  const checkWithdrawalBankType = (type) => {
    return withdrawalList.length > 0 && withdrawalList[selectedBankTypeIndex].banktype === type;
  };

  const checkDepositBankType = (type) => {
    return depositList.length > 0 && depositList[selectedBankTypeIndex].banktype === type;
  };

  return (
    <Container>
      {isDesktopSize && <FormTitle title={i18n.t("card.addCard.title")} />}
      {!config.features.AddCard_HideCertainField && (
        <ItemContainer>
          <LabelContainer>{i18n.t("common.withdrawalBankType")}</LabelContainer>
          <FormControl>
            <CustomSelect
              native
              variant="outlined"
              displayEmpty
              value={selectedBankTypeIndex}
              onChange={handleBankTypeChange}
            >
              {isDeposit
                ? depositList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.banktype}
                      </option>
                    );
                  })
                : withdrawalList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {item.banktype}
                      </option>
                    );
                  })}
            </CustomSelect>
          </FormControl>
        </ItemContainer>
      )}
      {!config.features.AddCard_HideChannel && (
        <ItemContainer>
          <LabelContainer>
            {config.features.ChannelNameTranslationTag &&
            ((!isDeposit && checkWithdrawalBankType("Bank")) ||
              (isDeposit && checkDepositBankType("Bank")))
              ? i18n.t(config.features.ChannelNameTranslationTag)
              : config.features.AddCard_Bank_Custom_IDR &&
                ((!isDeposit && checkWithdrawalBankType("Bank")) ||
                  (isDeposit && checkDepositBankType("Bank")))
              ? i18n.t("card.addCard.BankName")
              : i18n.t("common.withdrawalChannel")}
          </LabelContainer>
          <FormControl>
            <CustomSelect
              native
              variant="outlined"
              displayEmpty
              value={selectedChannelIndex}
              onChange={handleChannelChange}
            >
              {isDeposit
                ? depositList.length > 0 &&
                  channelList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {i18n.t(item.channelname)}
                      </option>
                    );
                  })
                : withdrawalList.length > 0 &&
                  channelList.map((item, index) => {
                    return (
                      <option value={index} key={index}>
                        {i18n.t(item.channelname)}
                      </option>
                    );
                  })}
            </CustomSelect>
          </FormControl>
        </ItemContainer>
      )}
      {((!isDeposit &&
        withdrawalList.length > 0 &&
        withdrawalList[selectedBankTypeIndex].banktype === "Bank") ||
        (isDeposit &&
          depositList.length > 0 &&
          depositList[selectedBankTypeIndex].banktype === "Bank")) && (
        <>
          {!(
            config.features.AddCard_HideCertainField || config.features.AddCard_Bank_Custom_IDR
          ) && (
            <>
              {!eWalletCustom &&
                !(config.features.HideBankNameIfFilled && disableBankNameInput) && (
                  <ItemContainer>
                    <LabelContainer>
                      {config.features.AddCard_DisplayFPS
                        ? i18n.t("hk28.card.addCard.BankName")
                        : i18n.t("card.addCard.BankName")}
                    </LabelContainer>
                    {config.features.AddCard_BankDropdown ? (
                      <FormControl>
                        <CustomSelect
                          native
                          variant="outlined"
                          displayEmpty
                          value={bankName}
                          name="bankName"
                          onChange={handleBankNameChange}
                        >
                          <option value="" selected disabled>
                            {config.features.AddCard_DisplayFPS
                              ? i18n.t("hk28.card.addCard.msgEnterBankName")
                              : i18n.t("card.addCard.msgEnterBankName")}
                          </option>
                          {bankList.length > 0 &&
                            bankList.map((item, index) => {
                              return (
                                <option value={item} key={index}>
                                  {item}
                                </option>
                              );
                            })}
                        </CustomSelect>
                      </FormControl>
                    ) : (
                      <FormControl>
                        <TextField
                          placeholder={
                            config.features.AddCard_DisplayFPS
                              ? i18n.t("hk28.card.addCard.msgEnterBankName")
                              : i18n.t("card.addCard.msgEnterBankName")
                          }
                          disabled={disableBankNameInput}
                          value={bankName}
                          name="bankName"
                          onChange={handleBankNameChange}
                        />
                      </FormControl>
                    )}
                  </ItemContainer>
                )}
              {config.features.AddCard_BankBranch && !eWalletCustom && (
                <ItemContainer>
                  <LabelContainer>{i18n.t("card.addCard.branch")}</LabelContainer>
                  <FormControl>
                    <TextField
                      placeholder={i18n.t("card.addCard.branchPlaceHolder")}
                      maxLength={255}
                      name="bankBranch"
                      onChange={handleBankBranchChange}
                    />
                  </FormControl>
                </ItemContainer>
              )}
            </>
          )}
          <ItemContainer>
            <LabelContainer>
              {eWalletCustomIDR
                ? i18n.t("idr1.eWalletAccount")
                : eWalletCustom
                ? i18n.t("card.addCard.eWalletAccount")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("hk28.card.addCard.BankAccountName")
                : i18n.t("card.addCard.BankAccountName")}
            </LabelContainer>
            <FormControl>
              <TextField
                placeholder={
                  eWalletCustomIDR
                    ? i18n.t("idr1.eWalletAccount")
                    : eWalletCustom
                    ? i18n.t("card.addCard.msgEnterEwalletAccount")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                    : i18n.t("card.addCard.msgEnterBankAccountName")
                }
                onChange={handleBankAccountNameChange}
                name="bankAccountName"
                value={bankAccountName}
                disabled={disableBankAccountNameInput}
              />
            </FormControl>
          </ItemContainer>
        </>
      )}
      {((!isDeposit &&
        withdrawalList.length > 0 &&
        withdrawalList[selectedBankTypeIndex].banktype === "EWallet") ||
        (isDeposit &&
          depositList.length > 0 &&
          depositList[selectedBankTypeIndex].banktype === "EWallet")) && (
        <ItemContainer>
          <LabelContainer>
            {eWalletCustomIDR
              ? i18n.t("idr1.eWalletAccount")
              : eWalletCustom
              ? i18n.t("card.addCard.eWalletAccount")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.card.addCard.BankAccountName")
              : i18n.t("card.addCard.BankAccountName")}
          </LabelContainer>
          <FormControl>
            <TextField
              placeholder={
                eWalletCustomIDR
                  ? i18n.t("idr1.eWalletAccount")
                  : eWalletCustom
                  ? i18n.t("card.addCard.msgEnterEwalletAccount")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                  : i18n.t("card.addCard.msgEnterBankAccountName")
              }
              name="bankAccountName"
              onChange={handleBankAccountNameChange}
              value={bankAccountName}
              //for MOVN2 customization
              disabled={
                disableBankHolderBrand === config.brand ? true : disableBankAccountNameInput
              }
            />
          </FormControl>
        </ItemContainer>
      )}
      {((!isDeposit &&
        withdrawalList.length > 0 &&
        withdrawalList[selectedBankTypeIndex].banktype === "EWallet") ||
        (isDeposit &&
          depositList.length > 0 &&
          depositList[selectedBankTypeIndex].banktype === "EWallet")) && (
        <ItemContainer>
          <LabelContainer>
            {eWalletCustomIDR
              ? i18n.t("idr1.eWalletAccount")
              : eWalletCustom
              ? i18n.t("card.addCard.eWalletAccount")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.card.addCard.BankAccountName")
              : i18n.t("card.addCard.BankAccountName")}
          </LabelContainer>
          <FormControl>
            <TextField
              placeholder={
                eWalletCustomIDR
                  ? i18n.t("idr1.eWalletAccount")
                  : eWalletCustom
                  ? i18n.t("card.addCard.msgEnterEwalletAccount")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                  : i18n.t("card.addCard.msgEnterBankAccountName")
              }
              name="bankAccountName"
              onChange={handleBankAccountNameChange}
              value={bankAccountName}
              //for MOVN2 customization
              disabled={
                disableBankHolderBrand === config.brand ? true : disableBankAccountNameInput
              }
            />
          </FormControl>
        </ItemContainer>
      )}
      {(!isDeposit &&
        withdrawalList.length > 0 &&
        (withdrawalList[selectedBankTypeIndex].banktype === "ThirdParty" ||
          withdrawalList[selectedBankTypeIndex].banktype === "Coinsph" ||
          withdrawalList[selectedBankTypeIndex].banktype === "FPS")) ||
      (isDeposit &&
        depositList.length > 0 &&
        (depositList[selectedBankTypeIndex].banktype === "ThirdParty" ||
          depositList[selectedBankTypeIndex].banktype === "Coinsph" ||
          depositList[selectedBankTypeIndex].banktype === "FPS")) ? (
        <>
          <ItemContainer>
            <LabelContainer>
              {config.features.AddCard_InputAddFPS
                ? i18n.t("custom.addcard.name")
                : i18n.t("profile.nameVerify.title")}
            </LabelContainer>
            <FormControl>
              <TextField
                placeholder={
                  config.features.AddCard_InputAddFPS
                    ? i18n.t("custom.addcard.msgPlsEnterName")
                    : i18n.t("profile.nameVerify.msgPlsEnterName")
                }
                onChange={handleNameChange}
                name="name"
              />
            </FormControl>
          </ItemContainer>
          <ItemContainer>
            <LabelContainer>
              {eWalletCustomIDR
                ? i18n.t("idr1.phone")
                : config.features.AddCard_InputAddFPS
                ? i18n.t("custom.addcard.phoneNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("bet28.phoneNumber")
                : i18n.t("common.phoneNumber")}
            </LabelContainer>
            <FormControl>
              <TextField
                placeholder={
                  eWalletCustomIDR
                    ? i18n.t("idr1.phone")
                    : config.features.AddCard_InputAddFPS
                    ? i18n.t("custom.addcard.msgEnterPhone")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("bet28.msgEnterPhone")
                    : i18n.t("common.msgEnterPhone")
                }
                maxLength={config.features.MAX_PHONE_LENGTH || 10}
                name="phone"
                onChange={handlePhoneChange}
              />
            </FormControl>
          </ItemContainer>
        </>
      ) : (
        <>
          <ItemContainer>
            <LabelContainer>
              {eWalletCustomIDR
                ? i18n.t("idr1.phone")
                : eWalletCustom || selectedBankType("Pulsa")
                ? i18n.t("card.addCard.phone")
                : config.features.AddCard_DisplayGCash
                ? i18n.t("piso.withdrawalNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("hk28.withdrawalNumber")
                : i18n.t("common.withdrawalNumber")}
            </LabelContainer>
            <FormControl>
              <TextField
                placeholder={
                  eWalletCustomIDR
                    ? i18n.t("idr1.phone")
                    : eWalletCustom || selectedBankType("Pulsa")
                    ? i18n.t("card.addCard.msgEnterPhone")
                    : config.features.AddCard_DisplayGCash
                    ? i18n.t("piso.msgEnterWithdrawalNumber")
                    : config.features.AddCard_DisplayFPS
                    ? i18n.t("hk28.msgEnterWithdrawalNumber")
                    : i18n.t("common.msgEnterWithdrawalNumber")
                }
                maxLength={
                  selectedBankType("ThirdParty") ||
                  selectedBankType("Coinsph") ||
                  selectedBankType("Pulsa") ||
                  selectedBankType("FPS")
                    ? config.features.MAX_PHONE_LENGTH
                    : 255
                }
                name="number"
                onChange={handleNumberChange}
                value={number}
              />
            </FormControl>
          </ItemContainer>
          {config.currency === "INR" &&
            ((!isDeposit &&
              withdrawalList.length > 0 &&
              withdrawalList[selectedBankTypeIndex].banktype === "Bank") ||
              (isDeposit &&
                depositList.length > 0 &&
                depositList[selectedBankTypeIndex].banktype === "Bank")) && (
              <ItemContainer>
                <LabelContainer>{i18n.t("ifsc")}</LabelContainer>
                <FormControl>
                  <TextField
                    placeholder={i18n.t("ifsc")}
                    onChange={handleIFSCChange}
                    value={ifsc}
                  />
                </FormControl>
              </ItemContainer>
            )}
        </>
      )}
      <ButtonGroups>
        {showBack && (
          <SubmitButton fullWidth onClick={onhandleBackClick}>
            {i18n.t("common.back")}
          </SubmitButton>
        )}

        <SubmitButton fullWidth onClick={handleNextClick}>
          {config.features.Register_CustomFlow_IDR && !isDeposit
            ? i18n.t("web.register.btn")
            : i18n.t("common.nextStep")}
        </SubmitButton>
      </ButtonGroups>
    </Container>
  );
};

export default AddCard;
