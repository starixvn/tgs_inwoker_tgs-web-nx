import styled from "styled-components";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";

const CardPromptContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  height: 32px;
`;

const CardPrompt = () => {
  return (
    <CardPromptContainer>
      <Marquee />
      <OnlineUser />
    </CardPromptContainer>
  );
};

export default CardPrompt;
