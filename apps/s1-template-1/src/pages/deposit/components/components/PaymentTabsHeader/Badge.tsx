
import { theme } from "@/theme";
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
    $isActive ? `${theme.badgeActiveTextColor}` : `${theme.badgeTextColor}`};
  background: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `${theme.bagdeActiveBackgroundColor}` : `${theme.bagdeBackgroundColor}`};
  border: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `1px solid ${theme.badgeActiveBorderColor}` : `1px solid ${theme.badgeBorderColor}`};
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 0;
  max-width: 100%;
  flex-grow: 1;
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
