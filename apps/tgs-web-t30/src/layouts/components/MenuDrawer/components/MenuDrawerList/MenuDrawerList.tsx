import React from "react";
import styled from "styled-components";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import SideMenuNavList from "@/layouts/components/MenuDrawer/components/MenuDrawerList/components/SideMenuNavList";

const MobileMenuDrawerContainer = styled.div`
  width: 100%;
  overflow: visible;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MenuDrawerList = () => {
  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />

      <ContentWrapper>
        <SideMenuNavList />
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MenuDrawerList;
