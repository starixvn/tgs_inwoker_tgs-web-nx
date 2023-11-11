import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";

const BottomNavContainer = styled.div`
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
  key: string;
  label: any;
  iconUrl: string;
  routePath: string;
};
type Props = {
  bottomNavItem: BottomNavItem;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const BottomNav = ({ bottomNavItem, onClick }: Props) => {
  const { label, iconUrl } = bottomNavItem;

  if (bottomNavItem.navType === "big-item") {
    return (
      <BottomNavContainer onClick={onClick}>
        <Icon
          iconUrl={iconUrl}
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
    <BottomNavContainer onClick={onClick}>
      <Icon
        iconUrl={iconUrl}
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
