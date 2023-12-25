import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import CategoryHeader from "./components/CategoryHeader";
import CategoryFilter from "./components/CategoryFilter";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import MenuDrawer from "@/layouts/components/MenuDrawer";
import { media } from "@/theme/breakpoints";
import { BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";

const HomeLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${MOBILE_HEADER_HEIGHT};
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT});
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
  children: React.ReactNode;
};
const HomeLayout = ({ children }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <HomeLayoutContainer>
      <Header />

      <DashboardContainer>
        <MenuDrawer />

        <ContentWrapper>
          <>
            {isMobileSize && <CategoryHeader />}
            <ChildrenWrapper>{children}</ChildrenWrapper>
            <Footer />
          </>
        </ContentWrapper>
      </DashboardContainer>

      {isMobileSize && <CategoryFilter />}
    </HomeLayoutContainer>
  );
};

export default HomeLayout;
