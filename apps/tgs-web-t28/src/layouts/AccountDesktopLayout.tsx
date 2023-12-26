import React from "react";
import styled from "styled-components";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import {
  BOTTOM_APP_BAR_HEIGHT,
  DESKTOP_HEADER_HEIGHT,
  MOBILE_HEADER_HEIGHT,
} from "@/theme/constants";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
import bg from "@/assets/t29/images/bg.png";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.middlePurple};

  ${media.sm} {
    background: ${({ theme }) => theme.middlePurple};
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
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;
`;

const ChildrenWrapper = styled.div`
  max-width: 1170px;
  margin: auto;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};
  display: flex;
  justify-content: center;
  ${media.sm} {
    padding-bottom: 15px;
    margin-top: 15px;
  }
`;

type Props = {
  children: React.ReactNode;
};
const AccountDesktopLayout = ({ children }: Props) => {
  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <ContentWrapper>
          <ChildrenWrapper>{children}</ChildrenWrapper>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
    </DefaultLayoutContainer>
  );
};

export default AccountDesktopLayout;
