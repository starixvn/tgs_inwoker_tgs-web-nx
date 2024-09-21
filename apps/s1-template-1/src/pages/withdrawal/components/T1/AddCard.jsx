import { DarkBlueGradientButton, GreenGradientButton } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { TextField } from "@/components/UI/TextField";
import {
  BadgeContainer,
  FormControl,
  ItemContainer,
  ItemNote,
  ItemNoteDesc,
  ItemNoteText,
  LabelContainer,
  LabelLargeContainer
} from "@/components/styled-component/ProfileForms";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import { MenuItem } from "@mui/material";
import config from "@tgs-web-nx/config";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
`;

const ButtonGroups = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const OptionalText = styled.span`
  color: #6E7E92;
  padding-left: 4px;
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
      {/* {isDesktopSize && <FormTitle title={i18n.t("card.addCard.title")} />} */}
      <LabelLargeContainer>Add New Account</LabelLargeContainer>
      {!config.features.AddCard_HideCertainField && (
        <ItemContainer>
          <LabelContainer>{i18n.t("common.withdrawalBankType")}</LabelContainer>
          <FormControl>
            <BadgeContainer>
            {isDeposit
              ? depositList.map((item, index) => {
                  return (
                    <Badge key={index} text={i18n.t(item.banktype)} isActive={index === selectedBankTypeIndex} handleClick={() =>handleBankTypeChange({}, index)}/>
                  );
                })
              : withdrawalList.map((item, index) => {
                  return (
                    <Badge key={index} text={i18n.t(item.banktype)} isActive={index === selectedBankTypeIndex} handleClick={() => handleBankTypeChange({}, index)}/>
                  );
                })}
            </BadgeContainer>
            {/* <CustomSelect
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
            </CustomSelect> */}
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
            <Select
              variant="outlined"
              displayEmpty
              value={selectedChannelIndex}
              onChange={handleChannelChange}
            >
              {isDeposit
                ? depositList.length > 0 &&
                  channelList.map((item, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {i18n.t(item.channelname)}
                      </MenuItem>
                    );
                  })
                : withdrawalList.length > 0 &&
                  channelList.map((item, index) => {
                    return (
                      <MenuItem value={index} key={index}>
                        {i18n.t(item.channelname)}
                      </MenuItem>
                    );
                  })}
            </Select>
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
                        <Select
                          native
                          variant="outlined"
                          displayEmpty
                          value={bankName}
                          name="bankName"
                          onChange={handleBankNameChange}
                        >
                          <MenuItem value="" selected disabled>
                            {config.features.AddCard_DisplayFPS
                              ? i18n.t("hk28.card.addCard.msgEnterBankName")
                              : i18n.t("card.addCard.msgEnterBankName")}
                          </MenuItem>
                          {bankList.length > 0 &&
                            bankList.map((item, index) => {
                              return (
                                <MenuItem value={item} key={index}>
                                  {item}
                                </MenuItem>
                              );
                            })}
                        </Select>
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
                  <LabelContainer>{i18n.t("card.addCard.branch")}<OptionalText>(optional)</OptionalText></LabelContainer>
                  <FormControl>
                    <TextField
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
            {/* {eWalletCustomIDR
              ? i18n.t("idr1.eWalletAccount")
              : eWalletCustom
              ? i18n.t("card.addCard.eWalletAccount")
              : config.features.AddCard_DisplayFPS
              ? i18n.t("hk28.card.addCard.BankAccountName")
              : i18n.t("card.addCard.BankAccountName")} */}
              Account Holder Name
          </LabelContainer>
          <FormControl>
            <TextField
              placeholder={
                // eWalletCustomIDR
                //   ? i18n.t("idr1.eWalletAccount")
                //   : eWalletCustom
                //   ? i18n.t("card.addCard.msgEnterEwalletAccount")
                //   : config.features.AddCard_DisplayFPS
                //   ? i18n.t("hk28.card.addCard.msgEnterBankAccountName")
                //   : i18n.t("card.addCard.msgEnterBankAccountName")
                "Please enter Bank Account Name"
              }
              name="bankAccountName"
              onChange={handleBankAccountNameChange}
              value={bankAccountName}
              disabled={disableBankAccountNameInput}
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
              {/* {eWalletCustomIDR
                ? i18n.t("idr1.phone")
                : eWalletCustom || selectedBankType("Pulsa")
                ? i18n.t("card.addCard.phone")
                : config.features.AddCard_DisplayGCash
                ? i18n.t("piso.withdrawalNumber")
                : config.features.AddCard_DisplayFPS
                ? i18n.t("hk28.withdrawalNumber")
                : i18n.t("common.withdrawalNumber")} */}
                Bank Card Number
            </LabelContainer>
            <FormControl>
              <TextField
                placeholder={
                  // eWalletCustomIDR
                  //   ? i18n.t("idr1.phone")
                  //   : eWalletCustom || selectedBankType("Pulsa")
                  //   ? i18n.t("card.addCard.msgEnterPhone")
                  //   : config.features.AddCard_DisplayGCash
                  //   ? i18n.t("piso.msgEnterWithdrawalNumber")
                  //   : config.features.AddCard_DisplayFPS
                  //   ? i18n.t("hk28.msgEnterWithdrawalNumber")
                  //   : i18n.t("common.msgEnterWithdrawalNumber")
                  "Please enter Bank Card Number"
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
            <ItemContainer>
              <ItemNote style={{display: "flex"}}><ItemNoteText>Note:</ItemNoteText>
                <ItemNoteDesc style={{textAlign: "left"}}>The account holder name must be the same as the real name filled you account profile</ItemNoteDesc>
              </ItemNote>

            </ItemContainer>
        </>
      )}
      <ButtonGroups>
        {showBack && (
          <DarkBlueGradientButton fullWidth onClick={onhandleBackClick}>
            {i18n.t("common.back")}
          </DarkBlueGradientButton>
        )}

        <GreenGradientButton fullWidth onClick={handleNextClick}>
          {config.features.Register_CustomFlow_IDR && !isDeposit
            ? i18n.t("web.register.btn")
            : i18n.t("common.submit")}
        </GreenGradientButton>
      </ButtonGroups>
    </Container>
  );
};

export default AddCard;
