import React from "react";
import { useRegisterPage, useRwd } from "@tgs-web-nx/core/hooks";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import RegisterForm from "@/components/project/auth/RegisterForm";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import bg from "@/assets/t31/images/auth/BG.svg";
import registerImg from "@/assets/t31/images/auth/web-login.svg";

const MainWrapper = styled.div`
  padding: 12px;

  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    padding: 24px 26px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-image: url(${bg});
    color: ${({ theme }) => theme.white};
    gap: 10px;
  }
`;
const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 26px;
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.priBTNOutline}`};
  gap: 20px;
`;

const RegisterConent = styled.div`
  min-width: 400px;
  flex-shrink: 0;
`;
const RegisterImgContainer = styled.div`
  flex-shrink: 1;
`;
const RegisterTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: 0em;
  text-align: center;
  color: ${({ theme }) => theme.white};
  margin: 20px;
  ${media.sm} {
    margin: 0px;
    font-size: 24px;
    font-weight: 600;
    line-height: 36px;
    letter-spacing: 0em;
    text-align: left;
    color: #fee71b;
  }
`;
const RegisterPage = () => {
  useRegisterPage();

  const { isDesktopSize } = useRwd();

  return isDesktopSize ? (
    <MainWrapper>
      <RegisterContainer>
        <RegisterConent>
          <RegisterTitle>{i18n.t("common.register")}</RegisterTitle>
          <RegisterForm />
        </RegisterConent>
        <RegisterImgContainer>
          <img src={registerImg} width={"100%"} alt="login" />
        </RegisterImgContainer>
      </RegisterContainer>
    </MainWrapper>
  ) : (
    <MainWrapper>
      <RegisterTitle>{i18n.t("common.register").toLocaleUpperCase()}</RegisterTitle>
      <RegisterForm />
    </MainWrapper>
  );
};

export default RegisterPage;
