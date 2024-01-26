import React, { ReactElement, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { usePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import DefaultLayout from "@/layouts/DefaultLayout";
import BottomAppBar from "@/layouts/components/BottomAppBar";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - 80px - 82px); // 80px:Header, 82px: BottomAppBar
  margin: 80px 0 82px;
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
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
  }, [pathname]);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
