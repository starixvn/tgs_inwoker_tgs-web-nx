import React, { ReactElement, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import DialogHeader, { DIALOG_HEADER_HEIGHT } from "@/components/UI/Dialog/DialogHeader";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${DIALOG_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`${DIALOG_HEADER_HEIGHT} auto ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
};
const ProfileLayout = ({ children }: Props) => {
  const history = useHistory();
  const { pageName } = usePageName();
  const { isDesktopSize } = useRwd();

  const handleCloseDialog = useCallback(() => {
    history.goBack();
  }, [history]);

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />

      <ContentWrapper>
        <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
        {children}
      </ContentWrapper>
      {/*<BottomAppBar />*/}
    </DialogLayoutContainer>
  );
};

export default ProfileLayout;
