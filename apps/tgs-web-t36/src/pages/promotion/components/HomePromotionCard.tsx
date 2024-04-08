import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import HomeBannerImage from "./HomeBannerImage";
import { media } from "@/theme/breakpoints";

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

const PromotionWrapper = styled.div`
  width: 100%;
  height: 70px;
  padding: 20px;
  background-color: ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.white};
  font-size: 12px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PromtionTitle = styled.div`
  width: 200px;
  font-size: 17px;
  font-weight: 400;
  line-height: 20px;
  white-space: pre-line;
`;

const DetailButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 105px;
  height: 34px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  background: ${({ theme }) => theme.primaryGradient};
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
      <PromotionWrapper>
        <PromtionTitle>{promotionData.name}</PromtionTitle>
        <DetailButton onClick={handleEnterDetail}>{i18n.t("promotion.details")}</DetailButton>
      </PromotionWrapper>
    </PromotionCardContainer>
  );
};

export default React.memo(HomePromotionCard);
