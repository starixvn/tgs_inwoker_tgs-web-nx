import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useNotifications, useUpdatePageName } from "@tgs-web-nx/core/features";
import ForgotPasswordPrev from "@/components/account/authentication/ForgotPasswordPrev";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";
import { media } from "@/theme/breakpoints";

const TitleContainer = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  white-space: nowrap;

  ${media.sm} {
    display: none;
  }
`;

const ForgotPasswordPage = () => {
  useUpdatePageName(i18n.t("forgotPassword.title"));

  const { alert } = useNotifications();
  const history = useHistory();

  return (
    <AuthFormContainer>
      <TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
      <RedirectToLoginHint style={{ marginTop: "20px" }} />
    </AuthFormContainer>
  );
};

export default ForgotPasswordPage;
