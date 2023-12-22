import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { feature } from "@/constants/featuresList";

const Wrapper = styled.div`
  display: flex;
  padding-left: 24px;
  align-items: center;
  gap: 12px;
  align-self: stretch;
  width: calc(50% - 6px);

  &:nth-child(1), &:nth-child(2) {
    border-bottom: 1px solid  rgba(4, 150, 207, 0.16);
  }
`;

const MainTitle = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 10.5px;
  line-height: 16.8px;
  font-weight: 400;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 16px;
  line-height: 30px;
  font-weight: 700;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.black};
  font-size: 16px;
  line-height: 30px;
  font-weight: 400;
`;

const ImageCard = ({ feature }: { feature: feature }) => {
  const { isMobileSize, isDesktopSize } = useRwd();

  return (
    <Wrapper>
      <img src={feature.imgUrl} alt={feature.mainTitle} />
      {isMobileSize && <MainTitle>{feature.mainTitle}</MainTitle>}
      {isDesktopSize &&
        <Text>
          <SubTitle>{feature.subTitle}</SubTitle>
          <Content>{feature.content}</Content>
        </Text>
      }
    </Wrapper>
  );
};

export default ImageCard;
