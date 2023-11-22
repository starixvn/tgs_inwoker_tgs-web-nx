import styled from "styled-components";
import { media } from "@/theme/breakpoints";

type Props = {
  imageUrl: string;
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const Wrapper = styled.div`
  vertical-align: middle;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GameIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const Text = styled.div`
  font-family: SF Pro;
  font-size: 12px;
  font-weight: 590;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: center;
`;

const GameContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: 8px;
`;

const Tab = ({ imageUrl, text, onClick }: Props) => {
  return (
    <Wrapper onClick={onClick}>
      <GameContainer>
        <IconContainer>
          <GameIcon src={imageUrl} alt={text} />
        </IconContainer>
        <Text>{text}</Text>
      </GameContainer>
    </Wrapper>
  );
};

export default Tab;
