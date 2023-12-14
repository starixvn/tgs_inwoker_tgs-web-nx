import styled from "styled-components";
import { useRwd } from "@tgs-web-nx/core/hooks";
import { GameTypeEnum } from "@tgs-web-nx/constants";
import { useHistory } from "react-router-dom";
import { useHomeGameContext } from "@tgs-web-nx/core/features";
import { i18n } from "@tgs-web-nx/utils";
import { useEffect, useMemo } from "react";
import jackpotPic from "@/assets/t19/images/home/jackpotPic.png";
import recommend_game1 from "@/assets/t19/images/home/recommend_game1.png";
import recommend_game2 from "@/assets/t19/images/home/recommend_game2.png";
import recommend_game3 from "@/assets/t19/images/home/recommend_game3.png";
import recommend_home from "@/assets/t19/images/home/recommend_home.svg";
import latest_home from "@/assets/t19/images/home/latest_home.svg";
import game_icon from "@/assets/t19/images/home/game_icon.png";
import { media } from "@/theme/breakpoints";
import { SUB_CONTENT_MAX_WIDTH } from "@/theme/constants";
import CategoryLabel from "./components/CategoryLabel";

const DesktopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 476px;

  ${media.sm} {
    max-width: ${SUB_CONTENT_MAX_WIDTH};
    margin: 0 auto;
  }
`;

const RecommendContainer = styled.div`
  width: 367px;
  height: 100%;
  display: flex;
  padding-top: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const JackPotContainer = styled.div`
  aspect-ratio: 460 / 476;
  width: 100%;
  max-width: 460px;
  background-image: url(${jackpotPic});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const LatestContainer = styled.div`
  width: 373px;
  height: 100%;
  display: flex;
  padding-top: 18px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const GameColumnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 18px;
`;

const RecommendGameCard = styled.div<{ $imgUrl: string }>`
  position: relative;
  aspect-ratio: 367 / 114;
  width: 100%;
  border-radius: 10px;
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: contain;
  background-repeat: no-repeat;
`;

const LatestWinnerCard = styled.div`
  display: flex;
  width: 100%;
  padding: 12px;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #504C40;
`;

type GameTypeItem = {
  key: string;
  name: string;
  imgUrl: string;
  text: string | any;
  gameType: GameTypeEnum;
};

const HomeCategory = () => {
  const history = useHistory();
  const { isDesktopSize } = useRwd();
  const { handleChangeGameType } = useHomeGameContext();

  const recommendGameList = [
    {
      name: "Game1",
      imgUrl: recommend_game1,
    },
    {
      name: "Game2",
      imgUrl: recommend_game2,
    },
    {
      name: "Game3",
      imgUrl: recommend_game3,
    }
  ]

  return (
    <DesktopContainer>
      <RecommendContainer>
        <CategoryLabel imageUrl={recommend_home} text={"Reocmmend"} />
        <GameColumnWrapper>
          {recommendGameList.map((gameItem, index) => (
            <RecommendGameCard key={index} $imgUrl={gameItem.imgUrl}></RecommendGameCard>
          ))}
        </GameColumnWrapper>
      </RecommendContainer>
      <JackPotContainer></JackPotContainer>
      <LatestContainer>
        <CategoryLabel imageUrl={latest_home} text={"Latest winners"} />
        <GameColumnWrapper>
          <LatestWinnerCard>
            <img src={game_icon} alt={"game_icon"} />
            <div>First Person Lightning Bacca...</div>
            <div>₱52,360x</div>
          </LatestWinnerCard>
          <LatestWinnerCard>
            <img src={game_icon} alt={"game_icon"} />
            <div>First Person Lightning Bacca...</div>
            <div>₱52,360x</div>
          </LatestWinnerCard>
          <LatestWinnerCard>
            <img src={game_icon} alt={"game_icon"} />
            <div>First Person Lightning Bacca...</div>
            <div>₱52,360x</div>
          </LatestWinnerCard>
          <LatestWinnerCard>
            <img src={game_icon} alt={"game_icon"} />
            <div>First Person Lightning Bacca...</div>
            <div>₱52,360x</div>
          </LatestWinnerCard>
        </GameColumnWrapper>
      </LatestContainer>
    </DesktopContainer>
  );
};

export default HomeCategory;
