import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { theme } from "@/theme";
import { media } from "@/theme/breakpoints";

const CardPromptContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  gap: 8px;
  padding: 4px 15px;
  background: ${({ theme }) => theme.primary};
  ${media.sm} {
    margin: 10px 0;
  }
`;

const CardPrompt = () => {
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <CardPromptContainer>
      {isMobileSize ? (
        <>
          <OnlineUser color={theme.white} />
          <Marquee />
        </>
      ) : (
        <>
          <Marquee />
          <OnlineUser color={theme.white} />
        </>
      )}
    </CardPromptContainer>
  );
};

export default CardPrompt;
