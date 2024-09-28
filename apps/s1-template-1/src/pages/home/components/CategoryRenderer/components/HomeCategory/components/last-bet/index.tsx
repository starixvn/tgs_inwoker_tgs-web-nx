import { HubConnection } from "@microsoft/signalr";
import { LastBetDto } from "@tgs-web-nx/types";
import { utility } from "@tgs-web-nx/utils";
import React, { useEffect, useState } from "react";

import {
  InfoContainer,
  PlayerName,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TableWrapper,
  TextColor,
} from "./style";
import { useGameTypeList } from "@tgs-web-nx/core/features";

interface LastBetsType {
  connection: HubConnection | undefined;
}

const LastBets: React.FC<LastBetsType> = (props: LastBetsType) => {
  const { connection } = props;
  const [betList, setBetList] = useState<LastBetDto[]>([]);
  const navGameType = useGameTypeList();

  useEffect(() => {
    if (!connection) return;

    connection.start().catch((err) => console.error(err.toString()));

    connection.on("ReceiveLastBet", (item: LastBetDto) => {
      setBetList((items) => {
        item.gameIconUrl = navGameType.find((x) => x.gameType === item.gameType)?.iconUrl || "";
        const updatedMessages = [item, ...items];

        return updatedMessages.slice(0, 10);
      });
    });

    return () => {
      connection.off("ReceiveLastBet");
      connection.stop();
    };
  }, [connection]);

  return (
    <TableContainer>
      <TableHeader>
        <span>Game</span>
        <span>User</span>
        <span>Multiplier</span>
        <span className="text-right">Payout</span>
      </TableHeader>
      <TableWrapper>
        {betList.map((item, index) => {
          const { gameName, playerName, playerCode, multiplier, payout } = item;

          return (
            <TableRow key={item.id} $isNew={index === 0}>
              <TableCell>
                <InfoContainer>
                  <img width={24} height={24} src={item.gameIconUrl} alt="avatar" />
                  {gameName}
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
    </TableContainer>
  );
};

export default LastBets;
