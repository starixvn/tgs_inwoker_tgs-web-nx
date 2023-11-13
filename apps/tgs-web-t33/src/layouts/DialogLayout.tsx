import { ReactElement, useCallback } from "react";
import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: 80px 0 82px;
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
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
    <DialogLayoutContainer>
      <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
      <ContentWrapper>{children}</ContentWrapper>
      <BottomAppBar />
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
