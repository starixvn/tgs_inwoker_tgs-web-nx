import { AuthFormContainer, FormContainer } from "@/components/styled-component/AuthFormContainer";
import { useRedirectToLoginHint } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { RegisterStageEnum } from "@tgs-web-nx/types";
import React from "react";
import styled from "styled-components";

import RegisterFormStage from "./RegisterFormStage";

const ThirdPartyLoginArea = styled.div`
  margin-top: -2.4rem;
  margin-bottom: 1.6rem;
`;

const SignUpWith = styled.div`
  text-align: center;
  font-size: 1.3rem;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  margin-top: 1.2rem;
`;

const RegisterForm = () => {
  const { isMobileSize } = useRwd();
  const { handleRedirect } = useRedirectToLoginHint();

  const socialList = [
    {
      name: "Facebook",
      url: "/assets/images/community/facebook.png",
    },
    {
      name: "Telegram",
      url: "/assets/images/community/telegram.png",
    },
    {
      name: "Google",
      url: "/assets/images/community/google.png",
    },
    {
      name: "Twitter",
      url: "/assets/images/community/twitter.png",
    },
  ];

  return (
    <AuthFormContainer>
      <FormContainer>
        <RegisterFormStage currentStage={RegisterStageEnum.CreatePlayer} />
      </FormContainer>

      <ThirdPartyLoginArea>
        <SignUpWith>Sign in directly with</SignUpWith>
        <SocialIcons>
          {socialList.map((social) => {
            return <img src={social.url} width={36} height={36} alt={social.name} />;
          })}
        </SocialIcons>
      </ThirdPartyLoginArea>
    </AuthFormContainer>
  );
};

export default React.memo(RegisterForm);
