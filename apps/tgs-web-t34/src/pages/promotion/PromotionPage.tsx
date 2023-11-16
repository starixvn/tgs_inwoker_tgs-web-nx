import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PageContainer } from "@/components/styled-component/PageContainer";
import PromotionPageHeader from "@/pages/promotion/components/PromotionPageHeader";

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 30px 0;

  ${media.sm} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const TitleText = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.black};
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  const { isDesktopSize } = useRwd();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PageContainer>
      {!isDesktopSize && <PromotionPageHeader />}
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
