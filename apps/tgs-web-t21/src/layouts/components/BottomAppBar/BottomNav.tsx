import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import {
  BottomNavItem,
  NavTypeEnum,
} from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";
import { theme } from "@/theme";

const BottomNavContainer = styled.div`
  flex: 1;
  height: 78.11px;
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  position: relative;
  overflow: visible;
`;

const NavLabel = styled.h6`
  font-size: 11px;
  line-height: 15.38px;
  font-weight: 400;
  text-transform: uppercase;
  white-space: nowrap;
`;

const BigItemBg = styled.div`
  width: 86.93px;
  height: 86.93px;
  background: linear-gradient(180deg, #ffffff 20.4%, #56d7ff 100%);
  box-shadow: 0px 0px 8.359379768371582px 2.7864599227905273px #02d6ef;
  border-radius: 43.47px;
  position: absolute;
  z-index: 0;
  top: 0;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick }: Props) => {
  const { label, iconUrl } = bottomNavItem;

  if (bottomNavItem.navType === NavTypeEnum.BIG_ITEM) {
    return (
      <BottomNavContainer
        onClick={onClick}
        style={{
          color: theme.primary,
          padding: "0 0 14px",
        }}
      >
        <Icon iconUrl={iconUrl} width={"47px"} height={"47px"} style={{ zIndex: 1 }} />

        <NavLabel
          style={{
            fontSize: "14.4px",
            zIndex: 1,
          }}
        >
          {label}
        </NavLabel>
        <BigItemBg />
      </BottomNavContainer>
    );
  }

  return (
    <BottomNavContainer onClick={onClick}>
      <Icon iconUrl={iconUrl} width={"30.65px"} height={"30.65px"} />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
