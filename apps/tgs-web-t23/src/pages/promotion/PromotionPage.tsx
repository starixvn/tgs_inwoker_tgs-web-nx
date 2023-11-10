import styled from "styled-components";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import i18n from "@/core/utils/i18n";
import { usePromotionPage } from "@/core/hooks/pages/promotion/usePromotionPage";
import { PageContainer } from "@/components/styled-component/PageContainer";

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
    <PageContainer>
      <TitleText>{i18n.t("common.promotion")}</TitleText>
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
