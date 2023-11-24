import styled from "styled-components";
import { media } from "@/theme/breakpoints";

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
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 66px;
  height: 77px;
  padding: 5px 0px;
  gap: 6px;
  user-select: none;
  border-bottom: 2px solid ${({ theme, $isActive }) => ($isActive ? theme.primary : "transparent")};

  ${media.sm} {
    min-width: 90px;
    height: 74px;
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

const GameIcon = styled.img`
  width: 36px;
  height: 36px;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ $isActive, theme }) => ($isActive ? theme.primary : theme.white)};
  font-size: 0.875rem;
  font-weight: 400;
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
