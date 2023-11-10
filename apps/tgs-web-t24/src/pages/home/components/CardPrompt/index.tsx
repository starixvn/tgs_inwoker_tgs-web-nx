import styled from "styled-components";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { useRwd } from "@/core/hooks/tools/useRwd";

const CardPromptContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  height: 32px;
`;

const CardPrompt = () => {
  const { isMobileSize } = useRwd();

  return (
    <CardPromptContainer>
      <Marquee />
      {isMobileSize && <OnlineUser />}
    </CardPromptContainer>
  );
};

export default CardPrompt;
