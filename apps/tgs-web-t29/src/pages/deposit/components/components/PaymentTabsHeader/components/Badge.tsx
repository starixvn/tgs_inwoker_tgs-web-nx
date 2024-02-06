import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc((100% - 8px * 3) / 4);
  cursor: pointer;
  padding: 10px;
  text-align: center;
  color: ${({ $isActive, theme }: BadgeContainerProps) => ($isActive ? theme.white : theme.black)};
  background: ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.blue40 : theme.blue20};

  font-size: 0.812rem;
  font-weight: 400;

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
