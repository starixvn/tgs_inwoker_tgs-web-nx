import { useGeneralStore } from "@tgs-web-nx/core";
import styled from "styled-components";
import { Promotion as TypePromotion } from "@tgs-web-nx/types";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import { media } from "@/theme/breakpoints";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";

const PromotionContainer = styled.div`
  padding: 22px 20px;
  ${media.sm} {
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 0;
`;

const TitleText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const PromotionPage = () => {
  const {
    general: {
      promotionList: { items = [] },
    },
  } = useGeneralStore();

  const isEmpty = items.length === 0;

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PromotionContainer>
      <TitleText>Promotions</TitleText>
      <PromotionCardListContainer>
        {items
          .sort((a: TypePromotion, b: TypePromotion) => a.order - b.order)
          .map((promotionData: TypePromotion) => (
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
          ))}
      </PromotionCardListContainer>
    </PromotionContainer>
  );
};

export default PromotionPage;
