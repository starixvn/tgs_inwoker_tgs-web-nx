import styled from "styled-components";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { theme } from "@/theme";

const CardPromptContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  gap: 7px;
  padding: 10px 0;
`;

const CardPrompt = () => {
  return (
    <CardPromptContainer>
      <OnlineUser color={theme.grey07} />
      <Marquee />
    </CardPromptContainer>
  );
};

export default CardPrompt;
