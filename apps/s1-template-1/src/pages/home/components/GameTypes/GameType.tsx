import { NavItem } from "@/layouts/hooks/useGetNavItemList";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";

const GameTypeNav = styled.div`
  flex-shrink: 0;
  font-size: 1.1rem;
  font-weight: 500;
  white-space: nowrap;
  display: flex;
  align-items: center;
  padding: 0.2rem;
  cursor: pointer;
  position: relative;
  text-transform: capitalize;
  letter-spacing: 0.2px;
  color: ${({ theme }) => theme.categoryTextColor};

  ${media.sm} {
    font-size: 1.2rem;
  }

  ${media.lg} {
    padding: 0.4rem;
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
  height: 6rem;
  padding: 0.8rem 1.6rem;
  cursor: pointer;
  border-radius: 1rem;
  border: 1px solid ${({ theme }) => theme.categoryBorder};
  background: ${({ theme, $isActive }) =>
    $isActive ? theme.categoryBackgroundActive : theme.categoryBackground};

  ${media.sm} {
    height: 74px;

    &:hover {
      background: ${({ theme, $isActive }) =>
        $isActive ? theme.categoryBackgroundActive : theme.categoryBackgroundHover};
    }
  }

  ${media.lg} {
    height: 8rem;
  }

  img {
    width: 3.2rem;
    height: 3.2rem;

    ${media.lg} {
      width: 3.8rem;
      height: 3.8rem;
    }
  }
`;

type PropsType = {
  isActive: boolean;
  navItem: NavItem;
  handleClickNav: (navItem: NavItem) => void;
};

const GameType = (props: PropsType) => {
  const { isActive, navItem, handleClickNav } = props;
  return (
    <Wrapper $isActive={isActive} key={navItem.key} onClick={() => handleClickNav(navItem as any)}>
      <img src={navItem.iconUrl} alt={navItem.label} />
      <GameTypeNav>{navItem.label}</GameTypeNav>
    </Wrapper>
  );
};

export default GameType;
