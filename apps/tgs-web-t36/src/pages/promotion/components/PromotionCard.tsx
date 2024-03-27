import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import rightArrow from "@/assets/t36/images/dialog/arrow_right.svg";

const PromotionCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 4px;
  flex-shrink: 0;
  gap: 16px;
  background: ${({ theme }) => theme.grey01};
  padding: 12px;
  &:hover {
    transform: scale(1.02);
  }

  ${media.sm} {
    width: calc((100% - 80px) / 2);
    margin: 20px 0;
  }
`;
const BannerWrapper = styled.div`
  width: 100%;
  cursor: pointer;
`;

const PromotionTextContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  font-size: 16px;
  font-weight: 400;
  line-height: 22.83px;
  text-overflow: ellipsis;
`;

const ClickMoreContainer = styled.div`
  flex-shrink: 0;
  margin-left: auto;
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

      <PromotionTextContainer>
        <TitleWrapper>{promotionData.name}</TitleWrapper>
        <ClickMoreContainer>
          <Icon iconUrl={rightArrow} width={"20px"} height={"20px"} />
        </ClickMoreContainer>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
