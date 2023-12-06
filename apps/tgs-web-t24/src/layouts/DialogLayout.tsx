import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { usePageName } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  position: relative;
  z-index: 1;
`;

type Props = {
  children: React.ReactNode;
};
const DialogLayout = ({ children }: Props) => {
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
    <DefaultLayout>
      <Header />
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DefaultLayout>
  );
};

export default DialogLayout;
