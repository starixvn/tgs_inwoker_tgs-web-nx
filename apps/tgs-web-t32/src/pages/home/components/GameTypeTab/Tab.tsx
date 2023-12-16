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
  background: ${({ theme }) => theme.mainBackground};

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
  width: 20px;
  height: 20px;
`;

const Text = styled.div<{ $fontSize: string }>`
  color: ${({ theme }) => theme.text};
  font-size: ${({ $fontSize }) => ($fontSize === "small" ? "0.625rem" : "0.5rem")};
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  line-height: 10px;
`;

const Tab = ({ imageUrl, text, isActive, fontSize, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <GameIcon src={imageUrl} alt={text} />
      <Text $fontSize={fontSize}>{text}</Text>
    </Wrapper>
  );
};

export default Tab;
