import DialogHeader, { DIALOG_HEADER_HEIGHT } from "@/components/UI/Dialog/DialogHeader";
import AccountDesktopLayout from "@/layouts/AccountDesktopLayout";
import { MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { usePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.dialogBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${DIALOG_HEADER_HEIGHT} - ${MOBILE_HEADER_HEIGHT});
  margin: calc(${`${DIALOG_HEADER_HEIGHT} + ${MOBILE_HEADER_HEIGHT}) auto 0`};
  position: relative;
  z-index: 1;

  display: flex;
  justify-content: center;
`;

const DockHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(${DIALOG_HEADER_HEIGHT} + ${MOBILE_HEADER_HEIGHT});
  z-index: 1300;
`;

const AccountHeader = styled.div`
  height: ${MOBILE_HEADER_HEIGHT};
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

  return (
    <DialogLayoutContainer>
      <DockHeader>
        <AccountHeader><Header /></AccountHeader>
        <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
      </DockHeader>
      <ContentWrapper>{children}</ContentWrapper>
      {/* <BottomAppBar /> */}
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
