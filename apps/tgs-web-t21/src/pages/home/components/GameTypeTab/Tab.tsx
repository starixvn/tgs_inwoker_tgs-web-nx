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
  padding: 6px 22px 2px;
  gap: 8px;
  user-select: none;
  background: ${({ theme, $isActive }) => ($isActive ? theme.focus : theme.primary)};

  ${media.sm} {
    flex: 1;
    height: auto;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.text};
    }
  }
`;

const GameIcon = styled.img`
  width: 36px;
  height: 36px;

  ${media.sm} {
    //width: 40px;
    //height: 40px;
  }
`;

type TextProps = {
  $isActive: boolean;
  $fontSize: string;
  theme: typeof theme;
};

const Text = styled.div<TextProps>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.yellow : theme.white)};
  font-size: 13.4px;
  font-weight: 400;
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
