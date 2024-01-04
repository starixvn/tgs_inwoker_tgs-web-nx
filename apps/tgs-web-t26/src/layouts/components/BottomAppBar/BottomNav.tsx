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
  color: #aaaaaa;
  padding: 10px 0;
  cursor: pointer;
`;

const NavLabel = styled.h6`
  font-size: 14px;
  font-weight: 400;
  line-height: 15px;
  letter-spacing: 0em;
  text-align: left;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick }: Props) => {
  const { label, iconUrl } = bottomNavItem;

  return (
    <BottomNavContainer onClick={onClick}>
      <Icon
        iconUrl={iconUrl}
        width={"30px"}
        height={"30px"}
        style={{
          marginBottom: "5px",
        }}
      />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
