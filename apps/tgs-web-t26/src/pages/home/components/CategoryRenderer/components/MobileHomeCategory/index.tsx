import styled from "styled-components";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { ProviderDto } from "@tgs-web-nx/types";
import ProviderCard from "./components/ProviderCard";
import GameTypeTab from "@/pages/home/components/GameTypeTab";

const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const ProviderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  padding: 10px;
`;

const MobileHomeCategory = () => {
  const { providerList } = useHomeGameContext();
  return (
    <MobileContainer>
      <GameTypeTab />
      <ProviderContainer>
        {providerList.map((provider: ProviderDto, index) => {
          return <ProviderCard key={index} provider={provider} />;
        })}
      </ProviderContainer>
    </MobileContainer>
  );
};

export default MobileHomeCategory;
