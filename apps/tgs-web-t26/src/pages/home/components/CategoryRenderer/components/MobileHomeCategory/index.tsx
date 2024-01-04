import styled from "styled-components";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MobileHomeCategory = () => {
  return (
    <MobileContainer>
      <GameTypeTab />
    </MobileContainer>
  );
};

export default MobileHomeCategory;
