import React from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useGetNavItemList } from "@/layouts/hooks/useGetNavItemList";
import Icon from "@/components/project/Icon";
import MemberMenuHeader from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenuHeader";

const MemberMenuContainer = styled.div`
  overflow: visible;
`;

type MemberMenuItemProps = {
  $isActive: boolean;
};

const MemberMenuItem = styled.div<MemberMenuItemProps>`
  font-size: 1rem;
  font-weight: 700;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ $isActive, theme }) => theme.white};
  cursor: pointer;

  &:hover {
    background: #00000055;
  }
`;

const ItemContainer = styled.div`
  padding: 20px;
`;

type Props = {
  handleCloseContextMenu: () => void;
  hideHeader?: boolean;
} & React.HTMLProps<HTMLDivElement>;

const MemberMenu = ({ handleCloseContextMenu, hideHeader, ...others }: Props) => {
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
      {!hideHeader && <MemberMenuHeader handleCloseContextMenu={handleCloseContextMenu} />}

      <ItemContainer>
        {accountNavItemList.map((navItem) => {
          return (
            <MemberMenuItem
              key={navItem.key}
              $isActive={false}
              onClick={() => handleClick(navItem)}
            >
              <Icon iconUrl={navItem.iconUrl || ""} width={"24px"} height={"24px"} />
              <span className={"label"}>{navItem.label}</span>
            </MemberMenuItem>
          );
        })}
      </ItemContainer>
    </MemberMenuContainer>
  );
};

export default MemberMenu;
