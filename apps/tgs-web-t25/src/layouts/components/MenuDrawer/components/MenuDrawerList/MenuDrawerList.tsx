import React from "react";
import styled from "styled-components";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import SideMenuNavList from "@/layouts/components/MenuDrawer/components/MenuDrawerList/components/SideMenuNavList";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.black03};
  width: 100%;
  padding: 12px 16px;
`;

const ContentWrapper = styled.div`
  flex-shrink: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
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
