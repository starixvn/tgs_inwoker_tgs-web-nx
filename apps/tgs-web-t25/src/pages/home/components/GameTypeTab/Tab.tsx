import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";

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
  min-width: 70px;
  height: 76px;
  padding: 12px 4px;
  gap: 8px;
  user-select: none;
  border-radius: 6px;
  background: ${({ theme, $isActive }) => ($isActive ? theme.grey06 : theme.mainBackground)};
  border: 1px solid ${({ theme }) => theme.grey06};

  ${media.sm} {
    flex: 1;
    height: 82px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const GameIcon = styled.img`
  width: 24px;
  height: 24px;

  ${media.sm} {
    width: 40px;
    height: 40px;
  }
`;

type TextProps = {
  $isActive: boolean;
  $fontSize: string;
  theme: typeof theme;
};

const Text = styled.div<TextProps>`
  color: ${({ $isActive, theme }: TextProps) => ($isActive ? theme.white : theme.grey06)};
  font-size: 0.875rem;
  line-height: 21px;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
`;

type Props = {
  imageUrl: string;
  imageActiveUrl: string;
  text: string;
  fontSize: "small" | "smaller" | string;
  isActive: boolean;
  onClick: () => void;
};

const Tab = ({ imageUrl, imageActiveUrl, text, isActive, fontSize, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <GameIcon src={isActive ? imageActiveUrl : imageUrl} alt={text} />
      <Text $fontSize={fontSize} $isActive={isActive}>
        {text}
      </Text>
    </Wrapper>
  );
};

export default Tab;
