import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;


const AnonymousHeaderContent = () => {
  const { goToLogin, goToRegister } = useAuth();

  return (
    <ButtonContainer>
      <RoundHeaderButton
        onClick={goToLogin}
      >
        {i18n.t("common.login")}
      </RoundHeaderButton>

      <RoundHeaderButton
        onClick={goToRegister}
      >
        {i18n.t("common.register")}
      </RoundHeaderButton>
      {/* {isDesktopSize && <HeaderLanguageSwitch />} */}
    </ButtonContainer> 
  );
};

export default AnonymousHeaderContent;
