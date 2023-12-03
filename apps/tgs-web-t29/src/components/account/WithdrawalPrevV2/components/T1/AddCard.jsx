import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import config from "@tgs-web-nx/config";
import { TextField as CustomTextField } from "@/components/UI/TextField";
import { Button } from "@/components/UI/Button";
import { Select as CustomSelect } from "@/components/UI/Select";
import { FormControl } from "@/components/styled-component/ProfileForms";

const Container = styled.div`
  width: 100%;
`;

const TextFieldLabel = styled.div`
  font-size: 16px;
  text-align: center;
  color: #818181;
  margin: 10px 0 0 0;
`;
const TextFieldContainer = styled.div`
  margin: 0 auto;
  display: table;
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
  var checkWithdrawalBankType = (type) => {
    return withdrawalList.length > 0 && withdrawalList[selectedBankTypeIndex].banktype === type;
  };

  var checkDepositBankType = (type) => {
    return depositList.length > 0 && depositList[selectedBankTypeIndex].banktype === type;
  };
  return (
    <Container>
      {!config.features.AddCard_HideCertainField && (
        <>
          <TextFieldLabel>{i18n.t("common.withdrawalBankType")}</TextFieldLabel>
          <TextFieldContainer>
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
          </TextFieldContainer>
        </>
      )}

      {!config.features.AddCard_HideChannel && (
        <>
          <TextFieldLabel>
            {config.features.ChannelNameTranslationTag &&
            ((!isDeposit && checkWithdrawalBankType("Bank")) ||
              (isDeposit && checkDepositBankType("Bank")))
              ? i18n.t(config.features.ChannelNameTranslationTag)
              : config.features.AddCard_Bank_Custom_IDR &&
                ((!isDeposit && checkWithdrawalBankType("Bank")) ||
                  (isDeposit && checkDepositBankType("Bank")))
              ? i18n.t("card.addCard.BankName")
              : i18n.t("common.withdrawalChannel")}
          </TextFieldLabel>
          <TextFieldContainer>
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
          </TextFieldContainer>
        </>
      )}
      {(() => {
        if (
          (!isDeposit &&
            withdrawalList.length > 0 &&
            withdrawalList[selectedBankTypeIndex].banktype === "Bank") ||
          (isDeposit &&
            depositList.length > 0 &&
            depositList[selectedBankTypeIndex].banktype === "Bank")
        ) {
          return (
            <>
              {!(
                config.features.AddCard_HideCertainField || config.features.AddCard_Bank_Custom_IDR
              ) && (
                <>
                  {!eWalletCustom &&
                    !(config.features.HideBankNameIfFilled && disableBankNameInput) && (
                      <>
                        <TextFieldLabel>
                          {config.features.AddCard_DisplayFPS
                            ? i18n.t("hk28.card.addCard.BankName")
                            : i18n.t("card.addCard.BankName")}
                        </TextFieldLabel>
                        <TextFieldContainer>
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
                            <CustomTextField
                              placeholder={
                                config.features.AddCard_DisplayFPS
                                  ? i18n.t("hk28.card.addCard.msgEnterBankName")
                                  : i18n.t("card.addCard.msgEnterBankName")
                              }
                              disabled={disableBankNameInput}
                              value={bankName}
                              name="bankName"
                              onChange={handleBankNameChange}
                            ></CustomTextField>
                          )}
                        </TextFieldContainer>
                      </>
                    )}
                  {(() => {
                    if (config.features.AddCard_BankBranch && !eWalletCustom) {
                      return (
                        <React.Fragment>
                          <TextFieldLabel>{i18n.t("card.addCard.branch")}</TextFieldLabel>
                          <TextFieldContainer>
                            <CustomTextField
                              placeholder={i18n.t("card.addCard.branchPlaceHolder")}
                              maxLength={255}
                              name="bankBranch"
                              onChange={handleBankBranchChange}
                            ></CustomTextField>
                          </TextFieldContainer>
                        </React.Fragment>
                      );
                    }
                  })()}
                </>
              )}

              <TextFieldLabel>
                {eWalletCustomIDR
                  ? i18n.t("idr1.eWalletAccount")
                  : eWalletCustom
                  ? i18n.t("card.addCard.eWalletAccount")
                  : config.features.AddCard_DisplayFPS
                  ? i18n.t("hk28.card.addCard.BankAccountName")
                  : i18n.t("card.addCard.BankAccountName")}
              </TextFieldLabel>
              <TextFieldContainer>
                <CustomTextField
                  marginTop={10}
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
                ></CustomTextField>
              </TextFieldContainer>
            </>
          );
        } else {
          return null;
        }
      })()}
      {((!isDeposit &&
        withdrawalList.length > 0 &&
        withdrawalList[selectedBankTypeIndex].banktype === "EWallet") ||
        (isDeposit &&
          depositList.length > 0 &&
          depositList[selectedBankTypeIndex].banktype === "EWallet")) && (
        <React.Fragment>
          <TextFieldLabel>
            {eWalletCustomIDR
              ? i18n.t("idr1.eWalletAccount")
              : eWalletCustom
              ? i18n.t("card.addCard.eWalletAccount")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.card.addCard.BankAccountName")
              : i18n.t("card.addCard.BankAccountName")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
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
              disabled={disableBankAccountNameInput}
            ></CustomTextField>
          </TextFieldContainer>
        </React.Fragment>
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
        <div>
          <TextFieldLabel>
            {config.features.AddCard_InputAddFPS
              ? i18n.t("custom.addcard.name")
              : i18n.t("profile.nameVerify.title")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
              placeholder={
                config.features.AddCard_InputAddFPS
                  ? i18n.t("custom.addcard.msgPlsEnterName")
                  : i18n.t("profile.nameVerify.msgPlsEnterName")
              }
              onChange={handleNameChange}
              name="name"
            ></CustomTextField>
          </TextFieldContainer>
          <TextFieldLabel>
            {eWalletCustomIDR
              ? i18n.t("idr1.phone")
              : config.features.AddCard_InputAddFPS
              ? i18n.t("custom.addcard.phoneNumber")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("bet28.phoneNumber")
              : i18n.t("common.phoneNumber")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
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
            ></CustomTextField>
          </TextFieldContainer>
        </div>
      ) : (
        <div>
          <TextFieldLabel>
            {eWalletCustomIDR
              ? i18n.t("idr1.phone")
              : eWalletCustom || selectedBankType("Pulsa")
              ? i18n.t("card.addCard.phone")
              : config.features.AddCard_DisplayGCash
              ? i18n.t("piso.withdrawalNumber")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.withdrawalNumber")
              : i18n.t("common.withdrawalNumber")}
          </TextFieldLabel>
          <TextFieldContainer>
            <CustomTextField
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
            ></CustomTextField>
          </TextFieldContainer>
          {config.currency === "INR" &&
            ((!isDeposit &&
              withdrawalList.length > 0 &&
              withdrawalList[selectedBankTypeIndex].banktype === "Bank") ||
              (isDeposit &&
                depositList.length > 0 &&
                depositList[selectedBankTypeIndex].banktype === "Bank")) && (
              <>
                <TextFieldLabel>{i18n.t("ifsc")}</TextFieldLabel>
                <TextFieldContainer>
                  <CustomTextField
                    placeholder={i18n.t("ifsc")}
                    maxLength={11}
                    onChange={handleIFSCChange}
                    value={ifsc}
                  ></CustomTextField>
                </TextFieldContainer>
              </>
            )}
        </div>
      )}

      <TextFieldContainer>
        {(() => {
          if (showBack === true) {
            return <Button onClick={onhandleBackClick}>{i18n.t("common.back")}</Button>;
          } else {
            return null;
          }
        })()}

        <Button width={255} onClick={handleNextClick}>
          {config.features.Register_CustomFlow_IDR && !isDeposit
            ? i18n.t("web.register.btn")
            : i18n.t("common.nextStep")}
        </Button>
      </TextFieldContainer>
    </Container>
  );
};

export default AddCard;
