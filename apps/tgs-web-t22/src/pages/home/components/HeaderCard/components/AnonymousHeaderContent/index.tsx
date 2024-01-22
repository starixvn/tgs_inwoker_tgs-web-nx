import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";

const Button = styled.button`
  padding: 15px 10px;
  background: transparent;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.labelText};
  font-size: .6rem;
  font-weight: 400;
  line-height: 14px;
  color: ${({ theme }) => theme.labelText};
`;

const Root = styled.div`
  display: flex;
  gap: 6px;
`;

const AnonymousHeaderContent = () => {
  const { goToLogin, goToRegister } = useAuth();

  return (
    <Root>
      <Button onClick={goToRegister}>{i18n.t("common.register")}</Button>
      <Button onClick={goToLogin}>{i18n.t("common.login")}</Button>
    </Root>
  );
  
};

export default AnonymousHeaderContent;