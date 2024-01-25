import styled from "styled-components";
import { media } from "@/theme/breakpoints";
import menuActiveBg from "@/assets/t22/images/home/gameType/menuActiveBg.png";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Text = styled.div`
  font-size: .6rem;
  font-weight: 700;
  text-transform: uppercase;
  text-align: center;
  line-height: 14px;
`;

const Wrapper = styled.div<{
  $imageUrl: string;
  $text: string;
  $isActive: boolean;
}>`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  user-select: none;
  border-radius: 6px;
  background: url(${props => props.$isActive ? menuActiveBg : ''}) no-repeat center;
  background-size: cover;
  background-color: ${props => !props.$isActive ? props.theme.navMenuBackground : ''};
  min-height: 60px;
  cursor: pointer;

  ${media.sm} {
    & :hover {
      color: ${({ theme }) => theme.text};
    }
  }

  ${Text} {
    color: ${props => props.$isActive ? props.theme.white : props.theme.labelText};
  }
`;

const GameIcon = styled.img`
  width: 20px;
`;



const Tab = ({ imageUrl, text, isActive, onClick }: Props) => {
  return (
    <Wrapper $isActive={isActive} $imageUrl={imageUrl} $text={text} onClick={onClick}>
      <GameIcon src={imageUrl} alt={text} />
      <Text>{text}</Text>
    </Wrapper>
  );
};

export default Tab;
