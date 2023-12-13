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
  background-color: ${({ theme }) => theme.mainBackground};
`;

const CardPrompt = () => {
  return (
    <CardPromptContainer>
      <OnlineUser color={theme.white} />
      <Marquee />  
    </CardPromptContainer>
  );
};

export default CardPrompt;
