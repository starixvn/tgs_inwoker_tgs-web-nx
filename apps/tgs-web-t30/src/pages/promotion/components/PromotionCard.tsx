import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Promotion } from "@tgs-web-nx/types";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BannerImage from "./BannerImage";
import { media } from "@/theme/breakpoints";
import Icon from "@/components/project/Icon";
import iconMore from "@/assets/t30/images/promotion/icon-more.svg";
import { Button } from "@/components/UI/Button";

type PromotionCardContainerProps = {
  onClick: (event: Event) => void;
};
const PromotionCardContainer = styled.div<PromotionCardContainerProps>`
  width: 100%;
  gap: 8px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: visible;
  cursor: pointer;
  padding: 12px;
  border-bottom: 2px solid ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    width: calc((100% - 15px * 2) / 3);
    padding: 0;
    gap: 0;
    border-bottom: none;
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
  justify-content: space-between;
  gap: 20.84px;

  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
    padding: 12.5px 20px;
  }
`;

const TitleWrapper = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.white};
  text-overflow: ellipsis;

  ${media.sm} {
    font-size: 0.875rem;
  }
`;

const ClickMoreContainer = styled.div`
  flex-shrink: 0;
  width: 28px;
  margin-left: auto;
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
    <PromotionCardContainer onClick={handleEnterDetail}>
      <BannerWrapper>
        <BannerImage promotionData={promotionData} />
      </BannerWrapper>

      <PromotionTextContainer>
        <TitleWrapper>{promotionData.name}</TitleWrapper>

        {isDesktopSize ? (
          <Button
            sx={{
              borderBottom: "none",
              fontSize: "0.875rem",
              padding: " 7px 36px",
              borderRadius: "4px",
            }}
          >
            More
          </Button>
        ) : (
          <ClickMoreContainer>
            <Icon iconUrl={iconMore} width={"28px"} height={"28px"} />
          </ClickMoreContainer>
        )}
      </PromotionTextContainer>
    </PromotionCardContainer>
  );
};

export default React.memo(PromotionCard);
