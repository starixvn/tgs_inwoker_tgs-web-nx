import React, { ReactElement } from "react";
import styled from "styled-components";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import { BOTTOM_APP_BAR_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import DarkMemberMenu from "@/layouts/components/Header/components/ContextMenuButton/components/DarkMemberMenu";
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
  max-width: 1170px;
  margin: auto;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};
  display: flex;
  justify-content: center;
  ${media.sm} {
    padding-bottom: 0;
    margin-top: 20px;
  }
`;

type Props = {
  children: ReactElement;
};
const AccountDesktopLayout = ({ children }: Props) => {
  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer>
        <ContentWrapper>
          <ChildrenWrapper>
            <DarkMemberMenu
              handleCloseContextMenu={() => {}}
              style={{
                width: "200px",
                flexShrink: 0,
              }}
            />
            {children}
          </ChildrenWrapper>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
    </DefaultLayoutContainer>
  );
};

export default AccountDesktopLayout;
