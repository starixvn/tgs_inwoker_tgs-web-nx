import styled from "styled-components";
import BottomNav from "./BottomNav";
import { useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";
import TransferMenuDrawer from "@/layouts/components/TransferMenuDrawer";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: calc(100% - 11px * 2);
  top: auto;
  bottom: 0;
  left: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  //padding: 0 20px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;

  border-radius: 8.36px 8.36px 0px 0px;
  background: linear-gradient(180deg, #03a9dd 0%, #09b6ed 50%, #02c3ff 100%);
`;

const BottomAppBar = () => {
  const {
    bottomNavItemList,
    handleClickBottomNavItem,
    isTransferDrawerOpen,
    handleTransferDrawerToggle,
  } = useGetBottomNavItemList();

  return (
    <>
      <BottomAppBarContainer>
        {bottomNavItemList.map((bottomNavItem) => {
          return (
            <BottomNav
              key={bottomNavItem.label}
              bottomNavItem={bottomNavItem}
              onClick={() => handleClickBottomNavItem(bottomNavItem)}
            />
          );
        })}
      </BottomAppBarContainer>

      <TransferMenuDrawer
        isOpen={isTransferDrawerOpen}
        handleDrawerToggle={handleTransferDrawerToggle}
      />
    </>
  );
};

export default BottomAppBar;
