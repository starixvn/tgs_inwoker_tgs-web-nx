import styled from "styled-components";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import {
  MOBILE_BOTTOM_APP_BAR_HEIGHT,
  MOBILE_DRAWER_WIDTH,
  MOBILE_HEADER_HEIGHT,
} from "@/theme/constants";
import { media } from "@/theme/breakpoints";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import MenuDrawer from "@/layouts/components/Header/components/MenuDrawer";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.primaryDark};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: 80px;
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${MOBILE_BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: 60px;
    min-height: calc(100vh - 60px);
    margin-bottom: unset;
  }
`;

type ContentWrapperProps = {
  $isOpen: boolean;
};

const ContentWrapper = styled.div<ContentWrapperProps>`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;

  ${media.sm} {
    margin-left: ${({ $isOpen }: ContentWrapperProps) => ($isOpen ? MOBILE_DRAWER_WIDTH : 0)};
  }
`;

const ChildrenWrapper = styled.div`
  padding-bottom: ${MOBILE_BOTTOM_APP_BAR_HEIGHT};

  ${media.sm} {
    padding-bottom: 0;
  }
`;

type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  const { isMenuOpen, handleToggleMenu } = useHeader();
  const { isDesktopSize, isMobileSize } = useRwd();

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <MenuDrawer />
        {/*ts-ignore*/}
        <ContentWrapper $isOpen={isDesktopSize && isMenuOpen}>
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
