import styled from "styled-components";
import { usePromotionPage } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PromotionPageContainer } from "@/components/styled-component/PageContainer";

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px 18px;
  overflow: visible;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PromotionPageContainer>
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
