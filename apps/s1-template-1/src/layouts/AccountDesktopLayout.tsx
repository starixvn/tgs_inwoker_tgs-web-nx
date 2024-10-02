import Footer from "@/layouts/components/Footer";
import Header from "@/layouts/components/Header";
import { media } from "@/theme/breakpoints";
import { BOTTOM_APP_BAR_HEIGHT, MOBILE_HEADER_HEIGHT } from "@/theme/constants";
import { useHeader } from "@tgs-web-nx/core/features";
import { useRwd } from "@tgs-web-nx/core/hooks";
import React from "react";
import styled from "styled-components";

const DefaultLayoutContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    background: ${({ theme }) => theme.mainBackground};
  }
`;

type ContentWrapperProps = {
  $isOpen: boolean;
  $isDesktop: boolean;
};

const ContentWrapper = styled.div<ContentWrapperProps>`
  position: relative;
  flex-grow: 1;
  transition: all ease-in-out 0.2s;

  ${media.md} {
    min-height: calc(100vh - ${MOBILE_HEADER_HEIGHT} - 1.7rem - 27rem);
  }
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
  const { isDesktopSize } = useRwd();
  const { isMenuOpen } = useHeader();

  return (
    <DefaultLayoutContainer>
      <Header />
      <ContentWrapper $isOpen={isDesktopSize && isMenuOpen} $isDesktop={isDesktopSize}>
        <ChildrenWrapper>{children}</ChildrenWrapper>
      </ContentWrapper>
      <Footer />
    </DefaultLayoutContainer>
  );
};

export default AccountDesktopLayout;
