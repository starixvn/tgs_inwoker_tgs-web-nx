import config from "@tgs-web-nx/config";
import { accountAction, AccountService } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BaseProfile from "./BaseProfile";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
} from "@/components/styled-component/ProfileForms";
import { TextField } from "@/components/UI/TextField";
import BottomNote from "@/components/UI/BottomNote";

class Email extends BaseProfile {
  state = {
    email: "",
    isConfigured: false,
  };
  componentDidMount() {
    let isConfigured = false;
    if (this.props.account.info.member_email) isConfigured = true;
    this.setState({
      email: isConfigured ? this.props.account.info.member_email : "",
      isConfigured: isConfigured,
    });
  }

  handleChangeNumber = (e) => {
    this.setState({ email: e.target.value });
    this.onTextChanged();
  };

  isDisableButton = () => {
    return !this.state.email;
  };
  handleSubmitClicked = () => {
    const EMAIL_EXISTED = "EmailExisted";
    const EMAIL_INVALID = "EmailInvalid";
    const email = this.state.email;
    //validate here
    const re = /^(?=.{1,64}$)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]{2,4}$/;
    if (!email.match(re)) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
        variant: "error",
      });
      return;
    }

    this.showLoading(true);
    //api
    AccountService.SetEmail(email, "email", "email")
      .then((response) => {
        if (response.IsSuccess) {
          if (response.data.stepStatus === EMAIL_EXISTED) {
            this.props.enqueueSnackbar(i18n.t("common.msgEmailExist"), {
              variant: "error",
            });
            this.showLoading(false);
            return;
          } else if (response.data.stepStatus === EMAIL_INVALID) {
            this.props.enqueueSnackbar(i18n.t("common.msgInvalidEmail"), {
              variant: "error",
            });
            this.showLoading(false);
            return;
          }
          this.props.getAccountProfile().then((responseUpdate) => {
            if (responseUpdate.IsSuccess) {
              this.setState({
                ...this.state,
                email: email,
                isConfigured: true,
              });
            }
            this.showLoading(false);
            this.props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
              variant: "success",
            });
          });
        } else {
          this.props.enqueueSnackbar(response.msg, {
            variant: "error",
          });
          this.showLoading(false);
        }
      })
      .catch((err) => {
        this.props.enqueueSnackbar(err, {
          variant: "error",
        });
        this.showLoading(false);
      });
  };

  render() {
    return this.setupContent(
      i18n.t("common.emailAddress"),
      <ItemContainer>
        <LabelContainer>{i18n.t("common.emailAddress")}</LabelContainer>
        <FormControl variant="outlined">
          <TextField
            value={this.state.email}
            onChange={this.handleChangeNumber}
            placeholder={i18n.t("common.msgEnterEmail")}
            disabled={
              this.state.isConfigured &&
              (config.features.ChangesNotAllowed ||
                config.features.Profile_ExistingDetails_ViewOnly)
            }
            maxLength={15}
          />
        </FormControl>
      </ItemContainer>,
      this.state.isConfigured && config.features.ChangesNotAllowed
        ? i18n.t("common.configured")
        : this.state.email !== this.props.account.member_email && i18n.t("common.submit"),
      //   i18n.t("common.submit"),
      (() => {
        if (
          this.state.isConfigured &&
          (config.features.ChangesNotAllowed || config.features.Profile_ExistingDetails_ViewOnly)
        ) {
          return (
            <BottomNote
              text1={i18n.t("profile.email.toEdit")}
              link={"../chat"}
              text2={i18n.t(
                config.features.ChangesNotAllowed ||
                  config.features.Profile_ExistingDetails_ViewOnly
                  ? "common.customerService"
                  : "profile.email.here",
              )}
            />
          );
        }
      })(),
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile(true)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Email));
