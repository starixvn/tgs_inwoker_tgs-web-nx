import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import i18n from "@/utils/i18n";
import ForgotPasswordPrev from "@/core/components/authentication/ForgotPasswordPrev";
import { useNotifications } from "@/core/feature/useNotifications";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";

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
    <>
      <TitleContainer>{i18n.t("forgotPassword.title")}</TitleContainer>
      {/*@ts-ignore*/}
      <ForgotPasswordPrev alert={alert} history={history} />
    </>
  );
};

export default ForgotPasswordPage;
