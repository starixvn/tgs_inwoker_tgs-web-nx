import styled from "styled-components";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { useGeneralStore } from "@/core/stores/useGeneralStore";
import { Promotion } from "@/core/models/dto/general/GetPromotionListResDto";
import { media } from "@/theme/breakpoints";
import { useUpdatePageName } from "@/core/feature/usePageName/useUpdatePageName";
import i18n from "@/utils/i18n";
import { usePromotionPage } from "@/core/hooks/pages/promotion/usePromotionPage";

const PromotionContainer = styled.div`
  padding: 22px 18px;
  ${media.sm} {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px 18px;
  margin: 30px 0;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const TitleText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PromotionContainer>
      <TitleText>{i18n.t("common.promotion")}</TitleText>
      <PromotionCardListContainer>
        {promotionList
          .sort((a, b) => a.order - b.order)
          .map((promotionData) => (
            <PromotionCard key={promotionData.id} promotionData={promotionData} />
          ))}
      </PromotionCardListContainer>
    </PromotionContainer>
  );
};

export default PromotionPage;
