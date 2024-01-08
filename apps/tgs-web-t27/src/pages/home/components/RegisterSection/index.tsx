import styled from "styled-components";
import registerAd from "@/assets/t27/images/home/register-ad.png";
import config from "@tgs-web-nx/config";
import TextButton from "@/pages/home/components/TextButton";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(${registerAd});
  width: 100%;
  padding-top: 91%;
  background-repeat: no-repeat;
  background-size: contain;
  position: relative;
`;

const WelcomeSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: absolute;
  bottom: 0;
  margin-bottom: 60px;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 2rem;
  font-weight: 700;
`;

const RegisterSection = () => {
  const { goToRegister } = useAuth();

  return (
    <Wrapper>
      <WelcomeSection>
        <Title>WELCOME TO {config.brand}</Title>
        <TextButton
          text={i18n.t("common.register")}
          onClick={goToRegister}
        />
      </WelcomeSection>
    </Wrapper>
  );
};

export default RegisterSection;
