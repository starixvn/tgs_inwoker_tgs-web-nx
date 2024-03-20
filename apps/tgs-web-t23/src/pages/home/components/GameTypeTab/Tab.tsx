import styled from "styled-components";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme, $isActive }) =>
    $isActive ? "linear-gradient(270deg,#34363f,#48452c 80%,#5a5817)" : "transparent"};
  margin-right: 5px;
`;

const GameIcon = styled.img`
  width: 30px;
  height: 30px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.white)};
  font-size: 0.6rem;
  font-weight: 700;
`;

const Tab = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <GameIcon src={imageUrl} alt={text} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default Tab;
