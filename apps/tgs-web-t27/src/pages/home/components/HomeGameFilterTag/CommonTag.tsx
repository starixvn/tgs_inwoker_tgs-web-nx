import { useHomeGameContext } from "@tgs-web-nx/core/features";
import styled from "styled-components";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: none;
  height: 100%;
  user-select: none;
  min-width: 106px;
  height: 36px;
  padding: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.white)};

  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const CommonTag = ({ text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} onClick={onClick}>
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default CommonTag;
