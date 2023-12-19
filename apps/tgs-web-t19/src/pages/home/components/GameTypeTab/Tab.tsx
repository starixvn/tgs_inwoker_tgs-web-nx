import styled from "styled-components";
import { media } from "@/theme/breakpoints";

type Props = {
  imageUrl: string;
  text: string;
  fontSize: "small" | "smaller" | string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  flex-shrink: 0;
  cursor: pointer;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  user-select: none;

  ${media.sm} {
    min-width: 90px;
    height: 74px;
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const GameIcon = styled.img`
  width: 62px;
  height: 62px;
`;

const Text = styled.div<{
  $isActive: boolean;
}>`
  color: ${({ theme, $isActive }) => $isActive ? theme.primary : theme.gray};
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin-top: 3px;
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
