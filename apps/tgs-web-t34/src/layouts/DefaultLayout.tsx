import { ReactElement } from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import { media } from "@/theme/breakpoints";
import { BOTTOM_APP_BAR_HEIGHT, DESKTOP_HEADER_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${HEADER_HEIGHT};
  min-height: calc(100vh - ${HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${DESKTOP_HEADER_HEIGHT};
    min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
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
  const { isDesktopSize } = useRwd();

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
