import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { RouteCategoryEnum } from "@/router";
import Icon from "@/components/project/Icon";

const BottomNavContainer = styled.div<{ $isSelected: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #bdbdbd;
  padding: 10px 0;
  cursor: pointer;
`;

const NavLabel = styled.h6`
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1rem;
`;

export enum NavTypeEnum {
  ITEM,
  BIG_ITEM,
  MENU,
}

export type BottomNavItem = {
  navType: NavTypeEnum;
  label: string;
  iconUrl: string;
  iconActiveUrl: string;
  routePath: string;
  routeCategory: RouteCategoryEnum;
};

type Props = {
  bottomNavItem: BottomNavItem;
  isSelected: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick, isSelected }: Props) => {
  const { label, iconUrl, iconActiveUrl } = bottomNavItem;

  if (bottomNavItem.navType === NavTypeEnum.BIG_ITEM) {
    return (
      <BottomNavContainer onClick={onClick} $isSelected={isSelected}>
        <Icon
          iconUrl={isSelected ? iconActiveUrl ?? iconUrl : iconUrl}
          width={"64px"}
          height={"64px"}
          style={{
            marginBottom: "6px",
          }}
        />

        <NavLabel>{label}</NavLabel>
      </BottomNavContainer>
    );
  }

  return (
    <BottomNavContainer onClick={onClick} $isSelected={isSelected}>
      <Icon
        iconUrl={isSelected ? iconActiveUrl ?? iconUrl : iconUrl}
        width={"26px"}
        height={"26px"}
        style={{
          marginBottom: "6px",
        }}
      />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
