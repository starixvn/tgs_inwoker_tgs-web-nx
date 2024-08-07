import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { accountAction, RESET_ACCOUNTRESULT } from "@tgs-web-nx/core";
import BaseProfile from "../../BaseProfile";
import { TextField } from "@/components/UI/TextField";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
  UploadFileButton,
  UploadFileTag,
} from "@/components/styled-component/ProfileForms";

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
        <ItemContainer>
          <LabelContainer>
            {config.features.Profile_CustomIdentityPageTranslation
              ? i18n.t("piso.profile.fullName")
              : i18n.t("profile.nameVerify.verifyName")}
          </LabelContainer>
          <FormControl variant="outlined">
            <TextField
              fullWidth
              value={this.props.name}
              onChange={this.props.handleChangeName}
              type={"text"}
              placeholder={
                config.features.Profile_CustomIdentityPageTranslation
                  ? i18n.t("piso.profile.enterFullName")
                  : i18n.t("profile.nameVerify.title")
              }
              disabled={false}
              maxLength={256}
            />
          </FormControl>
        </ItemContainer>

        {this.props.general.brand.playerIdentityAuthenticationEnabled && (
          <ItemContainer>
            <LabelContainer>
              {config.features.Profile_CustomIdentityPageTranslation
                ? i18n.t("piso.profile.documentNumber")
                : i18n.t("profile.nameVerify.icNum")}
            </LabelContainer>
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
          </ItemContainer>
        )}

        {this.props.general.brand.playerIdentityAuthenticationEnabled && (
          <ItemContainer>
            <LabelContainer>{i18n.t("common.upload")}</LabelContainer>
            <UploadFileButton
              variant={"outlined"}
              onClick={() => {
                document.getElementById("getFile").click();
              }}
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
            <UploadFileTag>{this.props.icUpload ? this.props.icUpload[0].name : ""}</UploadFileTag>
          </ItemContainer>
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
