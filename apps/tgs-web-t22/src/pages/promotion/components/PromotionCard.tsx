import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import { RoundHeaderButton } from "@/layouts/components/Header/components/HeaderButton";
import iconArrow from "@/assets/t23/images/promotion/icon_arrow.svg";

const PromotionCardContainer = styled.div`
  padding: 20px;
  background: #fff;
  border-radius: 16px;
  width: 100%;
  line-height: 0;
  cursor: pointer;

  ${media.sm} {
    padding: 0;
    background: none;
  }
`;

const Text = styled.p`
  color: ${({theme}) => theme.black};
  font-size: .8rem;
  font-weight: 400;
  line-height: 23px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${media.sm} {
    font-weight: 700;
    line-height: 18px;
  }
`;

const DetailContainer = styled.div`
  margin-top: 10px;
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  ${media.sm} {
    margin-top: 20px;
    padding: 15px 20px;
    border-radius: 16px;
    background: linear-gradient(90deg, #D8BFAA 0%, #FEE8D3 52%, #D5B89F 100%);
  }
`;

const Arrow = styled.img`
  width: 24px;
  height: 24px;
  transform: rotate(180deg);
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
    <PromotionCardContainer onClick={handleEnterDetail}>
      <BannerImage promotionData={promotionData} />
      <DetailContainer>
        <Text>{promotionData.subSubject}</Text>
        {!isMobileSize && <RoundHeaderButton>Details</RoundHeaderButton>}
        {isMobileSize && <Arrow src={iconArrow} alt="arrow" />}
      </DetailContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
