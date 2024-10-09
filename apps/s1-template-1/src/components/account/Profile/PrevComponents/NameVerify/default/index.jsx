import { TextField } from "@/components/UI/TextField";
import {
  FormControl,
  ItemContainerSmall,
  LabelContainer,
  UploadFileButton,
  UploadFileTag
} from "@/components/styled-component/ProfileForms";
import config from "@tgs-web-nx/config";
import { accountAction, RESET_ACCOUNTRESULT } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BaseProfile from "../../BaseProfile";

class Default extends BaseProfile {
  constructor(props) {
    super(props);
    this.state = {
      uploadFile: this.props.icUpload,
    };
  }

  render() {
    return (
      <>
        <ItemContainerSmall>
          <LabelContainer>{i18n.t("common.realName")}</LabelContainer>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              value={this.props.name}
              onChange={this.props.handleChangeName}
              type={"text"}
              placeholder={i18n.t("common.enterYourRealName")}
              disabled={false}
              maxLength={256}
            />
          </FormControl>
        </ItemContainerSmall>

        {config.features.ICVerification && (
          <ItemContainerSmall>
            <LabelContainer>{i18n.t("common.identificationNumber")}</LabelContainer>
            <FormControl variant="outlined">
              <TextField
                fullWidth
                value={this.props.ic}
                onChange={this.props.handleChangeIC}
                placeholder={
                  config.features.Profile_CustomIdentityPageTranslation
                    ? i18n.t("piso.profile.enterDocumentNumber")
                    : i18n.t("profile.nameVerify.msgEnterICNum")
                }
                disabled={false}
                maxLength={256}
              />
            </FormControl>
          </ItemContainerSmall>
        )}

        {config.features.ICVerificationUpload && (
          <ItemContainerSmall>
            <LabelContainer>{i18n.t("common.upload")}</LabelContainer>
            <FormControl>
            <UploadFileButton
                variant={"outlined"}
                onClick={() => {
                  document.getElementById("getFile").click();
                }}
              >
                {i18n.t("common.uploadButton")}
              </UploadFileButton>

              <input
                type="file"
                id="getFile"
                onChange={this.props.handleFileChange}
                accept=".jpg,.jpeg,.png,.tiff"
                style={{ display: "none" }}
              />
              <UploadFileTag haveFile={this.props.icUpload ? true : false}>
                {this.props.icUpload ? this.props.icUpload[0].name : i18n.t("common.uploadFile")}
              </UploadFileTag>
            </FormControl>
             
          </ItemContainerSmall>
        )}
      </>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Default));
