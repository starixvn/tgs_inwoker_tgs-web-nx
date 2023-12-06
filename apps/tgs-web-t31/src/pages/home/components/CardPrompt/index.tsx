import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { media } from "@/theme/breakpoints";

const CardPromptContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 4px 12px;
  width: 100%;
  gap: 8px;
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
      <OnlineUser />
      <Marquee />
    </CardPromptContainer>
  );
};

export default CardPrompt;
