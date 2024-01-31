import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import { usePromotionPage, useRwd } from "@tgs-web-nx/core/hooks";
import EmptyPage from "@/pages/promotion/components/EmptyPage";
import PromotionCard from "@/pages/promotion/components/PromotionCard";
import { media } from "@/theme/breakpoints";
import { PageContainer } from "@/components/styled-component/PageContainer";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";

const PromotionCardListContainer = styled.div`
  overflow-y: auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 18px 23px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 20px 0px;
  }
`;

const PromotionPage = () => {
  const { promotionList, isEmpty } = usePromotionPage();
  const { isDesktopSize } = useRwd();

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
