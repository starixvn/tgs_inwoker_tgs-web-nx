import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import headerImg from "@/assets/t34/images/promotion/promotion-header.png";
import { media } from "@/theme/breakpoints";

const PromotionPageHeaderContainer = styled.div`
  position: relative;
  width: calc(100% + 20px * 2);
  margin-left: -20px;
  margin-top: -20px;
  height: 228px;
  max-width: 1200px;

  ${media.sm} {
    margin: auto;
    width: 100%;
  }

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const TitleText = styled.h1`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
`;

const PromotionPageHeader = () => {
  return (
    <PromotionPageHeaderContainer>
      <img src={headerImg} alt={"promotion"} />

      <TitleText>{i18n.t("common.promotion")}</TitleText>
    </PromotionPageHeaderContainer>
  );
};

export default PromotionPageHeader;
