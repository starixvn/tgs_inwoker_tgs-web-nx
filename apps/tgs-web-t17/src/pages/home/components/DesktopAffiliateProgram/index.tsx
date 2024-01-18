import styled from "styled-components";
import affiliateIcon from "@/assets/t27/images/home/affiliate-icon.png";
import config from "@tgs-web-nx/config";
import TextButton from "@/pages/home/components/TextButton";
import { theme } from "@/theme";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 412px;
  padding: 30px 80px;
  background:${({ theme }) => theme.g4};
`;

const BannerSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 39%;
  height: 100%;

  & > img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 40px 0px;
  gap: 30px;
`;

const Title = styled.div`
  width: 100%;
  font-size: 23.3px;
  font-weight: 600;
  line-height: 29.18px;
  color: ${({ theme }) => theme.primary};
`;

const Text = styled.div`
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 400;
  line-height: 25.6px;
  color: ${({ theme }) => theme.g2};
`;

const BtnWrapper = styled.div`
  /* margin-top: 15px; */
`;

const DesktopAffiliateProgram = () => {
  return (
    <Wrapper>
      <Content>
        <Title>AFFILIATE PROGRAM</Title>
        <Text>{config.brand} online casino is well known for its vast selection of games, and with the {config.brand} Affiliate Program, you can share in the casino’s success while boosting your revenue. Become an affiliate for free, share your casino enthusiasm and earn along the way. Your success is in your hands!</Text>
        <BtnWrapper>
          <TextButton
            text="More"
            bgColor={theme.thirdGradient}
            width="300px"
          />
        </BtnWrapper>
      </Content>
      <BannerSection>
        <img src={affiliateIcon} alt="banner" />
      </BannerSection>
    </Wrapper>
  );
};

export default DesktopAffiliateProgram;
