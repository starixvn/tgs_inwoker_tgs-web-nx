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
  min-width: 72px;
  height: 55px;
  padding: 4px;
  gap: 6px;
  user-select: none;
  border-radius: 6px;
  border: 1px solid ${({ theme, $isActive }) => $isActive ? theme.blue40 : "transparent"};
  background: ${({ theme }) => theme.blue20};

  ${media.sm} {
    min-width: 90px;
    height: 74px;
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.gray50};
    }
  }
`;

const GameIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const Text = styled.div`
  color: ${({ theme }) => theme.gray50};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  line-height: 10px;
`;

const Tab = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper
      $isActive={isActive}
      $imageUrl={imageUrl}
      $text={text}
      onClick={onClick}>
      <GameIcon src={imageUrl} alt={text} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default Tab;
