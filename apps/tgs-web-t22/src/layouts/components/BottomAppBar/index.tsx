import styled from "styled-components";
import { useHistory } from "react-router";
import { useGetBottomNavItemList } from "./hooks/useGetBottomNavItemList";
import BottomNav from "./BottomNav";

const BottomAppBarContainer = styled.div`
  padding: 10px;
  position: fixed;
  top: auto;
  bottom: 0;
  left: 0;
  z-index: 1;

  display: grid;
  grid-template-columns: repeat(5, 1fr); 
  grid-column-gap: 10px;

  background: ${({ theme }) => theme.white};
  width: 100%;
`;

const BottomAppBar = () => {
  const {bottomNavItemList} = useGetBottomNavItemList();
  const history = useHistory();
  const {pathname} = history.location;
  
  return (
    <BottomAppBarContainer>
      {bottomNavItemList.map((bottomNavItem) => {
        return (
          <BottomNav
            key={bottomNavItem.label}
            bottomNavItem={bottomNavItem}
            onClick={bottomNavItem.handleClick}
            isActive={bottomNavItem.path === pathname}
          />
        );
      })}
    </BottomAppBarContainer>
  );
};

export default BottomAppBar;
