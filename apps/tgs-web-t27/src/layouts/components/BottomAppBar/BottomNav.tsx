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
  color: ${({ theme }) => theme.darkPrimary};
  padding: 10px 0;
  cursor: pointer;
`;

const NavLabel = styled.h6`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 0.875rem;
`;

const ActiveNavLabel = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 0.875rem;
  font-weight: 510;
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
          width={"62px"}
          height={"62px"}

          style={{
            marginBottom: "10px",
          }}
        />

        <ActiveNavLabel>{label}</ActiveNavLabel>
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
          marginBottom: "5px",
        }}
      />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
