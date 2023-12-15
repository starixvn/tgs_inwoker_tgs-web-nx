import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const PromotionCardListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 30px 80px;
  }
`;

const PromotionBanner = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 137px;
  border-radius: 4px;
  background-image: url(${({ $imageUrl }) => $imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  ${media.sm} {
    height: 520px;
  }
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  const { isMobileSize, isDesktopSize } = useRwd();

  if (isEmpty) {
    return <EmptyPage />;
  }
  return (
    <PageContainer>
      <PromotionBanner $imageUrl={`${import.meta.env.BASE_URL}assets/images/promotion/promotion-banner.png`} />
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
