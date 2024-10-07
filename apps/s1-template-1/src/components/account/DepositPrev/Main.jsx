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
} from "@/components/styled-component/Deposit";
import {
  AccountInfoWrapper,
  BadgeContainer,
  FormControl,
  InfoContainer,
  ItemContainer,
  LabelContainer as ProfileLabelContainer,
  Remark,
  UploadFileButton,
  UploadFileTag
} from "@/components/styled-component/ProfileForms";
import { GreenGradientButton } from "@/components/UI/Button";
import { Select } from "@/components/UI/Select";
import { TextField } from "@/components/UI/TextField";
import CopyIconStyled from "@/pages/deposit/components/components/CopyIcon";
import Badge from "@/pages/deposit/components/components/PaymentTabsHeader/Badge";
import ResultPopupDialog from "@/pages/deposit/components/components/ResultPopupDialog";
import { MenuItem } from "@mui/material";
import config from "@tgs-web-nx/config";
import { media } from "@tgs-web-nx/constants";
import { Common, i18n } from "@tgs-web-nx/utils";
import { Component } from "react";
import "react-lazy-load-image-component/src/effects/blur.css";
import { connect } from "react-redux";
import styled from "styled-components";


const LabelContainer = styled(ProfileLabelContainer)`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 16px;
  letter-spacing: 0.28px;
  text-align: left;
  margin-bottom: 0.8rem;
`;

const LabelLargeContainer = styled(LabelContainer)`
  font-size: 1.6rem;
  float: unset;
  letter-spacing: 0.32px;
  margin-bottom: 1.2rem;
`;

const TransferHint = styled.div`
  font-weight: bold;
`;

const QRCodeBounding = styled.div`
  border-radius: 1rem;
  background-color: #fff;
  display: flex;
  align-items: center;
  width: 9rem;
  height: 9rem;
  justify-content: center;
  margin-right: 1.2rem;
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: -1rem;
`;

const ChannelExtend = styled.div`
  display: block;
  width: calc(100% - 9rem);
  ${media.sm} {
   width: unset;
  }
   .icon-copy {
    ${media.sm} {
      position: relative;
      right: unset;
      bottom: -6px;
     }

   }
`;

const ChannelExtendTitle = styled(LabelLargeContainer)`
  margin-bottom: -.2rem;
`;

const CopyIconCustomize = styled(CopyIconStyled)`
  ${media.sm} {
    position: relative;
    right: unset;
    bottom: unset;
  }

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

    const bankInfoTrans = () => {
      const method = selectedPaymentMethod.methodcode.toUpperCase();
      switch (method) {
        case "EWALLET":
          return i18n.t("deposit.yourEWalletAccountInfo")
        default:
          return i18n.t("deposit.yourbankaccountinfo")
      }
    }

    const bankInfoNameTrans = () => {
      const method = selectedPaymentMethod.methodcode.toUpperCase();
      switch (method) {
        case "EWALLET":
          return i18n.t("deposit.eWalletAccount")
        default:
          return i18n.t("deposit.accName")
      }
    }

    const bankInfoNameMsgTrans = () => {
      const method = selectedPaymentMethod.methodcode.toUpperCase();
      switch (method) {
        case "EWALLET":
          return i18n.t("deposit.msgEWalletAccountName")
        default:
          return i18n.t("deposit.msgAccName")
      }
    }

    const bankInfoNumberTrans = () => {
      const method = selectedPaymentMethod.methodcode.toUpperCase();
      switch (method) {
        case "EWALLET":
          return i18n.t("deposit.eWalletAccountNumber")
        default:
          return i18n.t("deposit.cardNum")
      }
    }

    const bankInfoNumberMsgTrans = () => {
      const method = selectedPaymentMethod.methodcode.toUpperCase();
      switch (method) {
        case "EWALLET":
          return i18n.t("deposit.msgEWalletAccountNumber")
        default:
          return i18n.t("deposit.msgAccNum")
      }
    }

    const formatBankCardDetail = (data) => {
      let detail = "";
      switch (data.banktype.toUpperCase()) {
        case "BANK":
          detail = `${data.detail.bankName || ""} - ${data.detail.name || ""} - ${
            data.detail.bankAccount || ""
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
              <LabelLargeContainer>{i18n.t("payment.method")}</LabelLargeContainer>
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
                id="customSelect"
                value={this.props.selectedBankCard}
                onChange={(e) => this.props.handleBankCardChange(e)}
              >
                {/* <option value="" disabled>
                  {i18n.t("idr1.pleaseEnterAccountName")}
                </option> */}
                {this.props.bankCardList.map((item, index) => {
                  return (
                    <MenuItem value={item.id} key={index}>
                      {formatBankCardDetail(item)}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </ItemContainer>
        )}

        {/*请选择支付渠道*/}
        {!(config.features.Deposit_HideDepositChannel || config.features.Deposit_AddCard) && (
          <ItemContainer>
            <LabelLargeContainer>{i18n.t("deposit.depositTunnel")}</LabelLargeContainer>
            <FormControl variant="outlined">
              <Select
                id="customSelect"
                value={this.props.selectedChannelIndex}
                onChange={(e) => this.props.handleChannelChange(e)}
              >
                {this.props.wallet.depositTypeList.length > 0 &&
                  selectedPaymentMethod.channel.map((item, index) => {
                    return (
                      <MenuItem key={index} value={index}>
                        {item.channelname}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </ItemContainer>
        )}

        {/*轉帳賬戶*/}


        {(() => {
          const generateDisplayContent = (content) => {
            const displaysequence = ["name", "address", "bankAccount", "eMoneyName", "phone"];
            const logo = Object.keys(content).find(key => content[key].includes("http"));
            if(logo) {
              return (
                <>
                <QRCodeBounding>
                  <QRCodeImg
                    src={content[logo]}
                    alt={content[logo]}
                    style={{ marginBottom: "10px" }}
                  />
                </QRCodeBounding>
                 <ChannelExtend>
                  <ChannelExtendTitle>{i18n.t("transfer.transferTo")}</ChannelExtendTitle>
                  {Object.keys(content)
                    .sort((a, b) => {
                      return displaysequence.indexOf(a) - displaysequence.indexOf(b);
                    })
                    .map((key, index) => {
                      if (content[key] !== "" && content[key]) {
                        if (typeof content[key] === "number") {
                          return null;
                        } else if(!content[key].includes("http")) {
                          return (
                            <InfoContainer key={index}>
                              <TransferLabel>{i18n.t("extended." + [key])}:</TransferLabel>
                              <TransferValue>{content[key]}</TransferValue>
                              <CopyIconCustomize copyContent={content[key]} className="icon-copy" />
                            </InfoContainer>
                          )
                        }
                      }
                    })}
                 </ChannelExtend>

                 </>
              )
            }
            else {
              return (
                <ChannelExtend>
                  <ChannelExtendTitle>{Object.keys(content).length > 0 ? i18n.t("transfer.transferTo") : ""}</ChannelExtendTitle>
                  {Object.keys(content)
                  .sort((a, b) => {
                    return displaysequence.indexOf(a) - displaysequence.indexOf(b);
                  })
                  .map((key, index) => {
                    if (content[key] !== "" && content[key]) {
                      if (typeof content[key] === "number") {
                        return null;
                      } else {
                        return (
                          <InfoContainer key={index}>
                            <TransferLabel>{i18n.t("extended." + [key])}:</TransferLabel>
                            <TransferValue>{content[key]}</TransferValue>
                            <CopyIconCustomize copyContent={content[key]} />
                          </InfoContainer>
                        );
                      }
                    }
                  })}
                </ChannelExtend>
              )
              
            }


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
                  <QRCodeImg src={channelExtend.qrCode} style={{ marginBottom: "10px" }} />
                </ItemContainer>
              );
            } else {
              return (
                <ItemContainer>                 
                  <AccountInfo>{generateDisplayContent(channelExtend)}</AccountInfo>
                </ItemContainer>
              );
            }
          }
        })()}

        {(() => {
          if (config.features.Deposit_ManualApplePayHideBankAcc) {
            //empty
          } else {
            if (paymentCode("MANUAL") || paymentCode("APPLEPAY") || alteredPaymentCode("manual") || paymentCode("LNWPAY")) {
              return (
                <>
                  {!(
                    config.features.Deposit_RemoveAccount ||
                    methodCode("USDT") ||
                    config.features.Deposit_AddCard
                  ) && (
                    <>
                          <LabelLargeContainer style={{ paddingTop: "1.2rem" }}>
                            {bankInfoTrans()}
                          </LabelLargeContainer>
                          <AccountInfoWrapper>
                          <ItemContainer>
                            <LabelContainer>
                              {bankInfoNameTrans()}
                            </LabelContainer>
                            <FormControl variant="outlined">
                              <TextField
                                type={"text"}
                                placeholder={
                                  bankInfoNameMsgTrans()
                                }
                                value={this.props.name}
                                // disabled={
                                //   !config.features.Deposit_AccountNameManualInput &&
                                //   config.features.Deposit_AutofillFirstCard &&
                                //   this.props.wallet.bankCardList.length > 1
                                // }
                                onChange={(e) => this.props.handleNameChange(e)}
                              />
                            </FormControl>
                          </ItemContainer>
                          <ItemContainer>
                            <LabelContainer>{bankInfoNumberTrans()}</LabelContainer>
                            <FormControl variant="outlined">
                              <TextField
                                type={"text"}
                                placeholder={bankInfoNumberMsgTrans()}
                                value={this.props.account}
                                // disabled={
                                //   !config.features.Deposit_AccountNameManualInput &&
                                //   config.features.Deposit_AutofillFirstCard &&
                                //   this.props.wallet.bankCardList.length > 1
                                // }
                                onChange={(e) => this.props.handleAccountChange(e)}
                              />
                            </FormControl>
                          </ItemContainer>
                          </AccountInfoWrapper>
                        </>
                    // <>
                    //   {this.props.wallet.bankCardList.length > 1 &&
                    //   !config.features.Deposit_AccountNameManualInput ? (
                    //     <ItemContainer>
                    //       <LabelContainer>
                    //         {config.features.Deposit_OriginAccount
                    //           ? i18n.t("idr1.pleaseEnterAccountName")
                    //           : i18n.t("common.pleaseEnterAccountName")}
                    //       </LabelContainer>
                    //       <FormControl variant="outlined">
                    //         <Select
                    //           id="customSelect"
                    //           value={this.props.selectedBankCard}
                    //           onChange={(e) => this.props.handleSelectAccountChange(e)}
                    //         >
                    //           {this.props.wallet.bankCardList.map((item, index) => {
                    //             const detail = item.detail;
                    //             return (
                    //               <MenuItem value={item.id} key={index}>
                    //                 {detail.bankAccount || detail.address || detail.phone} (
                    //                 {item.banktype})
                    //               </MenuItem>
                    //             );
                    //           })}
                    //         </Select>
                    //       </FormControl>
                    //     </ItemContainer>
                    //   ) :
                    //   (
                    //     <>
                    //       <LabelLargeContainer style={{ paddingTop: "1.2rem" }}>
                    //         {i18n.t("deposit.yourbankaccountinfo")}
                    //       </LabelLargeContainer>
                    //       <AccountInfoWrapper>
                    //       <ItemContainer>
                    //         <LabelContainer>
                    //           Account Holder Name
                    //         </LabelContainer>
                    //         <FormControl variant="outlined">
                    //           <TextField
                    //             type={"text"}
                    //             placeholder={
                    //               "Please enter the bank account name"
                    //             }
                    //             value={this.props.account}
                    //             disabled={
                    //               !config.features.Deposit_AccountNameManualInput &&
                    //               config.features.Deposit_AutofillFirstCard &&
                    //               this.props.wallet.bankCardList.length > 1
                    //             }
                    //             onChange={(e) => this.props.handleAccountChange(e)}
                    //           />
                    //         </FormControl>
                    //       </ItemContainer>
                    //       <ItemContainer>
                    //         <LabelContainer>{i18n.t("deposit.cardNum")}</LabelContainer>
                    //         <FormControl variant="outlined">
                    //           <TextField
                    //             type={"text"}
                    //             placeholder={i18n.t("deposit.msgPlsEnterBankAccount")}
                    //             value={this.props.account}
                    //             disabled={
                    //               !config.features.Deposit_AccountNameManualInput &&
                    //               config.features.Deposit_AutofillFirstCard &&
                    //               this.props.wallet.bankCardList.length > 1
                    //             }
                    //             onChange={(e) => this.props.handleAccountChange(e)}
                    //           />
                    //         </FormControl>
                    //       </ItemContainer>
                    //       </AccountInfoWrapper>
                    //     </>
                    //   )}
                    // </>
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
          <LabelLargeContainer>{i18n.t("deposit.depositAmount")}</LabelLargeContainer>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              value={this.props.amount}
              onChange={this.props.handleAmountChange}
              type={"text"}
              placeholder={`${Common.formatNumberWithThousand(
                transferLimitFrom,
              )} - ${Common.formatNumberWithThousand(transferLimitTo)}`}
            />
          </FormControl>

          {transferFee === 0 ? null : 
            <AmountHint>
              <FeeSpot>
                {i18n.t("fees.deposit")}: <span>{`${transferFee} %`}</span>
              </FeeSpot>
          </AmountHint>}
          
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
                    {i18n.t("deposit.exchangeRate")} 1 {`${import.meta.env.VITE_CURRENCY}`} :{" "}
                  </LimitLabel>
                  <LimitAmount>{` ${usdtRate} `}</LimitAmount>
                  <LimitLabel>USDT</LimitLabel>
                  <div className="clear"></div>
                  {/*上分金额*/}
                  <LimitLabel>{i18n.t("deposit.totalAmount")}</LimitLabel>
                  {" :  "}
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
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
                  <LimitAmount>{` ${
                    isNaN(this.props.amount) === false
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
                      <LimitAmount>{` ${
                        isNaN(this.props.amount) === false
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
        {/* <ItemContainer>
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
        </ItemContainer> */}

        {/*上傳憑證*/}
        {(() => {
          if (paymentCode("manual") || alteredPaymentCode("usdt") || alteredPaymentCode("manual")) {
            return (
              <>
                <ItemContainer>
                  <LabelLargeContainer>{i18n.t("deposit.uploadReceipt")}</LabelLargeContainer>

                  <FormControl>
                      <UploadFileButton
                        onClick={() => {
                          document.getElementById("getFile").click();
                        }}
                        variant={"outlined"}
                      >
                        {i18n.t("common.uploadButton")}
                      </UploadFileButton>
                      <input
                        type="file"
                        id="getFile"
                        onChange={this.props.handleFileChange}
                        accept="image/jpg, image/jpeg, image/png, image/tiff"
                        style={{ display: "none" }}
                      />
                      <UploadFileTag>
                        {this.props.files ? this.props.files[0].name : i18n.t("common.uploadFile")}
                      </UploadFileTag>
                  </FormControl>
                </ItemContainer>
                {/* <Remark>
                  {i18n.t(
                    config.features.Deposit_UploadRequired
                      ? "deposit.msgPlsUploadProof"
                      : "deposit.msgNotMustUploadProof",
                  )}
                </Remark> */}
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
        <ItemContainer>

          <GreenGradientButton
            onClick={this.props.handleDepositClick}
            variant={"contained"}
            fullWidth
            disabled={(() => {
              const transferlimit = channel.transferlimit;

              return (
                !!this.props.disabled ||
                (paymentCode("manual") && this.props.name === "") ||
                (paymentCode("manual") && this.props.account === "") ||
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
            <div></div>
          </GreenGradientButton>
        </ItemContainer>

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
