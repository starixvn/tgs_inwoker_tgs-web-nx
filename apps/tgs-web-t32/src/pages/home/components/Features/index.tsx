import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import config from "@tgs-web-nx/config";
import { featuresList } from "@/constants/featuresList";
import ImageCard from "@/pages/home/components/ImageCard/Feature";

const FeaturesWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const FeatureTitle = styled.div`
  color: ${({ theme }) => theme.primary};
  font-size: 16.719px;
  font-weight: 700;
  line-height: 28px;
  margin-bottom: 10px; 
`;

const FeatureCard = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
`;

const Features = () => {
  const { isMobileSize } = useRwd();

  return (
    <FeaturesWrapper>

      <FeatureTitle> {isMobileSize ? "Outstanding Features" : `The Edge of ${config.brand}`}</FeatureTitle>
      <FeatureCard>
        {featuresList.map((feature, index) => (
          <ImageCard
            key={index}
            feature={feature}
          />
        ))}
      </FeatureCard>
    </FeaturesWrapper>
  );
};

export default Features;
