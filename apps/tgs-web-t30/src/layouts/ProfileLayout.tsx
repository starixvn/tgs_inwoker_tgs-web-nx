import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import MenuDrawer from "@/layouts/components/MenuDrawer";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`${MOBILE_HEADER_HEIGHT} 0 ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;
`;

type Props = {
  children: React.ReactNode;
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
      <Header />
      <MenuDrawer />

      <ContentWrapper>
        <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
        {children}
      </ContentWrapper>
      {/*<BottomAppBar />*/}
    </DialogLayoutContainer>
  );
};

export default ProfileLayout;
