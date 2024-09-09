import { NavItem } from "@/layouts/hooks/useGetNavItemList";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

const GameTypeNav = styled.div`
  flex-shrink: 0;
  font-size: 1.2rem;
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 0.4rem;
  cursor: pointer;
  position: relative;

  ${media.lg} {
    font-size: 1.6rem;
  }
`;

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  height: 6rem;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 1rem;
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.categoryBackgroundActive : theme.categoryBackground};

  ${media.lg} {
    height: 8rem;
  }

  & img {
    width: 2.4rem;
    height: 2.4rem;

    ${media.lg} {
      width: 4.2rem;
      height: 4.2rem;
    }
  }
`;

type PropsType = {
  isActive: boolean;
  key: number;
  navItem: any;
  handleClickNav: (navItem: NavItem) => void;
};

const GameType = (props: PropsType) => {
  const { isActive, navItem, handleClickNav } = props;
  return (
    <Wrapper $isActive={isActive} key={navItem.key} onClick={() => handleClickNav(navItem)}>
      <img src={navItem.iconUrl} alt={navItem.label} />
      <GameTypeNav>{navItem.label}</GameTypeNav>
    </Wrapper>
  );
};

export default GameType;
