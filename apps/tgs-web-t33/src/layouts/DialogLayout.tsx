import React, { ReactElement } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";

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
  children: ReactElement;
};
const DialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();

  return (
    <DialogLayoutContainer>
      <Header />
      {!isDesktopSize && <MenuDrawer />}

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
