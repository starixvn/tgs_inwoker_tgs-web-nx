import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import TextButton from "../TextButton";
import { theme } from "@/theme";
import adBanner from "@/assets/t23/images/home/ad-banner.png";
import { media } from "@/theme/breakpoints";

const PromotionContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;

  ${media.sm} {
    min-width: 580px;
    min-height: 395px;
  }
`;

const Banner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  padding-top: 40.54%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  margin-bottom: 19px;

  ${media.sm} {
    margin-bottom: 48px;
  }
`;

const PromotionDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.sm} {
    padding: 0 10px;
  }
`;

const PromotionText = styled.div`
  font-size: 1.125rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: ${(props) => props.theme.white};

  ${media.sm} {
    font-size: 1.5625rem;
    width: calc(100% - 200px);
    padding-right: 30px;
  }
`;

const PromotionCard = () => {
  const history = useHistory();
  const { isMobileSize } = useRwd();

  return (
    <PromotionContent>
      <Banner $imageUrl={adBanner} />
      <PromotionDetailWrapper>
        <PromotionText>Welcome Bonus of 100% Up to 100,000</PromotionText>
        <TextButton
          text={"Details"}
          width={isMobileSize ? "105px" : "200px"}
          height={isMobileSize ? "34px" : "40px"}
          color={theme.white}
          onClick={() => history.push("/promotion-list")}
        />
      </PromotionDetailWrapper>
    </PromotionContent>
  );
};

export default PromotionCard;
