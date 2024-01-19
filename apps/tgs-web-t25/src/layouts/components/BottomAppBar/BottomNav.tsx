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
  justify-content: center;
  gap: 4px;
  text-align: center;
  color: ${({ theme }) => theme.white};
  padding: 10px 0;
  cursor: pointer;
`;

const NavLabel = styled.h6`
  font-size: 0.875rem;
  line-height: 21px;
  font-weight: 400;
  text-transform: uppercase;
  white-space: nowrap;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick }: Props) => {
  const { label, iconUrl } = bottomNavItem;

  return (
    <BottomNavContainer onClick={onClick}>
      <Icon iconUrl={iconUrl} width={"18px"} height={"18px"} />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
