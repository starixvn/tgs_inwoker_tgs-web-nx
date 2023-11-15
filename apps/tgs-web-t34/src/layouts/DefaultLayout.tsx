import { ReactElement } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { useHeader } from "@tgs-web-nx/core/features";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_DRAWER_WIDTH,
  DRAWER_SHRINK_WIDTH,
  HEADER_HEIGHT,
  TABLET_DRAWER_WIDTH,
} from "@/theme/constants";

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

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;
`;

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
        {!isDesktopSize && <MenuDrawer />}

        <ContentWrapper>
          <>
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <Footer />
          </>
        </ContentWrapper>
      </DashboardContainer>

      {!isDesktopSize && <BottomAppBar />}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
