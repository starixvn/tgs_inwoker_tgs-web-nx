import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/Header/components/MenuDrawer";
import { useHeader } from "@/core/feature/useHeader";
import { useRwd } from "@/core/hooks/tools/useRwd";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DRAWER_SHRINK_WIDTH,
  DRAWER_WIDTH,
  HEADER_HEIGHT,
} from "@/theme/constants";
import { styled as muiStyled } from "@mui/material";
import { ReactElement } from "react";
import styled from "styled-components";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${HEADER_HEIGHT};
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${HEADER_HEIGHT};
    min-height: calc(100vh - ${HEADER_HEIGHT});
    margin-bottom: unset;
  }
`;

type ContentWrapperProps = {
  $isOpen: boolean;
  $isDesktop: boolean;
};

const ContentWrapper = muiStyled("div", {
  shouldForwardProp: (prop) => prop !== "$isOpen" && prop !== "$isDesktop",
})<ContentWrapperProps>(({ theme, $isOpen, $isDesktop }) => {
  return {
    position: "relative",
    flexGrow: 1,
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: $isDesktop ? DRAWER_SHRINK_WIDTH : 0,

    ...($isOpen && {
      transition: theme.transitions.create("all", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: DRAWER_WIDTH,
    }),
  };
});

const ChildrenWrapper = styled.div`
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};

  ${media.sm} {
    padding-bottom: 0;
  }
`;

type Props = {
  children: ReactElement;
};
const DefaultLayout = ({ children }: Props) => {
  const { isDesktopSize, isMobileSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <MenuDrawer />

        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen} $isDesktop={isDesktopSize}>
          <>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <Footer />
          </>
        </ContentWrapper>
      </DashboardContainer>

      {isMobileSize && <BottomAppBar />}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
