import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";

const PromotionCardContainer = styled.div`
  flex-shrink: 0;
  width: 90%;
  border-radius: 10px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
  height: 100%;
  aspect-ratio: 2.23;
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

const PromoInfoContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};
  height: 80px;
  padding: 10px;
  gap: 17px;
`;

const PromoInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DetailButton = styled.div`
  color: ${({ theme }) => theme.primary};
`;

const PromoInfoContent = styled.div``;

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
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>
      <PromoInfoContainer>
        <PromoInfoTitle>
          <> {promotionData.name}</>
          <DetailButton onClick={handleEnterDetail}>{i18n.t("promotion.details")}</DetailButton>
        </PromoInfoTitle>
        <PromoInfoContent>{promotionData.subSubject}</PromoInfoContent>
      </PromoInfoContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(HomePromotionCard);
