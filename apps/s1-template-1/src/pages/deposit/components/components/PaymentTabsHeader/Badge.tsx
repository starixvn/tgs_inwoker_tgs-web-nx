
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";
import styled from "styled-components";


type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  cursor: pointer;
  padding: 15px 10px;
  text-align: center;
  color: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `${theme.text}` : `${theme.tabTextColor}`};
  background: ${({ theme }) => theme.tabBackground};
  border: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `1px solid ${theme.borderTabActive}` : `1px solid ${theme.borderTab}`};
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: .8rem;
  box-shadow: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `0px 0px 10px 0px rgba(160, 218, 66, 0.60) inset` : `unset`} ;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.sm} {
    flex-basis: 0;
    max-width: 100%;
    flex-grow: 1;
  }
`;

type Props = {
  text: string;
  isActive: boolean;
  handleClick: () => void;
};

const Badge = ({ text, handleClick, isActive }: Props) => {
  return (
    <BadgeContainer onClick={handleClick} $isActive={isActive}>
      {text}
    </BadgeContainer>
  );
};

export default Badge;
