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
  color: ${theme.transferPrimaryText};
  background: #19212c;
  border: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? `1px solid ${theme.primary}` : `unset`};
  font-size: 1.4rem;
  font-weight: bold;
  border-radius: .8rem;

  ${media.md} {
    width: auto;
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
