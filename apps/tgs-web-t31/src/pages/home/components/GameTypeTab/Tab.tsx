import styled from "styled-components";
import { media } from "@/theme/breakpoints";

type Props = {
  imageUrl: string;
  activeUrl: string;
  text: string;
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
  border: 1px solid ${({ theme, $isActive }) => ($isActive ? theme.green : "transparent")};

  /* background: ${({ theme }) => theme.blue20}; */

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

const Text = styled.div<{
  $isActive: boolean;
}>`
  background-image: ${({ theme, $isActive }) => ($isActive ? theme.primaryGradient : theme.white)};
  -webkit-background-clip: text;
  background-clip: text;
  color: ${({ theme, $isActive }) => ($isActive ? "transparent" : theme.white)};
  font-size: 12px;
  font-weight: 590;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
`;

const Tab = ({ imageUrl, activeUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <GameIcon src={isActive ? activeUrl : imageUrl} alt={text} />
      <Text $isActive={isActive}>{text}</Text>
    </Wrapper>
  );
};

export default Tab;
