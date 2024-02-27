import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { useAuthDialogLayout, useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { HEADER_HEIGHT } from "@/theme/constants";
import DefaultLayout from "@/layouts/DefaultLayout";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
  height: 100vh;
  overflow: auto;
`;

const ContentWrapper = styled.div`
  // min-height: calc(100vh - ${HEADER_HEIGHT}); // 80px:Header, 82px: BottomAppBar
  margin: ${HEADER_HEIGHT} 0 0;
  position: relative;
  z-index: 1;
`;

const CloseIconContainer = styled.div`
  position: fixed;
  top: 22px;
  right: 22px;
  display: flex;
  align-items: center;
  cursor: pointer;
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
