import styled from "styled-components";

const Wrapper = styled.div<{
  $isActive: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  min-width: 60px;
  max-width: none;
  height: 100%;
  border-radius: 20px;
  box-sizing: border-box;
  user-select: none;
  background-color: transparent;
  padding: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.white};
`;

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const CommonTag = ({ text, isActive, onClick }: Props) => {

  return (
    <Wrapper
      $isActive={isActive}
      onClick={onClick}
    >
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default CommonTag;

