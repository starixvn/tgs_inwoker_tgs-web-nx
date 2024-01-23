import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import {
  BottomNavItem,
  NavTypeEnum,
} from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";

const BottomNavContainer = styled.div<{
  $isActive: boolean,
}>`
  padding: 4px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  box-shadow: 1.1413300037384033px -3.4240000247955322px 8.5600004196167px 0px rgba(154, 128, 117, 1);
  border: 1px solid ${({ theme }) => theme.navTextDefault};
  border-radius: 6px;
  cursor: pointer;
  color: ${(props) => props.$isActive ? props.theme.labelText : props.theme.navTextDefault};

`;

const NavLabel = styled.h6`
  font-size: 0.6rem;
  text-align : center;
  
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
  isActive: boolean
};

const BottomNav = ({ bottomNavItem, onClick, isActive }: Props) => {
  const { label, iconUrl, activeIconUrl } = bottomNavItem;

  return (
    <BottomNavContainer onClick={onClick} $isActive={isActive}>
      <Icon
        iconUrl={isActive ? activeIconUrl : iconUrl}
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
