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
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.mainBackground)};
  padding: 4px;
  border: 1px solid${({ theme }) => theme.blue40};

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.black : theme.gray50)};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.875rem;
  text-align: center;
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

