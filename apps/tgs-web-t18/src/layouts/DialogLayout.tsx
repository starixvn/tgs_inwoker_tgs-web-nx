import React, { ReactElement, useCallback } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router";
import { usePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import DefaultLayout from "@/layouts/DefaultLayout";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import { MOBILE_BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${MOBILE_BOTTOM_APP_BAR_HEIGHT});
  margin: ${MOBILE_HEADER_HEIGHT} 0 ${MOBILE_BOTTOM_APP_BAR_HEIGHT};
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
