import styled from "styled-components";
import registerAd from "@/assets/t27/images/home/register-ad.png";
import config from "@tgs-web-nx/config";
import TextButton from "@/pages/home/components/TextButton";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth } from "@tgs-web-nx/core/features";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 290px;
  background: linear-gradient(180deg, #191B1E 0%, #24262B 100%);
`;

const BannerSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 35%;
  height: 100%;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const WelcomeSection = styled.div`
  position: absolute;
  top: 80px;
  left: 60px;
  min-width: 290px;
`;

const TextSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 2rem;
  font-weight: 700;
  line-height: 58.36px;
`;

const Brand = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 2rem;
  font-weight: 700;
  margin-left: 10px;
`;

const DesktopRegisterSection = () => {
  const { goToRegister } = useAuth();

  return (
    <Wrapper>
      <WelcomeSection>
        <TextSection>
          <Title>WELCOME TO </Title><Brand>{config.brand}</Brand>
        </TextSection>
        <TextButton
          text={i18n.t("common.register")}
          onClick={goToRegister}
          width="290px"
          height="46px"
        />
      </WelcomeSection>
      <BannerSection>
        <img src={registerAd} alt="banner" />
      </BannerSection>
    </Wrapper>
  );
};

export default DesktopRegisterSection;
