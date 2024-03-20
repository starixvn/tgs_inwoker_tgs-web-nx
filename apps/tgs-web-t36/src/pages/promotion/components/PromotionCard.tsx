import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import moreIcon from "@/assets/t36/images/home/moreIcon.png";

type MoreOnclickProps = {
  onClick: (event: Event) => void;
};

const PromotionCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 4px;
  flex-shrink: 0;
  gap: 16px;

  &:hover {
      transform: scale(1.02);
    }

  ${media.sm} {
    width: calc((100% - 80px) / 2);
    margin: 20px 0;
  }
`;
const BannerWrapper = styled.div<MoreOnclickProps>`
  width: 100%;
  cursor: pointer;
`;

const PromotionTextContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  /* padding: 10px 20px; */
`;

const TitleWrapper = styled.div`
  font-size: 1.062rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
  text-overflow: ellipsis;
`;

const ClickMoreContainer = styled.div`
  flex-shrink: 0;
  margin-left: auto;
  width: 100px;
`;

const MoreBtn = styled.div<MoreOnclickProps>`
  padding: 16px 0px;
  height: 48px;
  color: ${({ theme }) => theme.white};
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  border-radius: 4px;
  background: ${({ theme }) => theme.secondaryGradient};
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
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

      <PromotionTextContainer>
        <TitleWrapper>{promotionData.name}</TitleWrapper>
        <ClickMoreContainer>
          {/* {isMobileSize
            ? <Icon iconUrl={moreIcon} width={"28px"} height={"28px"} onClick={handleEnterDetail} />
            : <MoreBtn onClick={handleEnterDetail}>More</MoreBtn>
          } */}
          <MoreBtn onClick={handleEnterDetail}>More</MoreBtn>
        </ClickMoreContainer>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
