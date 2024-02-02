import styled from "styled-components";
import { usePromotionPage } from "@tgs-web-nx/core/hooks";
import { MobileHeader } from "./components/MobileHeader";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import bg from "@/assets/t22/images/promotion/bg.png";
import banner from "@/assets/t22/images/promotion/banner.png";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
;

const MainContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({theme}) => theme.mainBackground};
  overflow-y: auto;

  ${media.sm} {
    background: url(${bg}) center no-repeat;
    background-size: cover;
  }
`;

const PromotionCardListContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: ${SUB_CONTENT_MAX_WIDTH};
  width: 100%;
  
  ${media.sm} {
    padding: 50px 20px;
    gap: 50px;
  }
`;

const Banner = styled.div`
  display: none;

  ${media.sm} {
    display: block;
    width: 100%;
    aspect-ratio: 1920 / 400;
    background: url(${banner}) center no-repeat;
    background-size: cover;
  }
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  
  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <MainContentWrapper>
      <MobileHeader title="Promotion"/>
      <Banner />

      <PromotionCardListContainer>
        {promotionList
          .sort((a, b) => a.order - b.order)
          .map((promotionData) => (
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
        ))}
      </PromotionCardListContainer>
    </MainContentWrapper>
  );
};

export default PromotionPage;
