import styled from "styled-components";
import BottomNav from "./BottomNav";
import { useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import { BOTTOM_APP_BAR_HEIGHT } from "@/theme/constants";

const BottomAppBarContainer = styled.div`
  position: fixed;
  height: ${BOTTOM_APP_BAR_HEIGHT};
  width: 100%;
  top: auto;
  bottom: 0;
  left: 0;
  background: ${({ theme }) => theme.mainBackground};
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 10px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
  gap: 5px;
`;

const BottomAppBar = () => {
  const { bottomNavItemList, selectedBottomNavItem, handleClickBottomNavItem } =
    useGetBottomNavItemList();

  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={() => handleClickBottomNavItem(bottomNavItem)}
            isSelected={selectedBottomNavItem?.label === bottomNavItem.label}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;
