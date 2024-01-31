import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@tgs-web-nx/core/hooks";

type MoreOnclickProps = {
  onClick: (event: Event) => void;
};

const PromotionCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 5px;
  flex-shrink: 0;

  ${media.sm} {
    width: calc((100% - 80px) / 2);
  }
`;
const BannerWrapper = styled.div<MoreOnclickProps>`
  width: 100%;
  cursor: pointer;
`;

const HomePromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();
  const { isMobileSize } = useRwd();

  const handleEnterDetail: React.MouseEventHandler<HTMLDivElement> & ((event: Event) => void) = (
    event,
  ) => {
    event.preventDefault();

    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer>
      <BannerWrapper onClick={handleEnterDetail}>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>
    </PromotionCardContainer>
  );
};

export default React.memo(HomePromotionCard);
