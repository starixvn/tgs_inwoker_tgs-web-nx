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
  min-width: 50px;
  height: 55px;
  padding: 4px;
  gap: 6px;
  user-select: none;
  border-radius: 6px;
  background: ${({ theme }) => theme.mainBackground};

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
  width: 20px;
  height: 20px;

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
  color: ${({ $isActive, theme }: TextProps) => ($isActive ? theme.red : theme.text)};
  font-size: ${({ $fontSize }: TextProps) => ($fontSize === "small" ? "0.625rem" : "0.5rem")};
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  line-height: 10px;
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
