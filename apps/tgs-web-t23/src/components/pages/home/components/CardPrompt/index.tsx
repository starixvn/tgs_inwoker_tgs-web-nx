import { useRwd } from "@/core/hooks/tools/useRwd";
import styled from "styled-components";
import Marquee from "./components/Marquee";
import OnlineUser from "./components/OnlineUser";

const CardPromptContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  padding: 4px 10px;
  width: 100%;
  gap: 7px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.mainDarkBackground};
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
