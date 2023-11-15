import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import MemberMenuHeader from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenuHeader";

const MemberMenuContainer = styled.div``;

type MemberMenuItemProps = {
  $isActive: boolean;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  font-size: 0.875rem;
  font-weight: 500;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ $isActive, theme }) => theme.black};
  background: ${({ $isActive, theme }: MemberMenuItemProps) =>
    $isActive ? theme.primary : theme.white};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.gray10};
  }
`;

type Props = {
  handleCloseContextMenu: () => void;
} & React.HTMLProps<HTMLDivElement>;

const WhiteMemberMenu = ({ handleCloseContextMenu, ...others }: Props) => {
  const { accountNavItemList } = useGetNavItemList();
  const history = useHistory();

  const handleClick = (navItem) => {
    switch (navItem.navType) {
      case "route":
        history.push(navItem.routePath);
        break;

      case "action":
        navItem.callback();
        handleCloseContextMenu();
    }
  };

  return (
    //@ts-ignore
    <MemberMenuContainer {...others}>
      <MemberMenuHeader handleCloseContextMenu={handleCloseContextMenu} />

      {accountNavItemList.map((navItem) => {
        return (
          <MemberMenuItem key={navItem.key} $isActive={false} onClick={() => handleClick(navItem)}>
            <Icon iconUrl={navItem.darkIconUrl || ""} width={"24px"} height={"24px"} />
            <span className={"label"}>{navItem.label}</span>
          </MemberMenuItem>
        );
      })}
    </MemberMenuContainer>
  );
};

export default WhiteMemberMenu;
