import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import HomeBannerImage from "./HomeBannerImage";
import { media } from "@/theme/breakpoints";

type PromotionCardContainerProps = {
  onClick: (event: Event) => void;
};
const PromotionCardContainer = styled.div`
  width: 90%;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  height: 100%;
  aspect-ratio: 2.23;
  margin-right: 10px;
  flex-direction: column;

  ${media.sm} {
    width: calc(25% - 25px);
  }
`;

const BannerWrapper = styled.div`
  pointer-events: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const SeeMoreForDetail = styled.div<PromotionCardContainerProps>`
  width: 100%;
  height: 36px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();

  const handleEnterDetail: React.MouseEventHandler<HTMLDivElement> & ((event: Event) => void) = (
    event,
  ) => {
    event.preventDefault();

    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer>
      <BannerWrapper>
        <HomeBannerImage promotionData={promotionData} />
      </BannerWrapper>
      <SeeMoreForDetail onClick={handleEnterDetail}><p>See details</p></SeeMoreForDetail>
    </PromotionCardContainer>
  );
};

export default React.memo(HomePromotionCard);
