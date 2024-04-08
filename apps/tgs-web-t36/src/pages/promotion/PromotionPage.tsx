import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PageContainer } from "@/components/styled-component/PageContainer";

const PromotionCardListContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px 20px;

  ${media.sm} {
    margin: 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px
  }
`;

const PromotionBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  padding-top: 27%;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

const TitleText = styled.h1`
  font-size: 1.25rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  const { isDesktopSize } = useRwd();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PageContainer>
      {isDesktopSize && (
        <PromotionBanner
          $imageUrl={`${import.meta.env.BASE_URL}assets/images/promotion/promotion-banner.png`}
        />
      )}
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
