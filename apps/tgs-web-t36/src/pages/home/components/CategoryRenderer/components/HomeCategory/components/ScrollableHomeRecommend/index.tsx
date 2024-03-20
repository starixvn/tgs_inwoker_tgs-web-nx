import styled from "styled-components";
import { GameItem } from "@tgs-web-nx/types";
import config from "@tgs-web-nx/config";
import { GameTypeEnum, SHOW_BIG_WINS_AMOUNT } from "@tgs-web-nx/constants";
import { Common } from "@tgs-web-nx/utils";
import { useGetHomeCategoryList, useHomeGameContext } from "@tgs-web-nx/core/features";
import BigWinsCard from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/BigWinsCard";
import { media } from "@/theme/breakpoints";
import label_icon from "@/assets/t27/images/home/label-icon.svg";
import CategoryLabel from "@/pages/home/components/CategoryRenderer/components/HomeCategory/components/CategoryLabel";
import useGameTypeList from "@/hooks/home/useGameTypeList";
import { useHistory } from "react-router-dom";
import { userList } from "@/pages/home/components/Ranking/mocks/userList";

const HomeCategorySection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 14px;
`;

const CategoryTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  color: ${({ theme }) => theme.white};
  font-size: 19.5px;
  font-weight: 400;
`;

const CategoryContent = styled.div`
  width: 100%;
  max-height: 234px;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  height: 23.9%; //max-height: 222 /figma mobile height:926
  gap: 10px;
  background-color: ${({ theme }) => theme.mainBackground};

  ${media.sm} {
    gap: 14px;
    scroll-snap-type: unset;
    max-height: 234px;
    flex-direction: row;

    &::-webkit-scrollbar {
      height: 12px;
      background-color: ${({ theme }) => theme.g5};
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(32, 32, 32, 0.5);
      border-radius: 8px;
      background-color: ${({ theme }) => theme.g5};
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px ${({ theme }) => theme.g8};
      background-color: ${(props) => props.theme.mainBackground};
    }
  }
`;

const ScrollableHomeRecommend = () => {
  const history = useHistory();
  const { handleChangeGameType } = useHomeGameContext();
  const { recommendGameList } = useGetHomeCategoryList();
  const hasMappingData = !!recommendGameList.length;
  const gameTypeList = useGameTypeList();
  const playerNameList = userList.slice(0, 12);

  const updatedRecommendGameList = recommendGameList.map(game => ({
    ...game,
    player: playerNameList[Math.floor(Math.random() * playerNameList.length)],
    amount: Math.floor(Math.random() * (3000 - 1000 + 1)) + 1000
  }));

  const handleViewAllClick = (gameType: GameTypeEnum) => {
    handleChangeGameType(gameType);
    const activeGameTypeKey = gameTypeList.find((item) => item.gameType === gameType)?.key;
    history.push(`/main/${activeGameTypeKey}`);
  };

  return (
    <>
      <HomeCategorySection>
        <CategoryTitle><CategoryLabel imageUrl={label_icon} text={"Big Wins"} /></CategoryTitle>
        <CategoryContent>
          {hasMappingData &&
            updatedRecommendGameList.slice(0, SHOW_BIG_WINS_AMOUNT).map((gameItem) => (
              <BigWinsCard
                key={gameItem.id}
                gameItem={gameItem}
                isActive={gameItem.isactive}
                imageUrl={`${config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${gameItem.code
                  }.jpg`}
                playerName={gameItem.player}
                amount={gameItem.amount}
              />
            ))}
        </CategoryContent>
      </HomeCategorySection>
    </>
  );
};

export default ScrollableHomeRecommend;
