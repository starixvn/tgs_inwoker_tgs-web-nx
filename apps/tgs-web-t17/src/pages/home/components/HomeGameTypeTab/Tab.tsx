import { media } from "@/theme/breakpoints";
import styled from "styled-components";

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
  justify-content: center;
  align-items: center;
  user-select: none;
  border-radius: 10px;
  margin-right: 16px;
  height: 134px;

  ${media.sm} {
    height: 190px;
  }
`;

const GameIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const Text = styled.div<{ $isActive: boolean }>`
  color: ${({ theme, $isActive }) => ($isActive ? theme.g2 : theme.g2)};
  font-size: 15.6px;
  font-weight: 400;
  text-align: center;
`;

const Tab = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <GameIcon src={imageUrl} alt={text} />
    </Wrapper>
  );
};
export default Tab;
