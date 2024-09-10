import styled from "styled-components";
import Indicator from "./components/TitleIndicator";
import RewardCard from "./components/RewardCard";
import { useRewardPage } from "@tgs-web-nx/core/hooks";
import { createContext, useMemo } from "react";

const Title = styled.div<{ $titleColor: string; $subTitleColor: string }>`
  display: flex;
  flex-direction: column;
  gap: 5px;

  div:first-child {
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme, $titleColor }) => $titleColor};
  }
  div:nth-child(2) {
    font-size: 15px;
    font-weight: 400;
    color: ${({ theme, $subTitleColor }) => $subTitleColor};
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const RewardContainer = styled.div<{ $media: any }>`
  width: 100%;
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 10px;
  justify-content: space-between;
  ${({ $media }) => $media.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const RewardContext = createContext<RewardProps>({
  media: {
    xs: "",
    sm: "",
    md: "",
    lg: "",
    xl: "",
  },
  colors: {
    titleColor: "",
    subTitleColor: "",
    mainBg: "",
    bonusBg: "",
    indicatorBg: "",
  },
});

export type RewardProps = {
  media: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  colors: {
    titleColor: string;
    subTitleColor: string;
    mainBg: string;
    bonusBg: string;
    indicatorBg: string;
  };
};

const Reward = (props: RewardProps) => {
  const {} = useRewardPage();

  const Rewards = [
    {
      bonus: 5,
      state: true,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: true,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: true,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: false,
    },
    {
      bonus: 5,
      state: false,
    },
  ];
  const memoizedValue = useMemo(() => {
    return {
      ...props,
    } as RewardProps;
  }, []);
  return (
    <RewardContext.Provider value={memoizedValue}>
      {/* todo:milestone */}
      <Title $titleColor={props.colors.titleColor} $subTitleColor={props.colors.subTitleColor}>
        <div>子標題</div>
        <div>
          <Indicator />
          <div>xxxxxxxxxxxxxxx</div>
        </div>
      </Title>
      <RewardContainer $media={props.media}>
        {Rewards.map((reward, index) => {
          return <RewardCard key={index} index={index} {...reward} />;
        })}
      </RewardContainer>
    </RewardContext.Provider>
  );
};

export default Reward;
