import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";
import { theme } from "@/theme";

type Props = {
  $isDesktopSize: boolean;
};

const CardPromptContainer = styled.div<Props>`
  min-height: ${({ $isDesktopSize }) => ($isDesktopSize ? "36px" : "unset")};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  align-self: stretch;
  width: 100%;
  gap: 7px;
  background: ${({ theme, $isDesktopSize }) =>
    $isDesktopSize ? theme.accountLableText : theme.mainBackground};
`;

const CardPrompt = () => {
  const { isDesktopSize } = useRwd();

  return (
    <CardPromptContainer $isDesktopSize={isDesktopSize}>
      <OnlineUser color={theme.white} />
      <Marquee />
    </CardPromptContainer>
  );
};

export default CardPrompt;
