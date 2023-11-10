import styled from "styled-components";
import { useHistory } from "react-router-dom";
import React, { useMemo } from "react";
import ContextMenuItem from "./ContextMenuItem";
import i18n from "@/core/utils/i18n";
import accountImg from "@/assets/t23/images/header/contextMenu/icon_my_account.svg";
import supportImg from "@/assets/t23/images/header/contextMenu/icon_service_support.svg";
import logoutImg from "@/assets/t23/images/header/contextMenu/icon_logout.svg";
import { useAuth } from "@/core/feature/useAuth";
import { Button } from "@/components/UI/Button";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { useHeader } from "@/core/feature/useHeader";

const ContextMenuContainer = styled.div`
  padding: 15px;
  background: ${({ theme }) => theme.secondary};
  border-radius: 20px;
  position: fixed;
  top: 45px;
  right: 5px;
  z-index: 99;
`;
const ContextMenuItemWrapper = styled.div`
  display: grid;
  gap: 10px;
`;
const VersionTagContainer = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 0.75rem;
  margin-top: 10px;
`;

const ContextMenu = () => {
  const { handleLogout, logoutState } = useAuth();
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { isMenuOpen, handleToggleMenu } = useHeader();

  const contextMenuList = useMemo(() => {
    return [
      {
        label: i18n.t("wap.main.my"),
        iconUrl: accountImg,
        routePath: "/account",
      },
      {
        label: i18n.t("support.online"),
        iconUrl: supportImg,
        routePath: "/main/support",
      },
      {
        label: i18n.t("wap.main.account.signout"),
        iconUrl: logoutImg,
        routePath: "/logout",
      },
    ];
  }, []);

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
    }
  };

  return (
    <ContextMenuContainer>
        <ContextMenuItemWrapper>
          {contextMenuList.map((contextMenuItem) => {
            const { label, iconUrl, routePath } = contextMenuItem;

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

          <Button
            variant={"contained"}
            onClick={handleLogout}
            fullWidth
            sx={{
              color: "white",
              background: "linear-gradient(90deg, #40434C 49.31%, #363942 49.63%)",
              fontSize: "1.125rem",
              height: "44px",
            }}
          >
            <>{i18n.t("web.header.logout")}</>
          </Button>
        </ContextMenuItemWrapper>
        <VersionTagContainer>V1.1.3795703</VersionTagContainer>
      </ContextMenuContainer>
  );
};

export default ContextMenu;
