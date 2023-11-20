import React from "react";
import styled from "styled-components";
import { Promotion } from "@tgs-web-nx/types";
import { NOT_SHOW_JOIN_BUTTON_KEY_LIST } from "@tgs-web-nx/constants";
import DetailHeader, { DETAIL_HEADER_HEIGHT } from "@/pages/promotion/components/DetailHeader";
import JoinPromotionButton from "@/pages/promotion/components/JoinPromotionButton";
import { media } from "@/theme/breakpoints";

const DetailLayoutContainer = styled.div``;
const ChildWrapper = styled.div`
  padding: ${DETAIL_HEADER_HEIGHT} 12px 12px;
`;

const JoinPromotionButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 22px;
  background: ${({ theme }) => theme.mainLightBackground};
  ${media.sm} {
    position: relative;
    background: transparent;
  }
`;

type Props = {
  promotionData: Promotion;
  children: React.ReactElement;
};
const DetailLayout = ({ promotionData, children }: Props) => {
  const targetPromotionType = promotionData?.promotionType?.toUpperCase?.() || "";
  const showJoinButton = !NOT_SHOW_JOIN_BUTTON_KEY_LIST.includes(targetPromotionType);

  return (
    <DetailLayoutContainer>
      <DetailHeader />
      <ChildWrapper>{children}</ChildWrapper>

      {showJoinButton && (
        <JoinPromotionButtonWrapper>
          <JoinPromotionButton id={promotionData.id} promotionType={promotionData.promotionType} />
        </JoinPromotionButtonWrapper>
      )}
    </DetailLayoutContainer>
  );
};

export default DetailLayout;
