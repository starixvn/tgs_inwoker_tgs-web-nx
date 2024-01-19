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
  background: ${({ theme }) => theme.black02};
  display: flex;
  align-items: center;
  justify-content: space-between;
  //padding: 0 20px;
  z-index: 1000; // cant be grater then 1300 or will block Dialog
  overflow: visible;
  box-shadow: 0px -12px 24px 0px #000000;
`;

const BottomAppBar = () => {
  const { bottomNavItemList, handleClickBottomNavItem } = useGetBottomNavItemList();

  return (
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
  );
};

export default BottomAppBar;
