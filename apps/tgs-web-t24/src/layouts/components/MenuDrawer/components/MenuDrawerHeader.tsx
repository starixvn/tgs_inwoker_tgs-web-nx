import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import MenuButton from "@/layouts/components/Header/components/MenuButton";
import { HEADER_HEIGHT } from "@/theme/constants";
import { useGeneralStore } from "@/core/stores/useGeneralStore";

const MenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  position: relative;
  height: ${HEADER_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 12px 0 0 16px;
  gap: 36px;
`;

const LogoImgContainer = styled.div`
  max-width: 100px;
  height: 27px;
  justify-self: start;
  padding: 0 10px;

  & > img {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
`;

const MenuButtonContainer = styled.div``;

const MenuDrawerHeader = () => {
  const {
    general: { brand },
  } = useGeneralStore();

  return (
    <MenuHeaderContainer>
      <MenuButtonContainer>
        <MenuButton width={"18px"} height={"18px"} />
      </MenuButtonContainer>

      <Link to={"/"}>
        <LogoImgContainer>
          <img src={brand && brand.loadingUrl} alt={"logo"} />
        </LogoImgContainer>
      </Link>
    </MenuHeaderContainer>
  );
};

export default MenuDrawerHeader;
