import config from "@tgs-web-nx/config";
import { useAuth } from "@tgs-web-nx/core/features";
import { GameItem } from "@tgs-web-nx/types";
import { Common } from "@tgs-web-nx/utils";
import { useEffect } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useHistory } from "react-router";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 100%;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.primaryGradient};
  font-size: 15px;
  font-weight: 700;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: left;
  height: 32px;
  padding: 10px;
  gap: 10px;
`;
const GameContent = styled.div`
  display: flex;
  overflow: auto;
`;
const GameImg = styled.div``;
const GameList = styled.div`
  height: 170px;
  flex-grow: 1;
  overflow: auto;
  scroll-behavior: smooth;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Game = styled.div`
  width: 100%;
  display: flex;
  color: ${({ theme }) => theme.activeNav};
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0em;
  text-align: center;
  padding: 4px;
  gap: 8px;
  cursor: pointer;
`;
type Props = {
  dataList: GameItem[];
  title: string;
  loadMore: () => void;
};
const MonthItem = ({ dataList, title, loadMore }: Props) => {
  const { isLogin } = useAuth();
  const history = useHistory();
  const containerRef = useBottomScrollListener(() => {
    loadMore();
  });

  useEffect(() => {
    const list = containerRef.current;
    const scrollList = () => {
      if (list) {
        list.scrollTop = list.scrollTop + 120;
      }
    };
    const interval = setInterval(scrollList, 1500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const launchGame = (gameItem: GameItem) => {
    if (!isLogin) {
      history.push("/login");
    } else {
      Common.closePreviousPopup();
      Common.PopupCenter(`/joingame/${gameItem.id}/${gameItem.gpcode}`, "gamewindow");
    }
  };
  return (
    <MainWrapper>
      <Title>{title}</Title>
      <GameContent>
        <GameImg>
          <img
            width={170}
            height={170}
            src={`${
              config.sourceUrl
            }${dataList[0]?.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${dataList[0]
              ?.code}.jpg`}
            alt="slot"
          />
        </GameImg>
        <GameList
          //@ts-ignore
          ref={containerRef}
        >
          {dataList.map((gameItem: GameItem, index) => {
            return (
              <Game
                key={index}
                onClick={() => {
                  launchGame(gameItem);
                }}
              >
                <img
                  width={30}
                  height={30}
                  src={`${
                    config.sourceUrl
                  }${gameItem.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                    gameItem.code
                  }.jpg`}
                  alt={gameItem.name}
                />
                <div>{gameItem.name}</div>
              </Game>
            );
          })}
        </GameList>
      </GameContent>
    </MainWrapper>
  );
};

export default MonthItem;
