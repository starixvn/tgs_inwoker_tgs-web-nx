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
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.primary : theme.mainDarkBackground};
  padding: 4px;

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.black : theme.gray};
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 0.875rem;
`;

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const ProviderTag = ({ text, isActive, onClick }: Props) => {

  return (
    <Wrapper
      $isActive={isActive}
      onClick={onClick}
    >
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default ProviderTag;

