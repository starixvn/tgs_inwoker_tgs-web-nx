import React, { useCallback } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { useHistory, useLocation } from "react-router";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
import AccountDesktopLayout from "@/layouts/AccountDesktopLayout";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`${HEADER_HEIGHT} auto ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
`;

type Props = {
  children: React.ReactNode;
};
const DialogLayout = ({ children }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const { pageName } = usePageName();
  const { isDesktopSize } = useRwd();
  const pathname = location.pathname;

  const handleCloseDialog = useCallback(() => {
    const profileRegex = /\/profile\//;
    if (profileRegex.test(pathname)) {
      return history.push("/profile");
    }

    if (pathname === "/profile") {
      return history.push("/account");
    }

    history.goBack();
  }, [history, pathname]);

  if (isDesktopSize) {
    return <AccountDesktopLayout>{children}</AccountDesktopLayout>;
  }

  return (
    <DialogLayoutContainer>
      <Header />
      <MenuDrawer />

      <ContentWrapper>
        {isDesktopSize && (
          <DarkMemberMenu
            handleCloseContextMenu={() => {}}
            style={{ width: "222px", margin: "22px 0 0 22px", flexShrink: 0 }}
          />
        )}
        {children}
      </ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
