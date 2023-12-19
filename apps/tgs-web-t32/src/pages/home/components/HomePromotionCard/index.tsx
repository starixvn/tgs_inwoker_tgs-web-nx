import { useHistory } from "react-router-dom";
import styled from "styled-components";
import TextButton from "../TextButton";
import { theme } from "@/theme";
import adBanner from "@/assets/t23/images/home/ad-banner.png";

const PromotionContent = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.mainBackground};
`;

const Banner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  padding-top: 40.54%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 20px;
  margin-bottom: 19px;
`;

const PromotionDetailWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PromotionText = styled.div`
  font-size: 1.125rem;
  line-height: 1.25rem;
  font-weight: 400;
  color: ${(props) => props.theme.white};
`;

const PromotionCard = () => {
  const history = useHistory();

  return (
    <PromotionContent>
      <Banner $imageUrl={adBanner} />
      <PromotionDetailWrapper>
        <PromotionText>Welcome Bonus of 100% Up to 100,000</PromotionText>
        <TextButton
          text={"Go"}
          width={"105px"}
          height={"34px"}
          bgColor={theme.mainBackground}
          color={theme.white}
          onClick={() => history.push("/promotion-list")}
        />
      </PromotionDetailWrapper>
    </PromotionContent>
  );
};

export default PromotionCard;
