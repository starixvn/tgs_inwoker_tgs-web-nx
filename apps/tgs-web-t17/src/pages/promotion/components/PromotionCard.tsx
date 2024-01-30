import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import { useRwd } from "@tgs-web-nx/core/hooks";
import moreIcon from "@/assets/t19/images/home/moreIcon.png";

type MoreOnclickProps = {
  onClick: (event: Event) => void;
};

const PromotionCardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  border-radius: 10px 10px 0px 0px;
  flex-shrink: 0;

  &:hover {
      transform: scale(1.02);
    }

  ${media.sm} {
    width: calc((100% - 36px) / 3);
  }
`;

const BannerWrapper = styled.div<MoreOnclickProps>`
  width: 100%;
  cursor: pointer;
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
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
