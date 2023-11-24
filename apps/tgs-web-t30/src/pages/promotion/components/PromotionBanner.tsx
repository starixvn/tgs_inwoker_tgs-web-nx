import React from "react";
import styled from "styled-components";
import { i18n } from "@tgs-web-nx/utils";
import headerImg from "@/assets/t30/images/promotion/header.png";

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 335px;
  max-width: 1350px;
  margin-bottom: 10px;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.white};
  -webkit-text-stroke: 2px #59b1ff;
  position: absolute;
  top: 50%;
  left: 72px;
  font-size: 5rem;
  transform: translateY(-50%);
`;

const PromotionBanner = () => {
  return (
    <ImageContainer>
      <Title>{i18n.t("common.promotion")}</Title>
      <img src={headerImg} alt={"promotion"} />
    </ImageContainer>
  );
};

export default PromotionBanner;
