import config from "@tgs-web-nx/config";
import { GameItem } from "@tgs-web-nx/types";
import { Common } from "@tgs-web-nx/utils";
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
`;
type Props = {
  dataList: GameItem[];
};
const MonthItem = ({ dataList }: Props) => {
  const title = "Hot games this month";
  return (
    <MainWrapper>
      <Title>{title}</Title>
      <GameContent>
        <GameImg>
          <img width={170} height={170} />
        </GameImg>
        <GameList>
          {dataList.map((data: GameItem) => {
            return (
              <Game key={data.id}>
                <div>
                  <img
                    width={30}
                    height={30}
                    src={`${
                      config.sourceUrl
                    }${data.gpcode.toUpperCase()}/${Common.getCDNLanguagePrefix()}/${
                      data.code
                    }.jpg`}
                    alt={data.name}
                  />
                </div>
                <div>{data.name}</div>
              </Game>
            );
          })}
        </GameList>
      </GameContent>
    </MainWrapper>
  );
};

export default MonthItem;
