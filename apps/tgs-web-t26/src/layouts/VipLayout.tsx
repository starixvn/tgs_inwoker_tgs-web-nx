import React, { useCallback } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { usePageName } from "@tgs-web-nx/core/features";
import { useHistory } from "react-router-dom";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
  SUB_CONTENT_MAX_WIDTH,
} from "@/theme/constants";
import bg from "@/assets/t29/images/bg.png";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import DialogHeader from "@/components/UI/Dialog/DialogHeader";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};

  /* ${media.sm} {
    background: url(${bg});
  } */
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${DESKTOP_HEADER_HEIGHT};
    min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin-bottom: unset;
    /* padding: 15px 0px; */
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;
`;

const ChildrenWrapper = styled.div`
  margin: auto;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};
  display: flex;
  justify-content: center;

  ${media.sm} {
    padding-bottom: 0px;
  }
`;

type Props = {
  children: React.ReactNode;
};
const VipLayout = ({ children }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { pageName } = usePageName();
  const history = useHistory();

  const handleCloseDialog = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <DefaultLayoutContainer>
      {isDesktopSize && <Header />}
      <DashboardContainer>
        {isMobileSize && (
          <DialogHeader handleClose={handleCloseDialog} dialogHeaderTitle={pageName} />
        )}
        <ContentWrapper>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
      {isMobileSize && <BottomAppBar />}
    </DefaultLayoutContainer>
  );
};

export default VipLayout;
