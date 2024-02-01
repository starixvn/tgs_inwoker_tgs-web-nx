import styled from "styled-components";
import { usePromotionPage } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PageContainer } from "@/components/styled-component/PageContainer";

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${media.sm} {
    gap: 30px;
  }
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PageContainer>
      <PromotionCardListContainer>
        {promotionList
          .sort((a, b) => a.order - b.order)
          .map((promotionData) => (
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
          ))}
      </PromotionCardListContainer>
    </PageContainer>
  );
};

export default PromotionPage;
