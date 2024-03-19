import styled from "styled-components";
import affiliateIcon from "@/assets/t27/images/home/affiliate-icon.png";
import config from "@tgs-web-nx/config";
import TextButton from "@/pages/home/components/TextButton";
import { theme } from "@/theme";

const Wrapper = styled.div`
  display: flex;
  width:100%;
  padding: 30px 12px;
  align-items: flex-start;
  gap: 10px;
`;

const Content = styled.div`
width:100%;
  display: flex;
  flex-direction: column;
  padding: 17px 17.51px 17.505px 17.51px;
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
  font-size: 15px;
  font-weight: 700;
  line-height: 25.6px;
  color: ${({ theme }) => theme.g2};
`;

const BtnWrapper = styled.div`
  margin-top: 15px;
`;

const AffiliateProgram = () => {
  return (
    <Wrapper>
      <Content>
        <Title>AFFILIATE PROGRAM</Title>
        <Text>With the {config.brand} Affiliate Program, you can share in the casino’s success while boosting your revenue.</Text>
        <img src={affiliateIcon} alt="affiliate" />
        <BtnWrapper>
          <TextButton
            text="More"
            bgColor={theme.thirdGradient}
          />
        </BtnWrapper>
      </Content>
    </Wrapper>
  );
};

export default AffiliateProgram;
