import React, { useCallback } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import HomeLayout from "./HomeLayout";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import { DIALOG_HEADER_HEIGHT } from "@/theme/constants";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${DIALOG_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`${DIALOG_HEADER_HEIGHT} auto ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
`;

type Props = {
  children: React.ReactNode;
};
const HomeDialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();
  const { pageName } = usePageName();
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    history.goBack();
  }, [history]);

  // 不需要左側選單
  if (isDesktopSize) {
    return <HomeLayout>{children}</HomeLayout>;
  }

  return (
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />

      <ContentWrapper>
        {isDesktopSize && (
          <DarkMemberMenu
            handleCloseContextMenu={() => {}}
            style={{ width: "222px", margin: "22px 0 0 22px", flexShrink: 0, minHeight: "800px" }}
          />
        )}
        {children}
      </ContentWrapper>

      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default HomeDialogLayout;
