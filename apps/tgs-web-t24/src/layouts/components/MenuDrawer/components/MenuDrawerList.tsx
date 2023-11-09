import React from "react";
import styled from "styled-components";
import { useGetNavItemList } from "@/layouts/components/MenuDrawer/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";

const MenuDrawerListContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  color: ${({ theme }) => theme.white};
  height: 100vh;
  overflow-y: scroll;
`;

const MenuRow = styled.div`
  padding: 17px 34px;
  color: ${({ theme }) => theme.gray5};
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  font-weight: 700;
`;

const MenuDrawerList = () => {
  const { gameTypeNavItemList, accountNavItemList } = useGetNavItemList();

  return (
    <MenuDrawerListContainer>
      {gameTypeNavItemList.map((navItem) => {
        const { key, iconUrl, label } = navItem;
        return (
          <MenuRow key={key}>
            <Icon iconUrl={iconUrl} width={"24px"} height={"24px"} />
            <span>{label}</span>
          </MenuRow>
        );
      })}

      {accountNavItemList.map((navItem) => {
        const { key, iconUrl, label } = navItem;
        return (
          <MenuRow key={key}>
            <Icon iconUrl={iconUrl} width={"24px"} height={"24px"} />
            <span>{label}</span>
          </MenuRow>
        );
      })}
    </MenuDrawerListContainer>
  );
};

export default MenuDrawerList;
