import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import { useRwd } from "@tgs-web-nx/core/hooks";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { goToLogin, goToRegister } = useAuth();
  const { isDesktopSize } = useRwd();

  return (
    <ButtonContainer>
      <HeaderButton
        onClick={goToLogin}
        style={{
          color: theme.g2,
          background: "transparent",
        }}
      >
        {i18n.t("common.login")}
      </HeaderButton>

      <HeaderButton
        onClick={goToRegister}
        style={{
          minWidth: "97px",
          color: theme.white,
          background: theme.primaryGradient,
        }}
      >
        {i18n.t("common.register")}
      </HeaderButton>
      {isDesktopSize && <HeaderLanguageSwitch />}
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
