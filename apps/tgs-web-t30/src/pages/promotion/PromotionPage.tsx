import styled from "styled-components";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PromotionPageContainer } from "@/components/styled-component/PageContainer";
import PromotionBanner from "@/pages/promotion/components/PromotionBanner";

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow: visible;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }

  ${media.lg} {
    //width: calc(100% + 10px * 2);
    //margin-left: -10px;
  }
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  const { isDesktopSize } = useRwd();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PromotionPageContainer>
      {isDesktopSize && <PromotionBanner />}

      <PromotionCardListContainer>
        {promotionList
          .sort((a, b) => a.order - b.order)
          .map((promotionData) => (
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
          ))}
      </PromotionCardListContainer>
    </PromotionPageContainer>
  );
};

export default PromotionPage;
