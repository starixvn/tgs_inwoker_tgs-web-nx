import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";
import check from "@/assets/t19/images/badge/check.svg";

type BadgeContainerProps = {
  $isActive: boolean;
  theme: typeof theme;
};
const BadgeContainer = styled.div<BadgeContainerProps>`
  position: relative;
  width: calc((100% - 8px * 3) / 4);
  height: fit-content;
  cursor: pointer;
  padding: 10px 24px;
  text-align: center;
  color: ${({ theme }: BadgeContainerProps) => theme.white};
  border: 1px solid  ${({ $isActive, theme }: BadgeContainerProps) =>
    $isActive ? theme.red : theme.white};
  border-radius: 6px;
  font-size: 0.812rem;
  font-weight: 400;

  ${media.md} {
    width: auto;
  }
`;

const CheckContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 19px;
  height: 18px;
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
      {isActive && (
        <CheckContainer>
          <img src={check} alt="check" />
        </CheckContainer>
      )}
    </BadgeContainer>
  );
};

export default Badge;
