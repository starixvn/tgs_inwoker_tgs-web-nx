import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import { MAIN_CONTENT_MAX_WIDTH } from "@/theme/constants";
import { useAccountStore, useUiStore } from "@tgs-web-nx/core";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

import Footer from "./components/Footer";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};
`;

const DashboardContainer = styled.div<{ hasAnnouncement: boolean }>`
  display: flex;
  margin: 0 auto;

  ${media.lg} {
    margin: 0 auto;
    max-width: ${MAIN_CONTENT_MAX_WIDTH};
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  margin: 0 auto;
  transition: all ease-in-out 0.2s;
  width: 100%;
`;

type Props = {
  children: React.ReactNode;
};
const DefaultLayout = ({ children }: Props) => {
  const { account } = useAccountStore();
  const { isMobileSize } = useRwd();
  const loginAccount = account.token === account.info.token;
  const {
    ui: { marquees },
  } = useUiStore();
  const hasAnnouncement = (marquees && marquees.length > 0) ?? false;

  return (
    <DefaultLayoutContainer>
      <Header />

      <DashboardContainer hasAnnouncement={hasAnnouncement}>
        <ContentWrapper>
          <div>{children}</div>
        </ContentWrapper>
      </DashboardContainer>
      <Footer />
      {/* {isMobileSize && loginAccount && <BottomAppBar />} */}
    </DefaultLayoutContainer>
  );
};

export default DefaultLayout;
