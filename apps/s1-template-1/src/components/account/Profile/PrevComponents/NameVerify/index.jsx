import React from "react";
import { connect } from "react-redux";
import config from "@tgs-web-nx/config";
import { ErrorSwitcher, i18n } from "@tgs-web-nx/utils";
import { accountAction, AccountService, RESET_ACCOUNTRESULT } from "@tgs-web-nx/core";
import { IdentityFormStatusEnum } from "@tgs-web-nx/constants";
import BaseProfile from "../BaseProfile";
import Default from "./default";
import Approved from "./approved";
import BottomNote from "@/components/UI/BottomNote";
import WaitingVerification from "@/components/account/Profile/PrevComponents/NameVerify/waiting-verification";

class NameVerify extends BaseProfile {
  constructor(props) {
    super(props);

    const name = this.props.account.info.member_name;
    const ic = this.props.account.info.member_card_no;

    const isConfigured = this.checkisConfigure();
    this.state = {
      name: name,
      ic: ic,
      isConfigured: isConfigured,
      icUpload: "",
      scene: "",
    };
  }

  componentDidMount() {
    const { identityformstatus, identityformid } = this.props.account.info;

    switch (identityformstatus) {
      case IdentityFormStatusEnum.WaitingVerify:
        this.setState({
          scene: identityformid
            ? "waiting-verification"
            : //name有值的話代表提交過real name
            this.state.name
            ? "approved"
            : "waiting-submit",
        });
        break;
      case IdentityFormStatusEnum.Approve:
        this.setState({ scene: "approved" });
        break;
      case IdentityFormStatusEnum.Reject:
        this.setState({ scene: "rejected" });
        break;
      default:
        break;
    }
  }

  componentDidUpdate(preProps, prevState) {
    if (preProps.account.info.member_card_no !== this.props.account.info.member_card_no) {
      const ic = this.props.account.info.member_card_no;
      const isConfigured = this.checkisConfigure();
      this.setState({ ...this.state, ic: ic, isConfigured: isConfigured });
    }

    if (
      preProps.account.updateCardResult !== this.props.account.updateCardResult &&
      this.props.account.updateCardResult !== null
    ) {
      if (this.props.account.updateCardResult.IsSuccess) {
        if (
          preProps.account.info.identityformstatus !== this.props.account.info.identityformstatus
        ) {
          this.setState({
            ...this.state,
            scene: "waiting-verification",
          });
        }
        this.props.resetResult();
        this.setState({ disableButton: true });
        // this.props.getIDCardNo();
        this.props.appHistory.replace("/profile");
      } else {
        this.props.alert("", this.props.account.updateCardResult.info);
        // if (this.props.account.updateCardResult.code === 401) {
        //   this.props.alert(
        //     '',
        //     i18n.t('profile.nameVerify.msgInvalidICNum')
        //   )
        // } else {
        //   this.props.alert('', this.props.account.updateCardResult.info)
        // }

        this.showLoading(false);
      }
    }
  }
  checkisConfigure = () => {
    var check_pass_account = false;
    if (config.features.ICVerification) {
      if (
        this.props.account.info.member_name !== "" &&
        this.props.account.info.member_name !== null
      ) {
        check_pass_account = this.props.account.info.check_pass_account;
      }
    } else {
      check_pass_account = this.props.account.info.check_pass_account;
    }
    return check_pass_account;
  };
  handleChangeName = (e) => {
    this.setState({ ...this.state, name: e.target.value });
    this.onTextChanged();
  };
  handleChangeIC = (e) => {
    this.setState({ ...this.state, ic: e.target.value });
    this.onTextChanged();
  };
  handleSubmitClicked = async () => {
    const memberName = this.state.name || "";
    const memberCard = this.state.ic || "";
    const icUpload = this.state.icUpload || "";

    const icRegex = /^\d{13}$/;
    if (!memberCard.match(icRegex)) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidIC"), {
        variant: "error",
      });
      return;
    }

    const nameRegex = new RegExp("^.{1,256}$");
    if (!memberName.match(nameRegex)) {
      this.props.enqueueSnackbar(i18n.t("common.msgInvalidName"), {
        variant: "error",
      });
      return;
    }

    if (!memberName) {
      return this.props.alert("", i18n.t("profile.nameVerify.msgPlsEnterName"));
    }
    if (!memberCard) {
      return this.props.alert("", i18n.t("profile.nameVerify.msgPlsEnterICNum"));
    }

    if (config.features.ICVerificationUpload && icUpload === "") {
      return this.props.alert("", i18n.t("deposit.msgPlsSelectFile"));
    }

    this.showLoading(true);
    try {
      const response = await AccountService.UpdateMemberNameAndIC(
        memberName,
        memberCard,
        config.features.ICVerificationUpload ? icUpload[0] : "",
      );
      if (response.IsSuccess) {
        this.updateInfo({
          member_name: memberName,
          identityformstatus: 0,
          identityformid: "confirm not empty",
        });
        this.props.enqueueSnackbar(i18n.t("common.msgSuccessUpdateProfile"), {
          variant: "success",
        });
      } else {
        this.props.alert("", ErrorSwitcher.getTranslation(response.info));
      }
    } catch (error) {
      console.error(error);
    } finally {
      this.props.handleCloseDialog();
      this.showLoading(false);
    }
  };

  isDisableButton = () => {
    const name = this.state.name || "";
    const ic = this.state.ic || "";

    const isDisableButton = config.features.ICVerification ? !(name && ic) : name === "";
    return isDisableButton;
  };

  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileType"));

        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 5120) {
        this.props.alert("", i18n.t("deposit.msgInvalidFileSize"));
        e.target.value = null;
      } else {
        this.setState({
          ...this.state,
          icUpload: files,
        });
      }
    }
  };

  handleGoEdit = () => {
    this.setState({
      ...this.state,
      scene: "waiting-submit",
    });
  };

  commonprops = {
    name: this.state.name,
    ic: this.state.ic,
    icUpload: this.state.icUpload,
    handleFileChange: this.handleFileChange,
    handleSubmitClicked: this.handleSubmitClicked,
    handleChangeIC: this.handleChangeIC,
    handleChangeName: this.handleChangeName,
  };

  sceneSwitcher = (scene) => {
    switch (scene) {
      case "waiting-verification":
        return <WaitingVerification {...this.commonprops} />;
      case "approved":
        return <Approved {...this.commonprops} />;
      // case "waiting-submit":
      //   return <Default {...this.commonprops} />;
      // case "reject":
      //   return <Default {...this.commonprops} />;
      default:
        return <Default {...this.commonprops} icUpload={this.state.icUpload} />;
    }
  };

  bottomNoteSwitcher = (scene) => {
    switch (scene) {
      case "waiting-verification":
        return (
          <BottomNote
            text1={i18n.t("profile.nameVerify.toEdit")}
            toEdit={this.handleGoEdit}
            text2={i18n.t("profile.nameVerify.editHere")}
          />
        );
      case "waiting-submit":
        return <BottomNote empty></BottomNote>;
      // case "reject":
      //   return <Default {...this.commonprops} />;

      case "approved":
        return (
          <BottomNote
            text1={i18n.t("profile.nameVerify.toEdit")}
            text2={i18n.t("common.customerService")}
          />
        );
      default:
        return (
          <BottomNote
            text1={i18n.t("profile.nameVerify.toEdit")}
            link={"../chat"}
            text2={i18n.t("profile.nameVerify.editHere")}
          />
        );
    }
  };

  render() {
    return this.setupContent(
      i18n.t("profile.nameVerify.title"),
      this.sceneSwitcher(this.state.scene),
      this.state.isConfigured &&
        config.features.ICVerification &&
        this.state.scene !== "waiting-submit"
        ? i18n.t("common.configured")
        : i18n.t("common.submit"),
      config.features.Profile_DisplayEditNameButton
        ? this.bottomNoteSwitcher(this.state.scene)
        : null,
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
    getAccountProfile: () => dispatch(accountAction.getAccountProfile()),
    getIDCardNo: () => dispatch(accountAction.getIDCardNo()),
    updateMemberCardNo: (name, number) => dispatch(accountAction.updateMemberCardNo(name, number)),
    resetResult: () =>
      dispatch({
        type: RESET_ACCOUNTRESULT,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NameVerify);
