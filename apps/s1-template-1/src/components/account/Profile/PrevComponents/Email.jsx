import config from "@tgs-web-nx/config";
import { accountAction, AccountService } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BaseProfile from "./BaseProfile";
import BottomNote from "@/components/UI/BottomNote";

import {
  FormControl,
  ItemContainer,
  LabelContainer,
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";

class Email extends BaseProfile {
  constructor(props) {
    super(props);
    this.state = {
      countdownToken: 0,
      email: "",
      code: "",
      isConfigured: false,
      isNew: false,
      securityKey: "",
    };
  }

  componentDidMount() {
    var isConfigured = false;
    if (this.props.account.info.check_pass_email) isConfigured = true;
    this.setState({
      ...this.state,
      email: isConfigured ? this.props.account.info.member_email : "",
      code: "",
      isConfigured: isConfigured,
      countdownToken: 0,
      isNew: !this.props.account.info.check_pass_email,
    });
  }
  handleChangeEmail = (e) => {
    this.setState({ ...this.state, email: e.target.value });
    if (config.features.Register_CustomFlow_IDR && !this.props.account.registercompleted) {
      this.onTextChanged();
    }
  };

  handleChangeCode = (e) => {
    this.setState({ ...this.state, code: e.target.value });
    this.onTextChanged();
  };

  checkCountdownToken = () => {
    if (this.state.countdownToken > 0) {
      this.setState({
        ...this.state,
        countdownToken: this.state.countdownToken - 1,
      });
      setTimeout(() => {
        this.checkCountdownToken();
      }, 1000);
    }
  };

  handleGetCodeClick = async (e) => {
    if (this.state.countdownToken > 0) return;
    if (!this.state.email) return this.showErrorMessage(i18n.t("common.msgEnterEmail"));

    try {
      this.showLoading(true);
      const response = await AccountService.VerifyEmail(this.state.email);
      if (response.IsSuccess) {
        const securityKey = response.data;

        this.setState((prevState) => ({
          ...prevState,
          securityKey,
          countdownToken: 60,
        }));

        this.showInfoMessage(i18n.t("common.msgTokenSent"));

        setTimeout(() => {
          this.checkCountdownToken();
        }, 1000);
      } else {
        this.showErrorMessage(response.info);
      }
    } catch (err) {
      this.showErrorMessage(err);
    } finally {
      this.showLoading(false);
    }
  };

  isDisableButton = () => {
    // const code = this.state.code;
    // const email = this.state.email;
    // return config.features.Register_CustomFlow_IDR && !this.props.account.registercompleted
    //   ? !email
    //   : !(code && email);
    return false;
  };
  showErrorMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "error"
    // });
  };
  showInfoMessage = (msg) => {
    this.props.alert("", msg);
    // this.props.enqueueSnackbar(msg, {
    //   key: "info"
    // });
  };

  handleSubmitClicked = async () => {
    try {
      this.showLoading(true);

      const isCustomFlowIDR =
        config.features.Register_CustomFlow_IDR && !this.props.account.registercompleted;
      const newRegisterInput = {
        input: isCustomFlowIDR ? "Init" : "Valid",
        data: {
          email: this.state.email,
          securitykey: this.state.securityKey,
          validatecode: this.state.code,
        },
      };

      if (isCustomFlowIDR) {
        const initMailResponse = await this.props.newRegister("InitMail", newRegisterInput);

        if (initMailResponse.IsSuccess) {
          const validMailResponse = await this.props.newRegister("InitMail", newRegisterInput);

          if (validMailResponse.IsSuccess) {
            await this.props.getAccountProfile();
            this.props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
              variant: "success",
            });

            // DEPRECATED
            // if (!this.props.account.registercompleted) {
            //   this.props.history.replace("/card/add");
            // }
          } else {
            this.showErrorMessage(validMailResponse.info);
          }
        } else {
          this.showErrorMessage(initMailResponse.info);
        }
      } else {
        let response;
        if (this.props.isProceedRegisterV2) {
          response = await AccountService.UpdateEmailV2(this.state.securityKey, this.state.code);
        } else {
          response = await AccountService.UpdateEmail(this.state.securityKey, this.state.code);
        }

        if (response.IsSuccess) {
          await this.props.getAccountProfile();
          this.props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
            variant: "success",
          });

          this.setState({
            code: "",
            securityKey: "",
            isConfigured: true,
            countdownToken: 0,
            isNew: false,
          });
        } else {
          this.showErrorMessage(response.info);
        }
      }
    } catch (err) {
      this.showErrorMessage(err);
    } finally {
      this.showLoading(false);
      this.props.handleCloseDialog();
    }
  };

  render() {
    const { location } = this.props;

    var cannotAccessOther = location.state && location.state.forced ? true : "";

    return this.setupContent(
      i18n.t("common.emailAddress"),
      <>
        <ItemContainer>
          <LabelContainer>{i18n.t("common.emailAddress")}</LabelContainer>

          <FormControl variant="outlined">
            <TextField
              value={this.state.email}
              onChange={this.handleChangeEmail}
              placeholder={i18n.t("common.msgEnterEmail")}
              disabled={this.state.isConfigured}
            />
          </FormControl>
        </ItemContainer>

        {/* {(() => {
          if (
            !(config.features.Register_CustomFlow_IDR && !this.props.account.registercompleted) &&
            !this.state.isConfigured
          ) {
            return (
              <ItemContainer>
                <LabelContainer>{i18n.t("common.token")}</LabelContainer>
                <FormControl variant="outlined">
                  <TextFieldWithButton
                    buttonLabel={
                      this.state.countdownToken <= 0
                        ? i18n.t("common.msgSendToken")
                        : i18n.t("common.btnTokenResendLabel") +
                          "(" +
                          this.state.countdownToken +
                          "s)"
                    }
                    buttonDisabled={this.state.countdownToken > 0}
                    style={{ margin: "20px auto 20px auto" }}
                    value={this.state.code}
                    onChange={this.handleChangeCode}
                    placeholder={i18n.t("common.token")}
                    onClick={this.handleGetCodeClick}
                    maxLength={6}
                    type={"text"}
                  />
                </FormControl>
              </ItemContainer>
            );
          }
        })()} */}
      </>,
      //this.state.isConfigured ? i18n.t("common.configured") : i18n.t("common.complete"),
      i18n.t("common.submit"),
      (() => {
        if (this.state.isConfigured) {
          return (
            <ItemContainer>
              <BottomNote
                text1={i18n.t("profile.email.toEdit")}
                link={
                  config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                    ? "../chat"
                    : "./changeemail"
                }
                text2={i18n.t(
                  config.features.ChangesNotAllowed ||
                    config.features.Profile_ExistingDetails_ViewOnly
                    ? "common.customerService"
                    : "profile.email.here",
                )}
              />
            </ItemContainer>
          );
        }
      })(),
      cannotAccessOther,
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAccountProfile: (token) => dispatch(accountAction.getAccountProfile(true)),
    newRegister: (type, input) => dispatch(accountAction.newRegister(type, input)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Email));
