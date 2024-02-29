import React, { useCallback } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import { BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import AccountDesktopLayout from "@/layouts/AccountDesktopLayout";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`calc(${MOBILE_HEADER_HEIGHT} + ${MOBILE_HEADER_HEIGHT}) auto ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;

  //display: flex;
  //justify-content: center;
`;

type Props = {
  children: React.ReactNode;
};
const DialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();
  const { pageName } = usePageName();
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    history.goBack();
  }, [history]);

  if (isDesktopSize) {
    return <AccountDesktopLayout>{children}</AccountDesktopLayout>;
  }

  if (isDesktopSize) {
    return <AccountDesktopLayout>{children}</AccountDesktopLayout>;
  }

  return (
    <DialogLayoutContainer>
      <Header />
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />

      <MenuDrawer />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
