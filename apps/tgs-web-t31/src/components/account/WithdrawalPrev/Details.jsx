import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { i18n } from "@tgs-web-nx/utils";
import { RESET_WALLETRESULT, walletAction } from "@tgs-web-nx/core";
import Loading from "@/components/UI/Loading";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Button } from "@/components/UI/Button";
import {
  Container,
  Transition,
  ContentBg,
  BalanceLabel,
  DepositAmount,
  SplitLine,
  LeftLabel,
  RightLabel,
  SplitBoth,
  StyledModalPopup,
  DialoTitle,
  OTPContainer,
  OTPTextBox,
} from "@/components/styled-component/WithdrawalDetails";

class WithdrawalDetails extends Component {
  state = {
    loading: false,
    openPopup: false,
    password: "",
  };
  componentDidMount() {
    if (this.props.order == null) {
      this.props.appHistory.replace("/withdrawal");
    } else {
      this.props.addBilling(this.props.order.id, this.props.order.amount);
    }
  }
  componentDidUpdate(preProps) {
    if (
      preProps.wallet.withdrawalResult !== this.props.wallet.withdrawalResult &&
      this.props.wallet.withdrawalResult !== null
    ) {
      if (this.props.wallet.withdrawalResult.IsSuccess) {
        this.props.resetResult();
        this.props.getBalanceList();
        this.props.appHistory.replace("/withdrawal");
      } else {
        this.props.alert("", this.props.wallet.withdrawalResult.info);
      }
    }
  }
  handleWithdrawalConfirmClick = (e) => {
    if (this.props.wallet.addBillingResult !== null) {
      this.setState({ ...this.state, otp: true, password: "" });
    }
  };

  handleWithdrawalCancelClick = (e) => {
    this.setState({ ...this.state, loading: true });
    this.props.appHistory.replace("/withdrawal");
  };
  handleConfirmOTP = () => {
    this.setState({ ...this.state, otp: false });
    this.props.doWithdrawal(
      this.props.wallet.addBillingResult.data.amount,
      this.state.password,
      this.props.order.id,
    );
  };
  handlePasswordChange = (e) => {
    this.setState({ ...this.state, password: e.target.value });
  };
  handleOpenPopupUrl = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
    let form = document.getElementById("form");
    form.submit();
  };
  handleClosePopup = () => {
    this.setState({
      ...this.state,

      openPopup: false,
    });
  };
  render() {
    return (
      <Container>
        {(() => {
          if (this.props.wallet.addBillingResult !== null) {
            return (
              <React.Fragment>
                <ContentBg>
                  <BalanceLabel>{i18n.t("common.amount")}</BalanceLabel>
                  <DepositAmount>
                    {this.props.wallet.mainSymbol} {this.props.wallet.addBillingResult.data.amount}
                  </DepositAmount>
                  <SplitLine></SplitLine>
                  <LeftLabel>{i18n.t("withdrawal.receiverAcc")}</LeftLabel>
                  <RightLabel>{this.props.wallet.addBillingResult.data.card}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("withdrawal.receiverName")}</LeftLabel>
                  <RightLabel>{this.props.wallet.addBillingResult.data.name}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("withdrawal.fee")}</LeftLabel>
                  <RightLabel>{this.props.wallet.addBillingResult.data.fee}</RightLabel>
                  <SplitBoth></SplitBoth>
                  <LeftLabel>{i18n.t("withdrawal.receiverAmount")}</LeftLabel>
                  <RightLabel>{this.props.wallet.addBillingResult.data.bill}</RightLabel>
                  <SplitBoth></SplitBoth>
                </ContentBg>
                <Button onClick={this.handleWithdrawalCancelClick}>
                  {i18n.t("common.cancel")}
                </Button>
                <Button onClick={this.handleWithdrawalConfirmClick}>
                  {i18n.t("common.confirm")}
                </Button>
              </React.Fragment>
            );
          }
        })()}
        <StyledModalPopup
          onClose={() => this.setState({ ...this.state, otp: false })}
          open={this.state.otp}
          TransitionComponent={Transition}
          keepMounted
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <>
            <DialoTitle>{i18n.t("common.withdrawalPassword")}</DialoTitle>
            <OTPContainer>
              <OTPTextBox
                type={"password"}
                inputmode="numeric"
                minLength={6}
                maxLength={6}
                size={6}
                onChange={this.handlePasswordChange}
                value={this.state.password}
              />
            </OTPContainer>
            <Button
              labelStyle={{ color: "#fff" }}
              onClick={() => this.setState({ ...this.state, otp: false })}
            />
            {i18n.t("common.cancel")}
            <Button
              style={{
                width: "250px",
                float: "right",
              }}
              disabled={this.state.password.length < 6}
              label={i18n.t("common.confirm")}
              onClick={this.handleConfirmOTP}
            />
          </>
        </StyledModalPopup>
        <Loading show={this.state.loading || this.props.wallet.loading} />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    screenWidth: state.ui.screenWidth,
    screenHeight: state.ui.screenHeight,
    wallet: state.wallet,
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addBilling: (card_id, amount) => dispatch(walletAction.addBilling(card_id, amount)),
    resetResult: () =>
      dispatch({
        type: RESET_WALLETRESULT,
      }),
    getBalanceList: () => dispatch(walletAction.getBalanceList()),
    doWithdrawal: (amount, password, user_account_id) =>
      dispatch(walletAction.doWithdrawal(amount, password, user_account_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithdrawalDetails));
