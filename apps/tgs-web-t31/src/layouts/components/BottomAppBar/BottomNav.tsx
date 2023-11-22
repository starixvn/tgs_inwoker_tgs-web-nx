import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import {
  BottomNavItem,
  NavTypeEnum,
} from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";

const BottomNavContainer = styled.div<{ $isSelected: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.accountBGC};
  padding: 10px 0;
  cursor: pointer;
  padding:10px 24px;
`;

const NavLabel = styled.h6`
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1rem;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  isSelected: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick, isSelected }: Props) => {
  const { label, iconUrl, iconActiveUrl } = bottomNavItem;

  return (
    <BottomNavContainer onClick={onClick} $isSelected={isSelected}>
      <Icon
        iconUrl={isSelected ? iconActiveUrl ?? iconUrl : iconUrl}
        width={"24px"}
        height={"24px"}
        style={{
          marginBottom: "6px",
        }}
      />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
