import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
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
`;
const BannerWrapper = styled.div`
  pointer-events: none;
  width: 100%;
`;

const SubSubject = styled.div`
  color: ${({ theme }) => theme.white};
  font-size: 16px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const handleEnterDetail: React.MouseEventHandler<HTMLDivElement> & ((event: Event) => void) = (
    event,
  ) => {
    event.preventDefault();
    if (isDesktopSize) {
      return history.push("/promotion/" + promotionData.id);
    }
  };

  return (
    <PromotionCardContainer onClick={handleEnterDetail}>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
        <SubSubject>{promotionData.subSubject}</SubSubject>
      </BannerWrapper>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
