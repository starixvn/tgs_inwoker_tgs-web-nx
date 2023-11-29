import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import MemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/MemberMenu";
import AccountDesktopLayout from "@/layouts/AccountDesktopLayout";

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
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <AccountDesktopLayout>{children}</AccountDesktopLayout>;
  }

  return (
    <DialogLayoutContainer>
      <Header />
      <MenuDrawer />

      <ContentWrapper>
        {isDesktopSize && (
          <MemberMenu
            handleCloseContextMenu={() => {}}
            hideHeader={true}
            style={{ width: "222px", margin: "22px 0 0 22px", flexShrink: 0 }}
          />
        )}
        {children}
      </ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
