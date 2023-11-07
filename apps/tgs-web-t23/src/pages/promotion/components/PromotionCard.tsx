import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@/core/models/dto/general/GetPromotionListResDto";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import iconMore from "@/assets/t23/images/promotion/iconMore.svg";

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
  border: 1px solid #4f4f4f;
  cursor: pointer;

  ${media.sm} {
    width: calc((100% - 40px) / 2);
  }
`;
const BannerWrapper = styled.div`
  pointer-events: none;
  width: 100%;
  //padding: 34.37% 0 0 0;
`;

const PromotionTextContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 17.5px 11px;
  gap: 20.84px;
`;

const TitleWrapper = styled.div`
  font-size: 1.062rem;
  font-weight: 400;
  color: white;
  text-overflow: ellipsis;
`;

const ClickMoreContainer = styled.div`
  flex-shrink: 0;
  width: 28px;
  margin-left: auto;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();

  const handleEnterDetail = (event: Event) => {
    event.preventDefault();

    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer onClick={(e) => handleEnterDetail(e)}>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>

      <PromotionTextContainer>
        <TitleWrapper>{promotionData.name}</TitleWrapper>

        <ClickMoreContainer>
          <Icon iconUrl={iconMore} width={"28px"} height={"28px"} />
        </ClickMoreContainer>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
