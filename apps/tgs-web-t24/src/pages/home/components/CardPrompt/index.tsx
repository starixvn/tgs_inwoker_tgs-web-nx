import styled from "styled-components";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/core/hooks/tools/useRwd";

const CardPromptContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
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
