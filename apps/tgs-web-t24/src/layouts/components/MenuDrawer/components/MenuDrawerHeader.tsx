import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useGeneralStore } from "@tgs-web-nx/core";
import { HEADER_HEIGHT } from "@/theme/constants";
import iconClose from "@/assets/t24/images/menuDrawer/close.svg";
import Icon from "@/components/project/Icon";
import { useHeader } from "@/core/feature/useHeader";

const MenuHeaderContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  position: relative;
  height: ${HEADER_HEIGHT};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px 0 16px;
  gap: 36px;
  border-right: 1px solid ${({ theme }) => theme.gray80};
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

const MenuDrawerHeader = () => {
  const {
    general: { brand },
  } = useGeneralStore();
  const { handleToggleMenu } = useHeader();

  return (
    <MenuHeaderContainer>
      <Link to={"/"}>
        <LogoImgContainer>
          <img src={brand && brand.loadingUrl} alt={"logo"} />
        </LogoImgContainer>
      </Link>

      <Icon
        iconUrl={iconClose}
        width={"36px"}
        height={"36px"}
        onClick={() => handleToggleMenu(false)}
        style={{ cursor: "pointer" }}
      />
    </MenuHeaderContainer>
  );
};

export default MenuDrawerHeader;
