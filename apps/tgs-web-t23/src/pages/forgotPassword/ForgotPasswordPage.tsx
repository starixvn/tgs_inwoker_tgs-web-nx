import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import i18n from "@/core/utils/i18n";
import ForgotPasswordPrev from "@/core/components/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import { AuthFormContainer } from "@/components/styled-component/AuthFormContainer";
import RedirectToLoginHint from "@/pages/register/components/RegisterForm/RedirectToLoginHint";

const TitleContainer = styled.div`
  font-size: 3rem;
  line-height: 3.478rem;
  font-weight: 700;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
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
