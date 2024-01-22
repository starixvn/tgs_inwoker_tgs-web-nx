import React from "react";
import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import BottomAppBar from "@/layouts/components/BottomAppBar";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/theme/constants";
import bg from "@/assets/t29/images/bg.png";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.white};

  ${media.sm} {
    background: url(${bg});
  }
`;

const DashboardContainer = styled.div`
  display: flex;
  margin-top: ${MOBILE_HEADER_HEIGHT};
  min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - ${BOTTOM_APP_BAR_HEIGHT});

  ${media.sm} {
    margin-top: ${DESKTOP_HEADER_HEIGHT};
    min-height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
    margin-bottom: unset;
    height: unset;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;
`;

const ChildrenWrapper = styled.div`
  height: 100%;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};
  background: ${({ theme }) => theme.mainBackground};
  ${media.sm} {
    padding-bottom: 0;
    height: unset;
  }
`;

type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  const { isMobileSize } = useRwd();

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <ContentWrapper>
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
