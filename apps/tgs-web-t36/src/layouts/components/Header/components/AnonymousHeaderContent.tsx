import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { HeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import { theme } from "@/theme";
import HeaderLanguageSwitch from "@/components/project/LanguageSwitch/HeaderLanguageSwitch";
import memberIcon from "@/assets/t36/images/header/icon-account.svg";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

type Props = {
  buttonWidth?: string;
};

const AnonymousHeaderContent = ({ buttonWidth }: Props) => {
  const { goToLogin, goToRegister } = useAuth();
  const { isDesktopSize } = useRwd();

  return (
    <ButtonContainer>
      {isDesktopSize ? (
        <>
          <HeaderLanguageSwitch />
          <HeaderButton
            onClick={goToLogin}
            style={{
              color: theme.white,
              background: "#26304C",
            }}
          >
            <img src={memberIcon} alt="memebr" />
            {i18n.t("common.login")}
          </HeaderButton>
          <HeaderButton
            onClick={goToRegister}
            style={{
              minHeight: "37px",
              color: theme.white,
              background: theme.BTN01,
            }}
          >
            {i18n.t("common.register")}
          </HeaderButton>
        </>
      ) : (
        <>
          <HeaderButton
            onClick={goToLogin}
            style={{
              color: theme.white,
              background: "#26304C",
            }}
          >
            <img src={memberIcon} alt="memebr" />
            {i18n.t("common.login")}
          </HeaderButton>

          <HeaderLanguageSwitch />
        </>
      )}
    </ButtonContainer>
  );
};

export default AnonymousHeaderContent;
