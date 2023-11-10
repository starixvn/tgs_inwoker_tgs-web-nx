import React from "react";
import styled from "styled-components";
import { useGeneralStore } from "@/core/stores/useGeneralStore";

const LogoImgContainer = styled.div`
  height: 55px;
  justify-self: start;
  padding: 0 10px;
  margin: 0 auto 50px;

  & > img {
    height: 100%;
  }
`;
const BrandLogo = () => {
  const {
    general: { brand },
  } = useGeneralStore();

  if (!brand.loadingUrl) return null;

  return (
    <LogoImgContainer>
      <img src={brand && brand.loadingUrl} alt={"logo"} />
    </LogoImgContainer>
  );
};

export default BrandLogo;
