import styled from "styled-components";
import { usePromotionPage } from "@tgs-web-nx/core/hooks";
import HomePromotionCard from "@/pages/promotion/components/HomePromotionCard";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const PromotionWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

const PromotionDetailWrapper = styled.div`
  width: 100%;
  height: 190px;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  margin-top: 10px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    height: 190px;

    &::-webkit-scrollbar {
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
      background: ${(props) => props.theme.tertiaryDark};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
      background-color: #53535375;
    }

    &::-webkit-scrollbar-track-piece {
      background: transparent;
    }
  }
`;

const HomePromotion = () => {
  const { promotionList } = usePromotionPage();

  return (
    <PromotionWrapper>
      <PromotionDetailWrapper>
        {promotionList
          .sort((a, b) => a.order - b.order)
          .map((promotionData) => (
            <HomePromotionCard key={promotionData.id} promotionData={promotionData} />
          ))}
      </PromotionDetailWrapper>
    </PromotionWrapper>
  );
};

export default HomePromotion;
