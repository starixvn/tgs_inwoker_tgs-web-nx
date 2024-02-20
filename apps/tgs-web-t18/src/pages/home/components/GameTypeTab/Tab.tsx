import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import { theme } from "@/theme";
import desktopActiveTabBgUrl from "@/assets/t18/images/home/desktop_active_tab_bg.png";

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
  width: 64px;
  height: 77px;
  border-radius: 12px;
  background-color: ${({ theme, $isActive }) => ($isActive ? theme.primary : theme.primaryLight)};
  margin-right: 12px;
  user-select: none;

  ${media.sm} {
    width: 112px;
    height: 32px;
    flex-direction: row;
    background-image: ${({ $isActive }) => ($isActive ? `url(${desktopActiveTabBgUrl})` : null)};
    background-color: transparent;
    border-radius: 5px;
    margin-right: 5px;
    cursor: pointer;
    & :hover {
      color: ${({ theme }) => theme.white};
    }
  }
`;

const GameIcon = styled.img`
  width: 36px;
  height: 36px;

  ${media.sm} {
    width: 24px;
    height: 24px;
  }
`;

type TextProps = {
  $isActive: boolean;
  $fontSize: string;
  theme: typeof theme;
};

const Text = styled.div<TextProps>`
  color: ${({ $isActive, theme }: TextProps) => ($isActive ? theme.white : theme.tertiary)};
  font-size: ${({ $fontSize }: TextProps) => ($fontSize === "small" ? "0.875rem" : "0.6875rem")};
  font-weight: 700;

  ${media.sm} {
    font-size: 0.875rem;
    margin-left: 5px;
  }
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
