import styled from "styled-components";
import SideMenuHeader from "@/layouts/components/Header/components/SideMenuHeader";
import MenuList from "@/layouts/components/MenuDrawer/components/MenuList";
import { DESKTOP_HEADER_HEIGHT } from "@/theme/constants";

const MobileMenuDrawerContainer = styled.div`
  background: ${({ theme }) => theme.mainBackground};
  width: 100%;
  height: 100vh;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: calc(100vh - ${DESKTOP_HEADER_HEIGHT});
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  align-items: flex-start;
  flex-shrink: 0;
  background: ${({ theme }) => theme.g4};

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #53535375;
  }

  &::-webkit-scrollbar-track-piece {
    background: transparent;
  }

  & > * {
    flex-shrink: 0;
  }
`;

const MobileMenuDrawer = () => {
  return (
    <MobileMenuDrawerContainer>
      <SideMenuHeader />
      <ContentWrapper>
        <MenuList />
      </ContentWrapper>
    </MobileMenuDrawerContainer>
  );
};

export default MobileMenuDrawer;
