import { LastBetDto } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";
import { format } from "date-fns";
import { useMemo } from "react";

import { GameName, InfoContainer, PlayerName, TableCell, TableRow, TableWrapper, TextColor } from "./style";

const LastBetsTable: React.FC<{ betList: LastBetDto[] }> = ({ betList }) => {
  return useMemo(() => {
    return (
      <TableWrapper>
        {betList.map((item, index) => {
          const { gameName, playerName, playerCode, multiplier, payout, timeBet } = item;

          return (
            <TableRow className="row" key={item.id} $isNew={index === 0}>
              <TableCell>
                <InfoContainer>
                  <img width={24} height={24} src={item.gameIconUrl} alt="avatar" />
                  <GameName>{gameName}</GameName>
                </InfoContainer>
              </TableCell>
              <TableCell className="hide-xs-md">
                {format(new Date(timeBet), "hh:mm:ss a")}
              </TableCell>
              <TableCell>
                <InfoContainer>
                  <img width={24} height={24} src={utility.getAvatarUrl(playerCode)} alt="avatar" />
                  <PlayerName>{playerName}</PlayerName>
                </InfoContainer>
              </TableCell>
              <TableCell className="bold hide-xs-md">{multiplier}x</TableCell>
              <TextColor payout={payout}>{payout}</TextColor>
            </TableRow>
          );
        })}
      </TableWrapper>
    );
  }, [betList]);
};

export default LastBetsTable;
