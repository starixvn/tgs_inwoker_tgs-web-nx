import React from "react";
import config from "@tgs-web-nx/config";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import styled from "styled-components";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import { media } from "@/theme/breakpoints";
import SocialMediaV2 from "@/components/project/SocialMediaV2";

const RegisterForm = () => {
  const Wrapper = styled.div`
    position: relative;
    height: 100%;
    overflow: scroll;
    padding-top: 20px;
    ${media.sm} {
      overflow: unset;
    }
  `;

  return (
    <Wrapper>
      <BrandLogo style={{ maxHeight: "55px" }} />

      <AuthFormContainer>
        <FormContainer>
          <RegisterFormStage
            currentStage={
              config.features.SMSVerifyInRegister
                ? RegisterStageEnum.CreatePlayeWithSMSVerify
                : RegisterStageEnum.CreatePlayer
            }
          />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
        <SocialMediaV2 style={{ width: "100%", justifyContent: "center" }} />
        <LanguageSwitch style={{ width: "150px", margin: "0 auto" }} />
      </AuthFormContainer>
    </Wrapper>
  );
};

export default React.memo(RegisterForm);
