import React from "react";
import styled from "styled-components";
import config from "@tgs-web-nx/config";
import { i18n } from "@tgs-web-nx/utils";
import { useAccountStore } from "@tgs-web-nx/core";
import { TextField } from "@/components/UI/TextField";
import { FormControl, ItemContainer } from "@/components/styled-component/ProfileForms";

const WaitingVerificationHint = styled.div`
  width: 100%;
  margin: 0 auto 24px;
  font-size: 15px;
  text-align: center;
  padding: 0 30px;
  color: ${({ theme }) => theme.primary};
`;

function WaitingVerification() {
  const { account } = useAccountStore();

  return (
    <div>
      <ItemContainer>
        <FormControl variant="outlined">
          <TextField
            placeholder={
              config.features.Profile_CustomIdentityPageTranslation
                ? i18n.t("piso.profile.enterFullName")
                : i18n.t("profile.nameVerify.msgPlsEnterName")
            }
            // adornment={IconInputReceivePNG}
            defaultValue={account.info.member_name}
            disabled={true}
            maxLength={256}
          />
        </FormControl>
      </ItemContainer>

      <WaitingVerificationHint>{i18n.t("verified.waiting")}</WaitingVerificationHint>
    </div>
  );
}

export default WaitingVerification;
