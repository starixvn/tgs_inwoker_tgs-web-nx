import React from "react";
import styled from "styled-components";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import MenuGameTypeList from "@/layouts/components/MenuDrawer/components/MobileMenuDrawer/components/MenuGameTypeList";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileMenuDrawer = () => {
  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />

      <ContentWrapper>
        <MenuGameTypeList />
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;
