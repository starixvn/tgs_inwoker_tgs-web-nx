import { ReactElement, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import DefaultLayout from "@/layouts/DefaultLayout";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";

const DialogLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const ContentWrapper = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});
  margin: ${`${HEADER_HEIGHT} 0 ${BOTTOM_APP_BAR_HEIGHT}`};
  position: relative;
  z-index: 1;
`;

type Props = {
  children: ReactElement;
};
const DialogLayout = ({ children }: Props) => {
  const { isDesktopSize } = useRwd();

  if (isDesktopSize) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DialogLayoutContainer>
      <Header />
      <MenuDrawer />

      <ContentWrapper>{children}</ContentWrapper>
    </DialogLayoutContainer>
  );
};

export default DialogLayout;
