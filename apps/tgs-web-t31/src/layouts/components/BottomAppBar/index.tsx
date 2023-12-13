import styled from "styled-components";
import BottomNav from "./BottomNav";
import { useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import TransferMenuDrawer from "@/layouts/components/TransferMenuDrawer";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.navbar};
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
`;

const BottomAppBar = () => {
  const {
    bottomNavItemList,
    handleClickBottomNavItem,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
    selectedBottomNavItem,
  } = useGetBottomNavItemList();

  return (
    <>
      <BottomAppBarContainer>
        {bottomNavItemList.map((bottomNavItem) => {
          return (
            <BottomNav
              key={bottomNavItem.label}
              bottomNavItem={bottomNavItem}
              isSelected={selectedBottomNavItem === bottomNavItem}
              onClick={() => handleClickBottomNavItem(bottomNavItem)}
            />
          );
        })}
      </BottomAppBarContainer>

      {/* <TransferMenuDrawer
        isOpen={isTransferDrawerOpen}
        handleDrawerToggle={handleTransferDrawerToggle}
      /> */}
    </>
  );
};

export default BottomAppBar;
