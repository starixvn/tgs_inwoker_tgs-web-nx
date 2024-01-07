import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import Icon from "@/components/project/Icon";
import {
  BottomNavItem,
  NavTypeEnum,
} from "@/layouts/components/BottomAppBar/hooks/useGetBottomNavItemList";
import depositBg from "@/assets/t27/images/bottomAppBar/icon-deposit-bg.png";

const BigBottomNavContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.g2};
  padding: 0px 24.859px 11.02px 24.821px;
  cursor: pointer;
  gap:  2.13px;
  flex-shrink: 0;
`;

const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  fill: ${({ theme }) => theme.g4};
  background-image: url(${depositBg});
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomNavContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.g2};
  padding: 9.969px 8.55px 11.02px 8.56px;
  cursor: pointer;
  gap: 1.446px;
  flex-shrink: 0;
`;

const NavLabel = styled.h6`
  font-size: 9.6px;
  font-weight: 600;
  white-space: nowrap;
`;

const ActiveNavLabel = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 9.6px;
  font-weight: 600;
`;

type Props = {
  bottomNavItem: BottomNavItem;
  onClick: MouseEventHandler<HTMLDivElement>;
};

const BottomNav = ({ bottomNavItem, onClick }: Props) => {
  const { label, iconUrl } = bottomNavItem;

  if (bottomNavItem.navType === NavTypeEnum.BIG_ITEM) {
    return (
      <BigBottomNavContainer onClick={onClick}>
        <Wrapper>
          <Icon
            iconUrl={iconUrl}
            width={"35.96px"}
            height={"35.96px"}

            style={{
              padding: "7.77px 7.78px 7.77px 7.76px",
              background: "conic-gradient(from 0deg at 50% 50%, #8853FC 0deg, #6E34E2 360deg)",
              borderRadius: "17.98px"
            }}
          />
        </Wrapper>

        <NavLabel>{label}</NavLabel>
      </BigBottomNavContainer>
    );
  }

  return (
    <BottomNavContainer onClick={onClick}>
      <Icon
        iconUrl={iconUrl}
        width={"20px"}
        height={"20px"}
        style={{
          marginBottom: "3px",
        }}
      />

      <NavLabel>{label}</NavLabel>
    </BottomNavContainer>
  );
};

export default BottomNav;
