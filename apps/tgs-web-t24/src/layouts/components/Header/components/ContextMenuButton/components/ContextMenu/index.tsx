import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React from "react";
import { i18n } from "@tgs-web-nx/utils";
import { useAuth, useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import ContextMenuItem from "./ContextMenuItem";
import { useGetNavItemList } from "@/layouts/components/MenuDrawer/hooks/useGetNavItemList";
import logoutIcon from "@/assets/t24/images/menuDrawer/icon-logout.svg";
import { theme } from "@/theme";

const ContextMenuContainer = styled.div`
  background: ${({ theme }) => theme.white};
  border-radius: 3px;
  position: fixed;
  top: 44px;
  right: 25px;
  z-index: 99;
`;
const ContextMenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 44px);
  gap: 10px;
`;

const ContextMenu = () => {
  const { handleLogout } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { accountNavItemList } = useGetNavItemList();

  const handleClick = async (routerPath: string) => {
    switch (routerPath) {
      case "/logout":
        if (!isDesktopSize && isMenuOpen) {
          handleToggleMenu(false);
        }

        await handleLogout();
        break;

      case "/account":
        history.push("/account");
        break;

      case "/main/support":
        history.push("/support");
        break;

      default:
        history.push(routerPath);
        break;
    }
  };

  return (
    <ContextMenuContainer>
      <ContextMenuItemWrapper>
        {accountNavItemList.map((navItem) => {
          if (navItem.navType !== "route") return null;

          const { label, iconUrl, routePath } = navItem;

          if (routePath === "/logout") return null;

          return (
            <ContextMenuItem
              key={label}
              label={label}
              iconUrl={iconUrl}
              onClick={() => handleClick(routePath)}
            />
          );
        })}

        <ContextMenuItem
          key={"logout"}
          label={i18n.t("web.header.logout")}
          iconUrl={logoutIcon}
          onClick={() => handleClick("/logout")}
          style={{
            borderTop: `1px solid ${theme.gray30}`,
          }}
        />
      </ContextMenuItemWrapper>
    </ContextMenuContainer>
  );
};

export default ContextMenu;
