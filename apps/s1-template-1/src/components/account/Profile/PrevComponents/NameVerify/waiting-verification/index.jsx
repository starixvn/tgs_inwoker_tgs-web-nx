import { TextField } from "@/components/UI/TextField";
import { FormControl, ItemContainer } from "@/components/styled-component/ProfileForms";
import config from "@tgs-web-nx/config";
import { useAccountStore } from "@tgs-web-nx/core";
import { i18n } from "@tgs-web-nx/utils";
import styled from "styled-components";

const WaitingVerificationHint = styled.div`
  width: 100%;
  margin: 0 auto 24px;
  text-align: center;
  padding: 0 30px;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.white};
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
