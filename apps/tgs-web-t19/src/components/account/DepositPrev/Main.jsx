import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import config from "@tgs-web-nx/config";
import { Common, i18n } from "@tgs-web-nx/utils";
import "react-lazy-load-image-component/src/effects/blur.css";
import ResultPopupDialog from "@/pages/deposit/components/components/ResultPopupDialog";
import {
  FormControl,
  InfoContainer,
  ItemContainer,
  LabelContainer as ProfileLabelContainer,
  Remark,
  SubmitButton,
  UploadFileButton,
  UploadFileTag,
} from "@/components/styled-component/ProfileForms";
import { Select } from "@/components/UI/Select";
import { TextField } from "@/components/UI/TextField";
import CopyIcon from "@/pages/deposit/components/components/CopyIcon";
import {
  AmountHint,
  ExchangeRateContainer,
  FeeSpot,
  HintText,
  LimitAmount,
  LimitLabel,
  QRCodeImg,
  TransferLabel,
  TransferValue,
  TransferHintAmount
} from "@/components/styled-component/Deposit";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import amountBg from "@/assets/t19/images/amount-bg.png";

const BadgeContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const LabelContainer = styled(ProfileLabelContainer)`
  font-size: 14px;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: left;
`;

const WarningText = styled.div`
  color: ${({ theme }) => theme.red};
`;

const DepositLimitWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const AmountBg = styled.div`
  height: 37px;
`;

const AmountBgIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const TransferHint = styled.div`
  font-weight: bold;
  width: 100%;
  height: 100%;
  padding: 10px 25px;
  position: absolute;
  top: 0;
`;

const LabelWrapper = styled.div`
  display: flex;
`;

class Main extends Component {

  render() {
    const selectedDepositType = this.props.wallet.depositTypeList[this.props.selectedPaymentIndex];
    const selectedPaymentMethod = selectedDepositType.method[this.props.selectedMethodIndex];

    const methodCode = (method) => {
      return selectedPaymentMethod.methodcode.toUpperCase() === method.toUpperCase();
    };

    const alteredPaymentCode = (payment) => {
      return selectedDepositType.alteredpaymentcode
        ? selectedDepositType.alteredpaymentcode.toUpperCase() === payment.toUpperCase()
        : false;
    };

    const paymentCode = (payment) => {
      return selectedDepositType.paymentcode.toUpperCase() === payment.toUpperCase();
    };

    const formatBankCardDetail = (data) => {
      let detail = "";
      switch (data.banktype.toUpperCase()) {
        case "BANK":
          detail = `${data.detail.bankName || ""} - ${data.detail.name || ""} - ${data.detail.bankAccount || ""
            }`;
          break;
        case "EWALLET":
        case "E-WALLET":
          detail = `${data.detail.phone || ""} - ${data.detail.eMoneyName || ""}`;
          break;
        case "PULSA":
          detail = `${data.detail.phone || ""}`;
          break;
        default:
          detail = `${data.detail.bankAccount || data.detail.address || data.detail.phone}`;
          break;
      }
      return detail;
    };
    const channel = selectedPaymentMethod.channel[this.props.selectedChannelIndex];
    const transferFee = channel.fees;
    const transferLimitFrom = channel.transferlimit.from;
    const transferLimitTo = channel.transferlimit.to;
    const channelExtend = channel.extended;

    return (
      <>
        {!config.features.Deposit_AddCard ? (
          <>
            {selectedDepositType.paymentcode === "ZeroNineNinePay" && (
              <ItemContainer>
                <LabelContainer>
                  <HintText>{i18n.t("hint._099")}</HintText>
                </LabelContainer>
              </ItemContainer>
            )}

            {/*1. 请选择支付方式 */}
            <ItemContainer>
              <LabelContainer>{i18n.t("deposit.msgPlsSelectPayment")}</LabelContainer>
              <BadgeContainer>
                {this.props.wallet.depositTypeList.length > 0 &&
                  selectedDepositType.method.map((item, index) => {
                    return (
                      <Badge
                        key={item.methodid}
                        text={
                          config.features.CustomKING8Deposit &&
                            (paymentCode("manual") || alteredPaymentCode("manual")) &&
                            i18n.exists(`king8.${item.methodcode}`)
                            ? i18n.t(`king8.${item.methodcode}`)
                            : i18n.t(item.methodcode)
                        }
                        isActive={index === this.props.selectedMethodIndex}
                        handleClick={() => this.props.handleMethodChange(index)}
                      />
                    );
                  })}
              </BadgeContainer>
            </ItemContainer>
          </>
        ) : (
          //请输入银行名称
          <ItemContainer>
            <LabelContainer>{i18n.t("idr1.pleaseEnterAccountName")}</LabelContainer>
            <FormControl variant="outlined">
              <Select
                native
                id="customSelect"
                value={this.props.selectedBankCard}
                onChange={(e) => this.props.handleBankCardChange(e)}
              >
                <option value="" disabled>
                  {i18n.t("idr1.pleaseEnterAccountName")}
                </option>
                {this.props.bankCardList.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {formatBankCardDetail(item)}
                    </option>
                  );
                })}
              </Select>
            </FormControl>
          </ItemContainer>
        )}

        {/*请选择支付渠道*/}
        {!(config.features.Deposit_HideDepositChannel || config.features.Deposit_AddCard) && (
          <ItemContainer>
            <LabelContainer>{i18n.t("deposit.msgPlsSelectMethod")}</LabelContainer>
            <FormControl variant="outlined">
              <Select
                native
                id="customSelect"
                value={this.props.selectedChannelIndex}
                onChange={(e) => this.props.handleChannelChange(e)}
              >
                {this.props.wallet.depositTypeList.length > 0 &&
                  selectedPaymentMethod.channel.map((item, index) => {
                    return (
                      <option key={index} value={index}>
                        {item.channelname}
                      </option>
                    );
                  })}
              </Select>
            </FormControl>
          </ItemContainer>
        )}

        {/*轉帳賬戶*/}
        {(() => {
          if (config.features.Deposit_AddCard && this.props.selectedBankCard !== "") {
            if (!methodCode("BANKTRANSFER") && !methodCode("EWALLET") && !methodCode("PULSA")) {
              return null;
            }

            return (
              <ItemContainer>
                <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>

                {methodCode("BANKTRANSFER") && (
                  <InfoContainer>
                    <TransferLabel>{i18n.t("deposit.details.bank")}:</TransferLabel>
                    {channel.channelname && (
                      <>
                        <TransferValue>{channel.channelname}</TransferValue>
                        <CopyIcon copyContent={channel.channelname} />
                      </>
                    )}
                  </InfoContainer>
                )}

                {methodCode("BANKTRANSFER") && (
                  <InfoContainer>
                    <TransferLabel>{i18n.t("deposit.accName")}:</TransferLabel>
                    {channelExtend.name && (
                      <>
                        <TransferValue>{channelExtend.name}</TransferValue>
                        <CopyIcon copyContent={channelExtend.name} />
                      </>
                    )}
                  </InfoContainer>
                )}

                {methodCode("BANKTRANSFER") && (
                  <InfoContainer>
                    <TransferLabel>{i18n.t("deposit.cardNum")}:</TransferLabel>
                    {channelExtend.bankAccount && (
                      <>
                        <TransferValue>{channelExtend.bankAccount}</TransferValue>
                        <CopyIcon copyContent={channelExtend.bankAccount} />
                      </>
                    )}
                  </InfoContainer>
                )}
                {(methodCode("EWALLET") || methodCode("PULSA")) && (
                  <InfoContainer>
                    <TransferLabel>{i18n.t("deposit.phone")}:</TransferLabel>
                    {channelExtend.phone && (
                      <>
                        <TransferValue>{channelExtend.phone}</TransferValue>
                        <CopyIcon copyContent={channelExtend.phone} />
                      </>
                    )}
                  </InfoContainer>
                )}
                {methodCode("EWALLET") && (
                  <InfoContainer>
                    <TransferLabel>{i18n.t("deposit.eWalletAccount")}:</TransferLabel>
                    {channelExtend.eMoneyName && (
                      <>
                        <TransferValue>{channelExtend.eMoneyName}</TransferValue>
                        <CopyIcon copyContent={channelExtend.eMoneyName} />
                      </>
                    )}
                  </InfoContainer>
                )}
              </ItemContainer>
            );
          }
        })()}

        {(() => {
          const generateDisplayContent = (content) => {
            const displaysequence = ["name", "address", "bankAccount", "eMoneyName", "phone"];

            return Object.keys(content)
              .sort((a, b) => {
                return displaysequence.indexOf(a) - displaysequence.indexOf(b);
              })
              .map((key, index) => {
                if (content[key] !== "" && content[key]) {
                  if (typeof content[key] === "number") {
                    return null;
                  } else if (content[key].includes("http")) {
                    return (
                      <QRCodeImg
                        key={index}
                        src={content[key]}
                        alt={content[key]}
                        style={{ marginBottom: "10px" }}
                      />
                    );
                  } else {
                    return (
                      <InfoContainer key={index}>
                        <TransferLabel>{i18n.t("extended." + [key])}:</TransferLabel>
                        <TransferValue>{content[key]}</TransferValue>

                        <CopyIcon copyContent={content[key]} />
                      </InfoContainer>
                    );
                  }
                }
              });
          };

          if (
            (paymentCode("manual") ||
              paymentCode("usdt") ||
              alteredPaymentCode("usdt") ||
              alteredPaymentCode("manual")) &&
            !config.features.Deposit_AddCard
          ) {
            if (methodCode("THIRDPARTY")) {
              return (
                <ItemContainer>
                  <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>
                  <QRCodeImg src={channelExtend.qrCode} style={{ marginBottom: "10px" }} />
                </ItemContainer>
              );
            } else {
              return (
                <ItemContainer>
                  <LabelContainer>{i18n.t("deposit.transferAccount")}</LabelContainer>
                  {generateDisplayContent(channelExtend)}
                </ItemContainer>
              );
            }
          }
        })()}

        {(() => {
          if (config.features.Deposit_ManualApplePayHideBankAcc) {
          } else {
            if (paymentCode("MANUAL") || paymentCode("APPLEPAY") || alteredPaymentCode("manual")) {
              return (
                <>
                  {!(
                    config.features.Deposit_RemoveAccount ||
                    methodCode("USDT") ||
                    config.features.Deposit_AddCard
                  ) && (
                      <>
                        {this.props.wallet.bankCardList.length > 1 &&
                          !config.features.Deposit_AccountNameManualInput ? (
                          <ItemContainer>
                            <LabelContainer>
                              {config.features.Deposit_OriginAccount
                                ? i18n.t("idr1.pleaseEnterAccountName")
                                : i18n.t("common.pleaseEnterAccountName")}
                            </LabelContainer>
                            <FormControl variant="outlined">
                              <Select
                                native
                                id="customSelect"
                                value={this.props.selectedBankCard}
                                onChange={(e) => this.props.handleSelectAccountChange(e)}
                              >
                                <option value="" disabled>
                                  {config.features.Deposit_OriginAccount
                                    ? i18n.t("idr1.pleaseEnterAccountName")
                                    : i18n.t("common.pleaseEnterAccountName")}
                                </option>
                                {this.props.wallet.bankCardList.map((item, index) => {
                                  const detail = item.detail;
                                  return (
                                    <option value={item.id} key={index}>
                                      {detail.bankAccount || detail.address || detail.phone} (
                                      {item.banktype})
                                    </option>
                                  );
                                })}
                              </Select>
                            </FormControl>
                          </ItemContainer>
                        ) : (
                          <ItemContainer>
                            <LabelContainer>
                              {config.features.Deposit_OriginAccount ? (
                                i18n.t("idr1.pleaseEnterAccountName")
                              ) : (
                                <>
                                  <div>{i18n.t("common.pleaseEnterAccountName")}</div>
                                  <WarningText>{" *" + i18n.t("mgm.accountDepositTips")}</WarningText>
                                </>
                              )}
                            </LabelContainer>
                            <FormControl variant="outlined">
                              <TextField
                                type={"text"}
                                placeholder={
                                  config.features.Deposit_OriginAccount
                                    ? i18n.t("idr1.pleaseEnterAccountName")
                                    : i18n.t("common.pleaseEnterAccountName")
                                }
                                value={this.props.account}
                                disabled={
                                  !config.features.Deposit_AccountNameManualInput &&
                                  config.features.Deposit_AutofillFirstCard &&
                                  this.props.wallet.bankCardList.length > 1
                                }
                                onChange={(e) => this.props.handleAccountChange(e)}
                              />
                            </FormControl>
                          </ItemContainer>
                        )}
                      </>
                    )}
                  {(!(config.features.Deposit_RemoveName || methodCode("fps")) ||
                    config.features.Deposit_FPSWithName) && (
                      <>
                        {/*请输入银行账户名称*/}
                        <TextField
                          style={{ margin: "20px auto 20px auto" }}
                          type={"text"}
                          placeholder={
                            config.features.Deposit_CustomBankNameTranslation
                              ? i18n.t("mgm.msgPlsEnterAccount")
                              : config.features.Deposit_EnglishName
                                ? i18n.t("bet28.msgEnterBankAccountName")
                                : i18n.t("deposit.msgPlsEnterAccount")
                          }
                          label={
                            (config.features.Deposit_CustomBankNameTranslation
                              ? i18n.t("mgm.msgPlsEnterAccount")
                              : config.features.Deposit_EnglishName
                                ? i18n.t("bet28.BankAccountName")
                                : i18n.t("deposit.msgPlsEnterAccount")) +
                            (config.features.Deposit_AddTips
                              ? " *" + i18n.t("mgm.nameDepositTips")
                              : "")
                          }
                          value={this.props.name}
                          onChange={(e) => this.props.handleNameChange(e)}
                        />
                      </>
                    )}
                </>
              );
            }
          }
        })()}

        {/*請輸入存款金額*/}
        <ItemContainer>
          <LabelWrapper>
            <LabelContainer>{i18n.t("deposit.depositAmount")}</LabelContainer>
            {transferFee === 0 ? null : (
              <FeeSpot>
                {i18n.t("fees.deposit")}: <span>{`${transferFee} %`}</span>
              </FeeSpot>
            )}
          </LabelWrapper>

          <DepositLimitWrapper>
            <FormControl variant="outlined" >
              <TextField
                fullWidth
                value={this.props.amount}
                onChange={this.props.handleAmountChange}
                type={"number"}
                placeholder={
                  i18n.t("deposit.msgPleaseEnter") +
                  Common.formatNumberWithThousand(channel.transferlimit.from) +
                  "-" +
                  Common.formatNumberWithThousand(channel.transferlimit.to) +
                  i18n.t("deposit.dollor")
                }
              />
            </FormControl>
            <AmountHint>
              <AmountBg>
                <AmountBgIcon src={amountBg} alt={"Amount limit"} />
              </AmountBg>
              <TransferHint>
                {`${Common.formatNumberWithThousand(
                  transferLimitFrom,
                )} - ${Common.formatNumberWithThousand(transferLimitTo)}
                  ${i18n.t("deposit.dollor")}`}
              </TransferHint>
            </AmountHint>
          </DepositLimitWrapper>

          <TransferHintAmount>
            {`${Common.formatNumberWithThousand(
              transferLimitFrom,
            )} - ${Common.formatNumberWithThousand(transferLimitTo)}
                  ${i18n.t("deposit.dollor")}`}
          </TransferHintAmount>
        </ItemContainer>

        {paymentCode("umpay") && <Remark>{i18n.t("deposit.ppRemark")}</Remark>}
        {(() => {
          if (methodCode("usdt") && channel.extended.rate !== undefined) {
            const usdtRate = channel.extended.rate;
            if (
              paymentCode("manual") ||
              paymentCode("usdt") ||
              alteredPaymentCode("usdt") ||
              alteredPaymentCode("manual")
            ) {
              return (
                <ExchangeRateContainer>
                  {/*汇率*/}
                  <LimitLabel>
                    {i18n.t("deposit.exchangeRate")} 1 {`${config.currency}`} :{" "}
                  </LimitLabel>
                  <LimitAmount>{` ${usdtRate} `}</LimitAmount>
                  <LimitLabel>USDT</LimitLabel>
                  <div class="clear"></div>
                  {/*上分金额*/}
                  <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
                  {" :  "}
                  <LimitAmount>{` ${isNaN(this.props.amount) === false
                    ? Common.formatNumberWithCommasNoRounding(this.props.amount / usdtRate)
                    : 0
                    }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            }
          }
        })()}
        {(() => {
          if (methodCode("Crypto")) {
            if (paymentCode("leepay")) {
              return (
                <ExchangeRateContainer>
                  <LimitLabel>{i18n.t("deposit.exchangeRate")}: </LimitLabel>
                  <LimitAmount>{` ${this.props.exchangeRate.buyprice}`}</LimitAmount>
                  <LimitLabel style={{ marginLeft: "26px" }}>
                    {i18n.t("deposit.expectedPayment")}
                  </LimitLabel>{" "}
                  <LimitAmount>{` ${isNaN(this.props.amount) === false
                    ? (this.props.amount / this.props.exchangeRate.buyprice).toFixed(2)
                    : 0
                    }`}</LimitAmount>
                </ExchangeRateContainer>
              );
            } else {
              return Object.keys(this.props.exchangeRate).map((key) => {
                return Object.keys(this.props.exchangeRate[key]).map((key2) => {
                  if (key2 !== "HKD") return null;
                  return (
                    <ExchangeRateContainer key={`${key}-${key2}`}>
                      <LimitLabel>{i18n.t("deposit.exchangeRate")}: </LimitLabel>
                      <LimitAmount>{` ${this.props.exchangeRate[key][key2].rate}`}</LimitAmount>
                      <LimitLabel style={{ marginLeft: "26px" }}>
                        {i18n.t("deposit.expectedPayment")}
                      </LimitLabel>{" "}
                      <LimitAmount>{` ${isNaN(this.props.amount) === false
                        ? (this.props.amount / this.props.exchangeRate[key][key2].rate).toFixed(2)
                        : 0
                        }`}</LimitAmount>
                    </ExchangeRateContainer>
                  );
                });
              });
            }
          }
        })()}

        {/*優惠活動*/}
        <ItemContainer>
          <LabelContainer>{i18n.t("deposit.promotion")}</LabelContainer>
          <FormControl variant="outlined">
            <Select
              native
              id="customSelect"
              value={this.props.depositPromotion}
              onChange={(e) => this.props.handlePromotionChange(e)}
            >
              <option value="">{i18n.t("deposit.msgPlsSelectPromotion")}</option>
              {this.props.general.promotionList.items
                .filter(
                  (item) =>
                    [
                      "FirstDeposit",
                      "DailySecondDeposit",
                      "DailyFirstDeposit",
                      "DepositReward",
                      "DepositAccumulateRoulette",
                    ].indexOf(item.promotionType) >= 0 &&
                    (item.promotionType === "DepositReward"
                      ? this.props.amount >= item.campaignDetail.depositMinimumLimit
                      : true),
                )
                .map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
        </ItemContainer>

        {/*上傳憑證*/}
        {(() => {
          if (paymentCode("manual") || alteredPaymentCode("usdt") || alteredPaymentCode("manual")) {
            return (
              <>
                <ItemContainer>
                  <LabelContainer>{i18n.t("deposit.uploadReceipt")}</LabelContainer>

                  <FormControl>
                    <UploadFileButton
                      onClick={() => {
                        document.getElementById("getFile").click();
                      }}
                      variant={"outlined"}
                    >
                      {i18n.t("common.upload")}
                    </UploadFileButton>

                    <input
                      type="file"
                      id="getFile"
                      onChange={this.props.handleFileChange}
                      accept="image/jpg, image/jpeg, image/png, image/tiff"
                      style={{ display: "none" }}
                    />
                    {this.props.files ? (
                      <UploadFileTag>{this.props.files[0].name}</UploadFileTag>
                    ) : (
                      ""
                    )}
                  </FormControl>
                </ItemContainer>
                <Remark>
                  {i18n.t(
                    config.features.Deposit_UploadRequired
                      ? "deposit.msgPlsUploadProof"
                      : "deposit.msgNotMustUploadProof",
                  )}
                </Remark>
              </>
            );
          }
        })()}

        {/*玩家备注*/}
        {config.features.Deposit_Withdrawal_PlayerNote &&
          (methodCode("EWALLET") || methodCode("PULSA") || methodCode("BANKTRANSFER")) && (
            <TextField
              style={{ margin: "20px auto 20px auto" }}
              value={this.props.playerNote}
              onChange={this.props.handlePlayerNoteChange}
              placeholder={i18n.t("deposit.plsEnterPlayerNote")}
            // label={i18n.t("deposit.playerNote")}
            />
          )}

        {/*提交*/}
        <SubmitButton
          onClick={this.props.handleDepositClick}
          variant={"contained"}
          color={"primary"}
          fullWidth
          disabled={(() => {
            const transferlimit = channel.transferlimit;

            return (
              !!this.props.disabled ||
              this.props.amount < transferlimit.from ||
              this.props.amount > transferlimit.to ||
              this.props.amount === "" ||
              (this.props.files === null &&
                config.features.Deposit_UploadRequired &&
                paymentCode("manual"))
            );
          })()}
        >
          {i18n.t("common.submit")}
        </SubmitButton>

        <ResultPopupDialog
          isDialogOpen={this.props.openPopup}
          handleClose={this.props.handleClosePopup}
          handleOpenPopupUrl={this.props.handleOpenPopupUrl}
        />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    wallet: state.wallet,
    general: state.general,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
