import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useLoginForm } from "@tgs-web-nx/core/features";
import SystemTime from "./SystemTime";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: end;
  color: ${({ theme }) => theme.gray80};
`;

const ForgetPass = styled.div`
  text-decoration: underline;
  cursor: pointer;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { goToLogin, goToRegister } = useAuth();
  const { handleClickForgotPassword } = useLoginForm();
  return (
    <ButtonContainer>
      <TextWrapper>
        <ForgetPass onClick={handleClickForgotPassword}>
          {i18n.t("wap.login.forgetPass")}?
        </ForgetPass>
        <SystemTime />
      </TextWrapper>
      <Wrapper>
        <RoundHeaderButton
          onClick={goToLogin}
          style={{
            color: theme.white,
            background: theme.primary,
          }}
        >
          {i18n.t("common.login")}
        </RoundHeaderButton>

        <RoundHeaderButton
          color={"primary"}
          onClick={goToRegister}
          style={{
            color: theme.white,
            background: theme.secondary,
          }}
        >
          {i18n.t("common.register")}
        </RoundHeaderButton>
        <HeaderLanguageSwitch />
      </Wrapper>
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
