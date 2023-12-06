import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { i18n } from "@tgs-web-nx/utils";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import iconMore from "@/assets/t23/images/promotion/iconMore.svg";
import { Button } from "@/components/UI/Button";

type PromotionCardContainerProps = {
  onClick: (event: Event) => void;
};
const PromotionCardContainer = styled.div<PromotionCardContainerProps>`
  width: 100%;
  border-radius: 4px;
  background: ${({ theme }) => theme.grey00};
  padding: 12px;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  border: 1px solid #4f4f4f;
  cursor: pointer;

  ${media.sm} {
    width: calc((100% - 20px * 1) / 2);
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
  margin-top: auto;
`;

const TitleWrapper = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
  text-overflow: ellipsis;
  margin-bottom: 8px;
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

        <Button fullWidth>{i18n.t("common.more")}</Button>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
