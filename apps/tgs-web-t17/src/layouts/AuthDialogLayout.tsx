import React from "react";
import styled from "styled-components";
import { useAuthDialogLayout, useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import DefaultLayout from "@/layouts/DefaultLayout";
import { DESKTOP_HEADER_HEIGHT, MOBILE_HEADER_HEIGHT, DIALOG_HEADER_HEIGHT, BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import { media } from "@/theme/breakpoints";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  /* height: 100vh;
  overflow: auto; */
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${DIALOG_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${DIALOG_HEADER_HEIGHT} 0 ${BOTTOM_APP_BAR_HEIGHT};
  position: relative;
  z-index: 1;

  ${media.sm} {
    height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin: ${DESKTOP_HEADER_HEIGHT} 0 0;
  }
`;

type Props = {
  children: React.ReactNode;
};
const AuthDialogLayout = ({ children }: Props) => {
  const { handleCloseDialog } = useAuthDialogLayout();
  const { pageName } = usePageName();
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default AuthDialogLayout;
