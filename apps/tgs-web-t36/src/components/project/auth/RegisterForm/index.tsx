import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import styled from "styled-components";
import RegisterFormStage from "./RegisterFormStage";
import RedirectToLoginHint from "@/components/project/auth/RedirectToLoginHint";
import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import LanguageSwitch from "@/components/project/LanguageSwitch";
import BrandLogo from "@/components/project/BrandLogo";
import { media } from "@/theme/breakpoints";

const RegisterForm = () => {
  const Wrapper = styled.div`
    position: relative;
    height: 100%;
    overflow: scroll;
    padding-top: 70px;
    ${media.sm} {
      overflow: unset;
    }
  `;

  return (
    <Wrapper>
      <BrandLogo style={{ maxHeight: "55px" }} />

      <AuthFormContainer>
        <FormContainer>
          <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
        </FormContainer>

        <RedirectToLoginHint style={{ marginBottom: "20px" }} />
        <LanguageSwitch style={{ width: "150px", margin: "0 auto" }} />
      </AuthFormContainer>
    </Wrapper>
  );
};

export default React.memo(RegisterForm);
