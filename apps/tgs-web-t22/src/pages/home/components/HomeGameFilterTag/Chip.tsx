import styled from "styled-components";

const Wrapper = styled.button<{
  $isActive: boolean;
}>`
  padding: 10px 25px;
  user-select: none;
  color: ${({$isActive, theme}) => $isActive ? theme.yellow : theme.white};
  background: none;
  border: none;
  cursor: pointer;

`;

type Props = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Chip = ({ text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} onClick={onClick}>
      {text}
    </Wrapper>
  );
};

export default Chip;
