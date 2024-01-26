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
  gap: 10px;
  padding: 4px 10px;
`;

const CardPrompt = () => {
  return (
    <CardPromptContainer>
      <Marquee />
      <OnlineUser color={theme.gray80} />
    </CardPromptContainer>
  );
};

export default CardPrompt;
