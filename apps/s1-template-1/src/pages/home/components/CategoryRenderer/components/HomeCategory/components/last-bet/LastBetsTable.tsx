import { LastBetDto } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";
import { useMemo } from "react";

import { GameName, InfoContainer, PlayerName, TableCell, TableRow, TableWrapper, TextColor } from "./style";

const LastBetsTable: React.FC<{ betList: LastBetDto[] }> = ({ betList }) => {
  return useMemo(() => {
    return (
      <TableWrapper>
        {betList.map((item, index) => {
          const { gameName, playerName, playerCode, multiplier, payout } = item;

          return (
            <TableRow className="row" key={item.id} $isNew={index === 0}>
              <TableCell>
                <InfoContainer>
                  <img width={24} height={24} src={item.gameIconUrl} alt="avatar" />
                  <GameName>{gameName}</GameName>
                </InfoContainer>
              </TableCell>
              <TableCell>
                <InfoContainer>
                  <img width={24} height={24} src={utility.getAvatarUrl(playerCode)} alt="avatar" />
                  <PlayerName>{playerName}</PlayerName>
                </InfoContainer>
              </TableCell>
              <TableCell className="bold">{multiplier}x</TableCell>
              <TextColor payout={payout}>{payout}</TextColor>
            </TableRow>
          );
        })}
      </TableWrapper>
    );
  }, [betList]);
};

export default LastBetsTable;
