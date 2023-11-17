import React from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";

const LogoImgContainer = styled.div`
  height: 48px;
  justify-self: start;
  padding: 0 10px;
  margin: 0 auto;

  & > img {
    height: 100%;
    display: block;
    margin: auto;
  }
`;

const BrandLogo = (props: React.HTMLProps<HTMLDivElement>) => {
  const {
    general: { brand },
  } = useGeneralStore();

  if (!brand.loadingUrl) return null;

  return (
    //@ts-ignore
    <LogoImgContainer {...props}>
      <img src={brand.loadingUrl} alt={"logo"} />
    </LogoImgContainer>
  );
};

export default BrandLogo;
