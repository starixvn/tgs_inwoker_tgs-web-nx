import styled from "styled-components";
import { media } from "@/theme/breakpoints";

const Wrapper = styled.div<{
  $isActive: boolean;
  $hasBackground: boolean;
}>`
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: auto;
  max-width: none;
  height: 38px;
  margin-right: 4px;
  box-sizing: border-box;
  user-select: none;
  background: ${({ theme, $isActive }) =>
    $isActive ? "transparent" : theme.darkGray};
  min-width: 100px;
  padding: 12px 15px;
  border-radius: 5px;
  border: 1px solid ${({ $isActive, theme }) => ($isActive ? theme.secondary : "transparent")};

  ${media.sm} {
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.white};
    }
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.disabledGray)};
  font-size: 0.875rem;
  font-weight: 400;
`;

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Tag = ({ text, isActive, onClick }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      $hasBackground={isActive}
      onClick={onClick}
    >
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default Tag;
