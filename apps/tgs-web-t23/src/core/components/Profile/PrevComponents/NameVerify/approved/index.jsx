import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import BaseProfile from "../../BaseProfile";
import { TextField } from "@/components/UI/TextField";
import {
  FormControl,
  ItemContainer,
  LabelContainer,
} from "@/components/styled-component/ProfileForms";

class Approved extends BaseProfile {
  render() {
    return (
      <ItemContainer>
        <LabelContainer>
          {config.features.Profile_CustomIdentityPageTranslation
            ? i18n.t("piso.profile.fullName")
            : i18n.t("profile.nameVerify.verifyName")}
        </LabelContainer>
        <FormControl variant="outlined">
          <TextField
            value={this.props.account.info.member_name}
            placeholder={
              config.features.Profile_CustomIdentityPageTranslation
                ? i18n.t("piso.profile.enterFullName")
                : i18n.t("profile.nameVerify.title")
            }
            disabled={true}
            maxLength={256}
            isCustomProfileStyle={config.brand === "WGHK"}
          />
        </FormControl>
      </ItemContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account,
  };
};

export default connect(mapStateToProps, "")(withRouter(Approved));
