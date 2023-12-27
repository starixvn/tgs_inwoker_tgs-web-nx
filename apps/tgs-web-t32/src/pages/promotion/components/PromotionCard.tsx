import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";

type PromotionCardContainerProps = {
  onClick: (event: Event) => void;
};
const PromotionCardContainer = styled.div<PromotionCardContainerProps>`
  width: 100%;
  border-radius: 10px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  cursor: pointer;

  ${media.sm} {
    width: calc((100% - 40px) / 2);
  }
`;
const BannerWrapper = styled.div`
  pointer-events: none;
  width: 100%;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();

  const handleEnterDetail: React.MouseEventHandler<HTMLDivElement> & ((event: Event) => void) = (
    event,
  ) => {
    event.preventDefault();

    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer onClick={handleEnterDetail}>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
