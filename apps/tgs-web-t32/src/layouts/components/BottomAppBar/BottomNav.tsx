import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import {
  BottomNavItem,
  NavTypeEnum,
} from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";

const BottomNavContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: ${({ theme }) => theme.white};
  padding: 10px 0;
  cursor: pointer;
`;

const NavLabel = styled.h6`
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  white-space: nowrap;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick }: Props) => {
  const { label, iconUrl } = bottomNavItem;

  if (bottomNavItem.navType === NavTypeEnum.BIG_ITEM) {
    return (
      <BottomNavContainer onClick={onClick}>
        <Icon
          iconUrl={iconUrl}
          width={"47px"}
          height={"47px"}
          style={{
            marginBottom: "13px",
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
        width={"24px"}
        height={"24px"}
        style={{
          marginBottom: "5px",
        }}
      />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
