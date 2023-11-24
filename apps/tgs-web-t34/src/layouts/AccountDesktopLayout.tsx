import React, { ReactElement } from "react";
import styled from "styled-components";
import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import { BOTTOM_APP_BAR_HEIGHT, DESKTOP_HEADER_HEIGHT, HEADER_HEIGHT } from "@/theme/constants";
import AccountNavList from "@/layouts/components/AccountNavList";
import { theme } from "@/theme";

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
  max-width: 1170px;
  margin: auto;
  padding-bottom: ${BOTTOM_APP_BAR_HEIGHT};
  display: flex;
  justify-content: center;
  ${media.sm} {
    padding-bottom: 0;
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
            <AccountNavList
              handleCloseContextMenu={() => {}}
              style={{
                width: "208px",
                margin: "22px 0 0 22px",
                paddingRight: "22px",
                flexShrink: 0,
                borderRight: `1px solid ${theme.maskBlack20}`,
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
