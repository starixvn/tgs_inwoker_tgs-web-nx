import React from "react";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";

const LogoImgContainer = styled.div`
  height: 48px;
  max-width: 100px;
  flex-shrink: 0;
  justify-self: start;
  padding: 0 10px;
  margin: 0 auto;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
    display: block;
    margin: auto;
  }
`;

const BrandLogo = (props: React.HTMLProps<HTMLDivElement>) => {
  const {
    general: { brand },
  } = useGeneralStore();

  const logoUrl = brand.loadingUrl;
  // const logoUrl = "https://images.srvptt.com/Brand%20Logo/MOMOVN.png";
  if (!logoUrl) return null;

  return (
    //@ts-ignore
    <LogoImgContainer {...props}>
      <img src={logoUrl} alt={"logo"} />
    </LogoImgContainer>
  );
};

export default BrandLogo;
