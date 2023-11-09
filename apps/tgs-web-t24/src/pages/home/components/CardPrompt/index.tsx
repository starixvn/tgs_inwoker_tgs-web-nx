import styled from "styled-components";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { media } from "@/theme/breakpoints";
import { useRwd } from "@/core/hooks/tools/useRwd";

const CardPromptContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 4px 10px;
  width: 100%;
  gap: 7px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.mainDarkBackground};

  ${media.sm} {
    border-radius: 5px;
  }
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
