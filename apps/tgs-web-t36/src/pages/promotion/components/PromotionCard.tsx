import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { i18n } from "@tgs-web-nx/utils";
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
    gap: 10px;
    width: calc((100% - 100px) / 3);
    background: transparent;
  }
`;
const BannerWrapper = styled.div`
  width: 100%;
  min-height: 120px;
`;

const PromotionTextContainer = styled.div`
  width: 100%;
  min-height: 45px;
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
  margin-right: 5px;
  ${media.sm} {
    color: ${({ theme }) => theme.white};
  }
`;

const ClickMoreContainer = styled.div`
  flex-shrink: 0;
  margin-left: auto;
`;
const MoreButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 105px;
  height: 30px;
  font-size: 15px;
  font-weight: 400;
  line-height: 14px;
  border-radius: 4px;
  color: ${({ theme }) => theme.white};
  background: linear-gradient(180deg, #2286df 0%, #184c8b 100%);
  cursor: pointer;
`;

const PromotionCard = ({ promotionData }: { promotionData: Promotion }) => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();

  const handleEnterDetail: React.MouseEventHandler<HTMLDivElement> & ((event: Event) => void) = (
    event,
  ) => {
    event.preventDefault();

    history.push("/promotion/" + promotionData.id);
  };

  return (
    <PromotionCardContainer onClick={(e) => !isDesktopSize && handleEnterDetail(e)}>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>

      <PromotionTextContainer>
        <TitleWrapper>{promotionData.name}</TitleWrapper>
        <ClickMoreContainer>
          {isDesktopSize ? (
            <MoreButton onClick={handleEnterDetail}>{i18n.t("common.more")}</MoreButton>
          ) : (
            <Icon iconUrl={rightArrow} width={"20px"} height={"20px"} />
          )}
        </ClickMoreContainer>
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
